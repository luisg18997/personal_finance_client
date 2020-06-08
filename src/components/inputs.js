import React from 'react';
import { ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export const Input = ({name, type,touched, error, handleChange, handleBlur, value, placeholder}) => {
  return(
    <div className='form-group'>
        <label className='label-name'>{placeholder}</label>
        <input className={touched && error?'form-control is-invalid':'form-control'}  type={type} name={name} onChange={handleChange} placeholder={placeholder} value={value} onBlur={handleBlur}/>
        <ErrorMessage name={name}>{msg => <div className="error-message">{msg}</div>}</ErrorMessage>
    </div>
  )
}

export const InputFile = ({name, handleChange, handleBlur}) => {

  return(
    <>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: 5}}>
        <label className='btn-file'>
          <input type="file" style={{display: 'none'}} name={name} onChange={handleChange} onBlur={handleBlur}/>
          <FontAwesomeIcon icon={faCamera} size={'lg'} />
        </label>
      </div>
      <ErrorMessage name={name}>{msg => <div className="error-message">{msg}</div>}</ErrorMessage>
    </>
  )
}

export const Select = ({name,touched, error, handleChange, handleBlur, value, placeholder, valueSelect}) => {
  return(
    <div className='form-group'>
        <label className='label-name'>{placeholder}</label>
        <select className={touched && error?'form-control is-invalid':'form-control'} name={name} onChange={handleChange} value={value} onBlur={handleBlur}>
          <option value="">select {placeholder}</option>
          {
            valueSelect.map((data, key) => (
              <option key={key} value={data.id}>{data.name}</option>
            ))
          }
        </select>
        <ErrorMessage name={name}>{msg => <div className="error-message">{msg}</div>}</ErrorMessage>
    </div>
  )
}

export const  InputTwoEadio = ({name, value, touched, error, handleBlur, handleChange, checked, labelName}) =>{
  return(
    <>
      <div className='form-row w-100 justify-content-center'>
        <div className="ml-4 form-group col-lg-4 col-md-4 col-sm-4">
          <div className='form-chek'>
            <input checked={checked === String(value[0])} value={value[0]} className={ touched && error ? "form-check-input is-invalid" : "form-check-input"} type="radio" onChange={handleChange} name={name} onBlur={handleBlur} />
            <label className="form-check-label" htmlFor={name}>
              {labelName[0]}
            </label>
          </div>
        </div>
        <div className="ml-4 form-group col-lg-4 col-md-4 col-sm-4">
          <div className='form-chek'>
            <input checked={checked=== String(value[1])} value={value[1]} className={ touched && error ? "form-check-input is-invalid" : "form-check-input"} type="radio" onChange={handleChange} name={name} onBlur={handleBlur} />
            <label className="form-check-label" htmlFor={name}>
              {labelName[1]}
            </label>
          </div>
        </div>
      </div>
      <ErrorMessage name={name}>{msg => <div className="error-message">{msg}</div>}</ErrorMessage>
    </>
  )
}