import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { RedirectPage } from "../../helpers/redirectPage";
import { GetCurrency, UpdateCurrency } from "../../api/currency";
import history from "../../helpers/history";
import Form from "../../components/formik";
import validationFrom from "../../components/forms/validators/currencyValidator";
import CurrencyForm from "../../components/forms/currencyForm";
import { ModalAlert } from "../../components/modal";


const CurrencyUpdate = () => {
    const [load, setLoad] = useState(true)
    const [status,setStatus] = useState(false);
    const [values,setValues] = useState({name: '', code: '', symbol: ''});


    const FecthData = async() => {
        try {
            if(history.location.state){
                const {currencyId} = history.location.state
                const result = await GetCurrency(currencyId);
                if(result.success){
                    setValues({
                        ...values,
                        id: result.data.id,
                        name: result.data.name,
                        code: result.data.code,
                        symbol: result.data.symbol
                    })
                } else {
                    throw 'not found'; 
                }
            } else  {
               throw 'not found';
            }
            setLoad(false)
        } catch (error) {
            RedirectPage('/admin/currencies');
        }
    }
    
    useEffect(() => {
        FecthData()
    },[])

    const handleSubmit = async(values) => {
        setStatus(true)
        try {
            const result = await UpdateCurrency(values);
            if(result.success){
                ModalAlert('Success', 'successfully updated', 'success');
                RedirectPage('/admin/currencies');
            } else {
                ModalAlert('Error', result.message, 'warning');
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
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
                                        <p className='title'>Currency Edit</p>
                                        <Form 
                                            handleSubmit={handleSubmit}
                                            values={values}
                                            valueButton={status}
                                            validationSchema={validationFrom}
                                            MyForm={CurrencyForm}
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

export default CurrencyUpdate;