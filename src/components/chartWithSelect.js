import React from 'react'
import Form from './formik'
import SelectForm from './forms/SelectForm'
import ChartReport from './chart'
import validationFrom from './forms/validators/selectValidator'


const ChartWithSelect = ({title, values, valuesSelect, handleSubmit, status, data, type}) => {
    console.log(data)
    return(
        <div className='card'>
            <div className='card-body'>
                <p className='title'>{title}</p>
                <Form 
                    MyForm={SelectForm}
                    valuesSelect={valuesSelect}
                    values={values}
                    valueButton={status}
                    handleSubmit={handleSubmit}
                    validationSchema={validationFrom}
                />
                {
                    <ChartReport data={data} type={type}/>
                }
            </div>
        </div>
    )
}

export default ChartWithSelect