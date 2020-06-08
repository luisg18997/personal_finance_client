import React from 'react';
import { Input } from '../inputs';
import SpinnerBtn from '../spinnerBtn';

const CurrencyForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton}) => {

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Input name='name' type='text' value={values.name} error={error.name} touched={touched.name} handleChange={handleChange} handleBlur={handleBlur} placeholder='Name of currency' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='code' type='text' value={values.code} error={error.code} touched={touched.code} handleChange={handleChange} handleBlur={handleBlur} placeholder='Code of currency' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='symbol' type='text' value={values.symbol} error={error.symbol} touched={touched.symbol} handleChange={handleChange} handleBlur={handleBlur} placeholder='Symbol of currency' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
}

export default CurrencyForm