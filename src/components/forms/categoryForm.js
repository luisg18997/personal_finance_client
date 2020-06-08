import React from 'react';
import { Input } from '../inputs';
import SpinnerBtn from '../spinnerBtn';


const CategoryForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton}) => {

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Input name='name' type='text' value={values.name} error={error.name} touched={touched.name} handleChange={handleChange} handleBlur={handleBlur} placeholder='Name of category' />
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <Input name='description' type='text' value={values.description} error={error.description} touched={touched.description} handleChange={handleChange} handleBlur={handleBlur} placeholder='Description of category' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
}

export default CategoryForm