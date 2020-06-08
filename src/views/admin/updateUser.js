import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import Form from "../../components/formik";
import { ModalAlert } from "../../components/modal";
import { userUpdate } from "../../api/auth";
import ForgotPassForm from "../../components/forms/forgotPassForm";
import validationFrom from "../../components/forms/validators/forgotPasswordValidator";
import { RedirectPage } from "../../helpers/redirectPage";


const UpdateUser = () => {
    const [load, setLoad] = useState(true)
    const [status,setStatus] = useState(false)
    
    const [values, setValues] = useState({id: '', email: ''})

    const handleChangeData = () => {
        const user_data = JSON.parse(localStorage.getItem('user_data'))
        setValues({
            ...values,
            id: user_data.id
        })
        setLoad(false)
    }

    useEffect(() => {
        handleChangeData()
    },[])

    const handleSubmit = async(value) => {
        setStatus(true)
        try {
            const result = await userUpdate(value);
            if(result.success){
                ModalAlert('Success', 'successfully updated', 'succes');
                RedirectPage('/admin/dashboard');
            } else {
                ModalAlert('Error', result.message, 'warning')
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
                        <div className='container-box'>
                            <div className='card'>
                                <div className='card-body'>
                                    <p className='title'>Update Email</p>
                                    <Form 
                                        MyForm={ForgotPassForm}
                                        values={values}
                                        handleSubmit={handleSubmit}
                                        valueButton={status}
                                        validationSchema={validationFrom}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}

export default UpdateUser;