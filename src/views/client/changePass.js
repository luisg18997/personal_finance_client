import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { ModalAlert } from "../../components/modal";
import { RedirectPage } from "../../helpers/redirectPage";
import Form from "../../components/formik";
import ChangePasswordForm from "../../components/forms/changePassForm";
import validationFrom from "../../components/forms/validators/changePasswordValidator";
import { ChangePassword } from "../../api/auth";

const ChangePassClient = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', password: '', password_confirmation: ''})
    const [status, setStatus] =useState(false)


    const HandleChangeData = () => {
        const user_data = JSON.parse(localStorage.getItem('user_data'));
        setValues({...values, id: user_data.id});
        setLoad(false)
    }
    useEffect(() => {
        HandleChangeData()
    },[])

    const handleSubmit = async(value, event) => {
        setStatus(true);
        try {
            const result = await ChangePassword(values);
            if(result.success){
                ModalAlert('Success', 'successfully updated', 'success');
                RedirectPage('/client/dashboard');
            } else {
                ModalAlert('Error', result.message, 'warning')
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false);
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
                                    <p className='title'>Change Password</p>
                                    <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                                    <Form 
                                        MyForm={ChangePasswordForm}
                                        handleSubmit={handleSubmit}
                                        values={values}
                                        valueButton={status}
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

export default ChangePassClient;