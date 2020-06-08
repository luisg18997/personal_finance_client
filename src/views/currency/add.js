import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import Form from "../../components/formik";
import CurrencyForm from "../../components/forms/currencyForm";
import { ModalAlert } from "../../components/modal";
import { AddCurrency } from "../../api/currency";
import validationFrom from "../../components/forms/validators/currencyValidator";
import { RedirectPage } from "../../helpers/redirectPage";


const CurrencyAdd = () => {
    const [status,setStatus] = useState(false);
    const [load, setLoad] = useState(true)
    let values = {name: '', code: '', symbol: ''};


    const handleSubmit = async(value) => {
        setStatus(true)
        try {
            const result = await AddCurrency(value);
            if(result.success){
                ModalAlert('Success', 'successfully registered', 'success');
                RedirectPage('/admin/currencies');
            } else {
                ModalAlert('Error', result.message, 'warning');
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false)
    }

    useEffect(() => {
        setLoad(false)
    },[])

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
                                        <p className='title'>Currency Add</p>
                                        <Form 
                                            MyForm={CurrencyForm}
                                            values={values}
                                            valueButton={status}
                                            handleSubmit={handleSubmit}
                                            validationSchema={validationFrom}
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

export default CurrencyAdd;