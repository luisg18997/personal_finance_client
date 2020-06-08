import React from 'react';
import { Input } from '../inputs';
import SpinnerBtn from '../spinnerBtn';


const ChangePasswordForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton}) => {

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-8 col-lg-10 col-md-6'>
                    <Input name='password' type='password' value={values.password} handleChange={handleChange} handleBlur={handleBlur} touched={touched.password} error={error.password} placeholder='Password' />
                </div>
                <div className="w-100"></div>
                <div className='col-8 col-lg-10 col-md-6'>
                    <Input name='password_confirmation' type='password' value={values.password_confirmation} handleChange={handleChange} handleBlur={handleBlur} touched={touched.password} error={error.password} placeholder='Password confirmation' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
};

export default ChangePasswordForm;