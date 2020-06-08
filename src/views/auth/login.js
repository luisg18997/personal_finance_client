import React, { useState } from "react"
import {Link} from 'react-router-dom'
import LoginForm from "../../components/forms/loginForm"
import loginValidator from "../../components/forms/validators/loginValidator"
import Form from "../../components/formik"
import { ModalAlert } from "../../components/modal"
import {SingIn} from '../../api/auth'
import { RedirectPage } from "../../helpers/redirectPage"

const Login = () => {
    const values = {email: '', password: ''}
    const [status, setStatus] =useState(false)

    const handleSubmit = async(value, event) => {
        setStatus(true);
        console.log(event)
        try {
            const result = await SingIn(value);
            if(result.success) {
                localStorage.setItem('user_data', JSON.stringify(result.data))
                let route
                if(result.data.role === 'administrador'){
                    route = '/admin/dashboard';
                } else {
                    if(result.data.is_new){
                        route = '/client/profile_update'
                    } else {
                        route = '/client/dashboard';
                    }
                    
                }
                if(route !== '/client/profile_update') {
                    RedirectPage(route);
                } else {
                    RedirectPage(route, {route : '/client/dashboard'});
                }
                
            } else {
                ModalAlert('Error', result.message, 'warning')
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false)
    }

    return(
    <div className="auth-container">
        <p><b><strong>Log In</strong></b></p>
        <Form
            values={values}
            handleSubmit={handleSubmit}
            validationSchema={loginValidator}
            MyForm={LoginForm}
            valueButton={status}
        />
        <div className="options">
            <Link to="/forgot_pass">Forgot password?</Link>
            <Link to="/sign_up">Create account</Link> 
        </div>
    
    </div>
  )
}

export default Login;