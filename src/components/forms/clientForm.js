import React from 'react';
import { Input, InputFile } from '../inputs';
import SpinnerBtn from '../spinnerBtn';
import Image from '../showImage';

const ClientForm = ({handleSubmit, handleChange, handleBlur, values, error, touched, valueButton, setFieldValue, setFieldTouched}) => {

    const handleChangeFile = ({currentTarget: {files}}) => {
        let reader = new FileReader();
        let file = files[0];
        if(file !== undefined) {
            reader.onload  = ({target: {result}}) => {
                
                setFieldValue('avatar', result)
                setFieldTouched('avatarFile', true);
                setFieldValue('avatarFile', file)
              }
                reader.readAsDataURL(file)
        } else {
            setFieldValue('avatar', values.avatarPreview)
            setFieldTouched('avatarFile', false);
            setFieldValue('avatarFile', null)
        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <div className='form-row justify-content-center'>
                <div className='col-lg-12 col-md-12 col-sm-12 pb-3'>
                    <Image url={values.avatar} />
                    {<InputFile name='avatarFile' touched={touched.avatarFile} error={error.avatarFile} handleBlur={handleBlur} handleChange={handleChangeFile}  />}
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <Input name='name' type='text' value={values.name} error={error.name} touched={touched.name} handleChange={handleChange} handleBlur={handleBlur} placeholder='Name of client' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='last_name' type='text' value={values.last_name} error={error.last_name} touched={touched.last_name} handleChange={handleChange} handleBlur={handleBlur} placeholder='Last name of Client' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='birth_date' type='date' value={values.birth_date} error={error.birth_date} touched={touched.birth_date} handleChange={handleChange} handleBlur={handleBlur} placeholder='Birth Date of Client' />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Input name='email' type='email' value={values.email} error={error.email} touched={touched.email} handleChange={handleChange} handleBlur={handleBlur} placeholder='Email of Client' />
                </div>
                <div className="w-100"></div>
                <div className='form-row justify-content-center'>
                    <button type="submit" disabled={valueButton} className="btn btn-primary mt-2 mb-2 pl-5 pr-5">{valueButton?<SpinnerBtn/>:'Send'}</button>
                </div>
            </div>
        </form>
    );
}

export default ClientForm