import React, {useState, useEffect} from 'react'
import { RedirectPage } from '../../helpers/redirectPage'
import { MonthOfExpense, YearOfExpense, ExpenseCategoryByMonth, ExpenseMonthByYear, ExpenseDayByMonth, ExpenseProgression } from '../../api/finance'
import { ModalAlert } from '../../components/modal'
import NavMenu from '../../components/navbar'
import ChartWithSelect from '../../components/chartWithSelect'
import Spinner from '../../components/spinner'
import moment from 'moment'
import ChartReport from '../../components/chart'

const FinanceReport = () => {
    const [data, setData] = useState({
        expenseCatMonth: {options: {
            chart: {id: "expense-categoy-month"},
            legend: {position: 'bottom'},
            xaxis: { categories: [] },
            noData: {text: 'Loading...'},
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px',colors: ["#304758"]
                }
              },
            plotOptions: {
                bar: {
                    columnWidth: '45%',                  
                    dataLabels: { position: 'top', },
                }
            },
            title:{text: 'Month', align: 'center', }
          },
          series: [],
        },
        expenseMonhtYear: {options: {
            chart: {id: "expense-month-year"},
            legend: {position: 'bottom'},
            xaxis: { categories: [] },
            noData: {text: 'Loading...'},
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px',colors: ["#304758"]
                }
              },
            plotOptions: {
                bar: {
                    columnWidth: '45%',                  
                    dataLabels: { position: 'top', },
                }
            },
            title:{text: 'Year', align: 'center', }
          },
          series: [],
        },
        expenseDayMonth: {options: {
            chart: {id: "expense-day-month"},
            legend: {position: 'bottom'},
            xaxis: { categories: [] },
            noData: {text: 'Loading...'},
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '12px',colors: ["#304758"]
                }
              },
            plotOptions: {
                bar: {
                    columnWidth: '45%',                  
                    dataLabels: { position: 'top', },
                }
            },
            title:{text: 'Month', align: 'center', }
          },
          series: [],
        },
        expenseProgression: {options: {
            chart: {id: "expense-progression"},
            legend: {position: 'bottom'},
            dataLabels: {
                enabled: true,
                offsetY: -2,
                style: { fontSize: '12px',colors: ["#304758"]
                }
              },
            xaxis: {
                labels: { show: false, },
              categories: [] },
            noData: {text: 'Loading...'},
            stroke: { curve: 'smooth',}
          },
          series: [],
        }
    })
    const [status, setStatus] = useState({expenseCatMonth: false,expenseMonhtYear: false,expenseDayMonth: false})
    const [valuesSelect, setValuesSelect] = useState({ year: [], month:[]})
    const [values, setValues] = useState({ userId: '', month: '', year: '' })

    const [load, setLoad] = useState(true)

    useEffect(() => {
        const handleChangeData = async() =>{
            try {
                let months=[], years=[]
                const user_data = JSON.parse(localStorage.getItem('user_data'));
                setValues({
                    ...values,
                    userId: user_data.id
                })
                const resultMonth = await MonthOfExpense(user_data.id);
                if(resultMonth.success){
                    months= resultMonth.data.map((month) =>({
                        id: month.month_finance,
                       name: month.month_name 
                    }))
                }
                const resultYear = await YearOfExpense(user_data.id);
                if(resultYear.success){
                    years= resultYear.data.map((year) =>({
                        id: year.year_finance,
                       name: year.year_finance 
                    }))
                }
                setValuesSelect({
                    month: months,
                    year: years
                })
                const result = await ExpenseProgression(user_data.id)
                if(result.success){
                    const categories = result.data.map(data => ([
                        data.finance_date
                    ]))
                    const dataNew = result.data.map((data) => (data.mount))
                    const expenseProgression = {
                        ...data.expenseProgression,
                        options: {
                            ...data.expenseProgression.options,
                            xaxis: {
                                labels: { show: false}, categories},
                        },
                        series:[{
                            name: 'expense',
                            data: dataNew
                        }]
                    }
                    console.log(expenseProgression)
                    setData({
                        ...data,
                        expenseProgression
                    })
                }
                setLoad(false)
            } catch (error) {
                RedirectPage('/client/dashboard');
            }
        }
        handleChangeData()
    }, [])

    const SubmitExpenseCatMonth = async (value) => {
        setStatus({
            ...status,
            expenseCatMonth: true
        })
        try {
            const result = await ExpenseCategoryByMonth({userId: value.userId, month: value.data})
            if(result.success){
                const month = moment(value.data, 'M').format('MMMM')
                const categories = result.data.map(data => ([
                  data.category
                ]))
                const dataNew = result.data.map((data) => (data.mount_total))
                const expenseCatMonth = {
                    ...data.expenseCatMonth,
                    options: {
                        ...data.expenseCatMonth.options,
                        xaxis: {categories},
                        title:{
                            ...data.expenseCatMonth.options.title,
                            text: `Month ${month}`
                        },
                    },
                    series:[{
                        name: "Expense",
                        data: dataNew
                    }]
                }
                setData({
                    ...data,
                    expenseCatMonth
                })
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }

        setStatus({
            ...status,
            expenseCatMonth: false
        })
    }

    const SubmitExpenseMonthYear = async (value) => {
        setStatus({
            ...status,
            expenseMonhtYear: true
        })
        try {
            const result = await ExpenseMonthByYear({userId: value.userId, year: value.data})
            if(result.success){
                const categories = result.data.map(data => ([
                  data.month_name
                ]))
                const dataNew = result.data.map((data) => (data.expense_total))
                const expenseMonhtYear = {
                    ...data.expenseMonhtYear,
                    options: {
                        ...data.expenseMonhtYear.options,
                        xaxis: {...data.expenseMonhtYear.xaxis,
                            categories},
                        title:{
                            ...data.expenseMonhtYear.options.title,
                            text: `Year ${value.data}`
                        },
                    },
                    series:[{
                        name: "Expense",
                        data: dataNew
                    }]
                }
                setData({
                    ...data,
                    expenseMonhtYear
                })
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus({
            ...status,
            expenseMonhtYear: false
        })
    }

    const SubmitExpenseDayMonth = async (value) => {
        setStatus({
            ...status,
            expenseDayMonth: true
        })
        try {
            const result = await ExpenseDayByMonth({userId: value.userId, month: value.data})
            if(result.success){
                const month = moment(value.data, 'M').format('MMMM')
                const categories = result.data.map(data => ([
                  `${data.day_finance}-${value.data}`
                ]))
                const dataNew = result.data.map((data) => (data.expense_total))
                const expenseDayMonth = {
                    ...data.expenseDayMonth,
                    options: {
                        ...data.expenseDayMonth.options,
                        xaxis: {...data.expenseDayMonth.xaxis,
                            categories},
                        title:{
                            ...data.expenseDayMonth.options.title,
                            text: `Month ${month}`
                        }
                    },
                    series:[{
                        name: "Expense",
                        data: dataNew
                    }]
                }
                setData({
                    ...data,
                    expenseDayMonth
                })
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus({
            ...status,
            expenseDayMonth: false
        })
    }

    return(
        <>
        {
            load?
                <Spinner />
            :
                <>
                    <NavMenu />
                    <div className='content'>
                        <div className='container-report'>
                            <div className='row w-100 justify-content-center'>
                                <div className=' mt-4 mb-4 col-lg-6 col-md-12 col-sm-12'>
                                    <ChartWithSelect values={{userId: values.userId, data: values.month, name: 'month'}} title='Expense Category by Month' valuesSelect={{option: valuesSelect.month}} status={status.expenseCatMonth} data={data.expenseCatMonth} handleSubmit={SubmitExpenseCatMonth} type={'bar'} />
                                </div>
                                <div className='mt-4 mb-4 col-lg-6 col-md-12 col-sm-12'>
                                    <ChartWithSelect values={{userId: values.userId, data: values.year, name: 'year'}} title='Expense Month by Year' valuesSelect={{option: valuesSelect.year}} status={status.expenseMonhtYear} data={data.expenseMonhtYear} handleSubmit={SubmitExpenseMonthYear} type={'bar'} />
                                </div>
                                <div className='mt-4 mb-4 col-lg-6 col-md-12 col-sm-12'>
                                    <ChartWithSelect values={{userId: values.userId, data: values.month, name: 'month'}} title='Expense Day by Month' valuesSelect={{option: valuesSelect.month}} status={status.expenseDayMonth} data={data.expenseDayMonth} handleSubmit={SubmitExpenseDayMonth} type={'bar'} />
                                </div>
                                <div className='mt-4 mb-4 col-lg-6 col-md-12 col-sm-12'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <p className='title'>Expense Progession</p>
                                            {<ChartReport data={data.expenseProgression} type='line' />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        }
    </>

)


}

export default FinanceReport;