import React, {useState} from 'react';
import Form from '../../components/formik';
import validationFrom from '../../components/forms/validators/singUpValidator';
import { ModalAlert } from '../../components/modal';
import { UserAdd } from '../../api/auth';
import { RedirectPage } from '../../helpers/redirectPage';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/loginForm';



const SingUp = () => {
    const values = {email: '', password: '', roleId: 2}
    const [status, setStatus] =useState(false)

    const handleSubmit = async(value, event) => {
        setStatus(true);
        try {
            const result = await UserAdd(value);
            if(result.success){
                ModalAlert('Success', 'sign up success', 'succes');
                RedirectPage('/');
            } else {
                ModalAlert('Error', result.message, 'warning')
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false);
    }

    return(
        <div className="auth-container">
            <p><b><strong>Sign Up</strong></b></p>
            <Form 
                handleSubmit={handleSubmit}
                values={values}
                validationSchema={validationFrom}
                MyForm={LoginForm}
                valueButton={status}
            />
            <div className="options">
                <Link to="/">Log In</Link> 
            </div>
        </div>
    )
};

export default SingUp;