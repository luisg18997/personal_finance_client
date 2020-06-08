import React, {useState, useEffect} from 'react';
import { RedirectPage } from '../../helpers/redirectPage';
import { GetCategoryGlobalPersonal } from '../../api/category';
import { GetCurrencies } from '../../api/currency';
import { ModalAlert } from '../../components/modal';
import { AddFinance } from '../../api/finance';
import Spinner from "../../components/spinner";
import NavMenu from '../../components/navbar';
import Form from '../../components/formik';
import FinanceForm from '../../components/forms/financeForm';
import validationFrom from '../../components/forms/validators/financeValidator';


const FinanceAdd = () => {
    const [valuesSelect, setValuesSelect] = useState({currencies: [], categories: []})
    const [status,setStatus] = useState(false);
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({categoryId: '', financeDate:'', financeHour:'', title:'', description:'', mount:'', isIncome: true, currencyId: '', userId: ''})

    useEffect(() => {
        const handleChangeData = async() => {
            try {
                const user_data = JSON.parse(localStorage.getItem('user_data'));
                const resultCat = await GetCategoryGlobalPersonal(user_data.id)
                const resultCur = await GetCurrencies();
                let categories = [], currencies = []
                if(resultCat.success){
                    if(resultCat.data.length > 0) {
                        categories =resultCat.data.map(category => ({
                            id: category.id,
                            name: category.name
                        }))
                    }
                }
                if(resultCur.success){
                    if(resultCur.data.length > 0) {
                        currencies =resultCur.data.map(currency => ({
                            id: currency.id,
                            name: currency.name
                        }))
                    }
                }
                setValuesSelect({
                    currencies,
                    categories
                })
                setValues({
                    ...values,
                    userId: user_data.id
                })
                setLoad(false)
            } catch (error) {
                RedirectPage('/client/finance_list')
            }
        }
        handleChangeData()
    },[])

    const handleSubmit = async(value) => {
        setStatus(true)
        try {
            const data = {...value, isIncome: value.isIncome === 'true'?true: false}
            const result = await AddFinance(data);
            if(result.success){
                ModalAlert('Success', 'successfully registered', 'success');
                RedirectPage('/client/finance_list');
            } else {
                ModalAlert('Error', result.message, 'warning');
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false)
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
                            <div className='container-box'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <p className='title'>Finance Add</p>
                                        <Form 
                                            MyForm={FinanceForm}
                                            values={values}
                                            valueButton={status}
                                            handleSubmit={handleSubmit}
                                            validationSchema={validationFrom}
                                            valuesSelect={valuesSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}

export default FinanceAdd