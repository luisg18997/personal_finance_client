import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { UserAdd } from "../../api/auth";
import { RedirectPage } from "../../helpers/redirectPage";
import Form from "../../components/formik";
import LoginForm from "../../components/forms/loginForm";
import validationFrom from "../../components/forms/validators/singUpValidator";
import { ModalAlert } from "../../components/modal";


const ClientAdd = () => {
    const [load, setLoad] = useState(true)
    const values = {email: '', password: '', roleId: '2'};
    const [status, setStatus] = useState(false)

    useEffect(() => {
        setLoad(false)
    },[])

    const handleSubmit = async(values) => {
        setStatus(true)
        try {
            const result = await UserAdd(values);
            if(result.success){
                ModalAlert('Success', 'successfully registered', 'success');
                RedirectPage('/admin/clients');
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
                        <div className='container-box'>
                            <div className='card'>
                                <div className='card-body'>
                                    <p className='title'>Client Add</p>
                                    <Form
                                        MyForm={LoginForm}
                                        validationSchema={validationFrom}
                                        valueButton={status}
                                        values={values}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}

export default ClientAdd;