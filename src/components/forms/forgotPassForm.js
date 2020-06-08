import React from 'react';
import { Input } from '../inputs';
import SpinnerBtn from '../spinnerBtn';

const ForgotPassForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton}) => {


    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-8 col-lg-10 col-md-6'>
                    <Input name='email' type='email' value={values.email} handleChange={handleChange} handleBlur={handleBlur} touched={touched.email} error={error.email} placeholder='Email' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
}

export default ForgotPassForm