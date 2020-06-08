import React from 'react';
import { Formik } from 'formik';

const Form = ({values, handleSubmit, validationSchema, MyForm, valuesSelect, valueButton}) => {
  return(
    <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        children={props => <MyForm
            handleSubmit={props.handleSubmit}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            values={props.values}
            valuesSelect={valuesSelect}
            error={props.errors}
            touched={props.touched}
            valueButton={valueButton}
            setFieldValue={props.setFieldValue}
            setFieldTouched={props.setFieldTouched}
        />}
     />
  )
}

export default Form