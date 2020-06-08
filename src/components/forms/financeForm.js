import React from 'react';
import { Input, Select, InputTwoEadio } from '../inputs';
import SpinnerBtn from '../spinnerBtn';

const FinanceForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton, valuesSelect}) => {

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='title' type='text' value={values.title} error={error.title} touched={touched.title} handleChange={handleChange} handleBlur={handleBlur} placeholder='Title of finance' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='mount' type='text' value={values.mount} error={error.mount} touched={touched.mount} handleChange={handleChange} handleBlur={handleBlur} placeholder='Mount of finance' />
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <InputTwoEadio name='isIncome' labelName={['Income', 'expense']} checked={String(values.isIncome)} touched={touched.isIncome} error={error.isIncome} handleChange={handleChange} handleBlur={handleBlur} value={[true, false]} />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='financeDate' type='date' value={values.financeDate} error={error.financeDate} touched={touched.financeDate} handleChange={handleChange} handleBlur={handleBlur} placeholder='Date of finance' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='financeHour' type='time' value={values.financeHour} error={error.financeHour} touched={touched.financeHour} handleChange={handleChange} handleBlur={handleBlur} placeholder='Hour of finance' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Select name='categoryId' valueSelect={valuesSelect.categories} value={values.categoryId} error={error.categoryId} touched={touched.categoryId} handleChange={handleChange} handleBlur={handleBlur} placeholder='Category of finance' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                <Select name='currencyId' valueSelect={valuesSelect.currencies} value={values.currencyId} error={error.currencyId} touched={touched.currencyId} handleChange={handleChange} handleBlur={handleBlur} placeholder='Currency of finance' />
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Input name='description' type='text' value={values.description} error={error.description} touched={touched.description} handleChange={handleChange} handleBlur={handleBlur} placeholder='Description of finance' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
}

export default FinanceForm;