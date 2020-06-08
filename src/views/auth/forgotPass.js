import React, {useState} from 'react';
import Form from '../../components/formik';
import { Link } from 'react-router-dom';
import { ModalAlert } from '../../components/modal';
import { ForgotPassword } from '../../api/auth';
import validationFrom from '../../components/forms/validators/forgotPasswordValidator';
import ForgotPassForm from '../../components/forms/forgotPassForm';
import { RedirectPage } from '../../helpers/redirectPage';


const ForgotPass = () => {
    const [status, setStatus] =useState(false)
    const values = {email: ''};

    const handleSubmit = async(value) => {
        setStatus(true);
        try {
            const result = await ForgotPassword(value);
            if(result.success){
                RedirectPage('/change_pass', {userId: result.data.id})
            } else {
                ModalAlert('Error', result.message, 'warning')
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false);
    }

    return(
        <div className='auth-container'>
            <p><b><strong>Forgot Password</strong></b></p>
            <Form 
                handleSubmit={handleSubmit}
                values={values}
                validationSchema={validationFrom}
                MyForm={ForgotPassForm}
                valueButton={status}
            />
            <div className="options">
                <Link to="/">Log In</Link>
            </div>
        </div>
    )
}

export default ForgotPass;