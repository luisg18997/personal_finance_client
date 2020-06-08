import React from 'react';
import { Select } from '../inputs';
import SpinnerBtn from '../spinnerBtn';

const SelectForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton, valuesSelect}) => {

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-8 col-lg-10 col-md-6'>
                    <Select name='data' valueSelect={valuesSelect.option} value={values.data} handleChange={handleChange} handleBlur={handleBlur} touched={touched.data} error={error.data} placeholder={values.name} />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    )
}

export default SelectForm