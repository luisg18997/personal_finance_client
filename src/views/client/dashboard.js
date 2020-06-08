import React, {useState, useEffect, Fragment} from 'react'
import NavMenu from '../../components/navbar'
import Spinner from '../../components/spinner';
import TableComponent from '../../components/table';
import { BalanceFinance } from '../../api/finance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faEquals } from '@fortawesome/free-solid-svg-icons';


const ClientDashboard = () => {
    const [load, setLoad] = useState(true);
    const title =['Title', 'Mount', 'Currency', 'Category', 'date']
    const [data, setData] = useState({balance: 0,income_total: 0, expense_total: 0, income:[], expense: []})

    useEffect(() =>{
        const handleChangeData = async() => {
            try {
                let income= [], expense = [];
                const user_data = JSON.parse(localStorage.getItem('user_data'));
                const result = await BalanceFinance(user_data.id)
                if(result.success){
                    if(result.data.income){
                        income = result.data.income.map((data) => ([
                            data.title,
                            data.mount,
                            data.currency,
                            data.category,
                            data.finance_date
                        ]))
                    }
                    if(result.data.expense){
                        expense = result.data.expense.map((data) => ([
                            data.title,
                            data.mount,
                            data.currency,
                            data.category,
                            data.finance_date
                        ]))
                    }
                    setData({
                        ...data,
                        balance: result.data.balance_total?result.data.balance_total:result.data.income_total?result.data.income_total:result.data.expense_total?-result.data.expense_total:0,
                        income,
                        expense,
                        income_total: result.data.income_total?result.data.income_total:0,
                        expense_total: result.data.expense_total?-result.data.expense_total:0
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoad(false)
        }
        handleChangeData()
    },[])
    return(
        <Fragment>
            {
                load?
                <Spinner/>
                :
                <Fragment>
                    <NavMenu />
                        <div className='row w-100 justify-content-center'>
                            <div className='col-md-12 col-lg-12 col-sm-12'>
                                <div className='table-list'>
                                    <div className='table-header'>
                                        <p className='title'> My Balance: <span className={data.balance === 0?'':data.balance > 0?'mount-income':'mount-expense'}>{data.balance} {data.balance > 0 && <FontAwesomeIcon icon={faArrowUp} />} {data.balance < 0 && <FontAwesomeIcon icon={faArrowDown} />} {data.balance === 0 && <FontAwesomeIcon icon={faEquals}/>} </span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 col-lg-6 col-sm-12'>
                                <div className='table-list'>
                                    <div className='table-header'>
                                        <p className='title'>Income: <span className={data.income_total > 0? 'mount-income': ''}>{data.income_total} {data.income_total > 0 && <FontAwesomeIcon icon={faArrowUp} />} {data.income_total === 0 && <FontAwesomeIcon icon={faEquals}/>} </span></p>
                                    </div>
                                    <TableComponent data={data.income} title={title} message='Finance of type Income not found' />
                                </div>
                            </div>
                            <div className='col-md-12 col-lg-6 col-sm-12'>
                                <div className='table-list'>
                                    <div className='table-header'>
                                        <p className='title'>Expense: <span className={data.expense_total < 0? 'mount-expense': ''}>{data.expense_total} {data.expense_total < 0 && <FontAwesomeIcon icon={faArrowDown} />} {data.expense_total === 0 && <FontAwesomeIcon icon={faEquals}/>} </span></p>
                                    </div>
                                    <TableComponent data={data.expense} title={title} message='Finance of type Expense not found' />
                                </div>
                            </div>
                        </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default ClientDashboard;