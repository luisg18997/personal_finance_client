import React, {useState, useEffect} from 'react';
import Form from '../../components/formik';
import ChangePasswordForm from '../../components/forms/changePassForm';
import validationFrom from '../../components/forms/validators/changePasswordValidator';
import { ModalAlert } from '../../components/modal';
import { ChangePassword } from '../../api/auth';
import { RedirectPage } from '../../helpers/redirectPage';
import history from '../../helpers/history';
import { Link } from 'react-router-dom';



const ChangePass = () => {
    const [values, setValue] = useState({id: '', password: '', password_confirmation: ''})
    const [status, setStatus] =useState(false)

    useEffect(() => {
        const onChange = () => {
            const {userId}= history.location.state;
            setValue({
                ...values,
                id: userId
            })
        }

        onChange();
    },[])

    const handleSubmit = async(value, event) => {
        setStatus(true);
        try {
            const result = await ChangePassword({id: values.id, password: value.password});
            if(result.success){
                ModalAlert('Success', 'change password success', 'succes');
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
            <p><b><strong>Change Password</strong></b></p>
            <Form 
                handleSubmit={handleSubmit}
                values={values}
                validationSchema={validationFrom}
                MyForm={ChangePasswordForm}
                valueButton={status}
            />
            <div className="options">
                <Link to="/">Log In</Link> 
            </div>
        </div>
    )
};

export default ChangePass;