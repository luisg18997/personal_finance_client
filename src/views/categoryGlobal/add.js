import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import Form from "../../components/formik";
import validationFrom from "../../components/forms/validators/categoryValidator";
import CategoryForm from "../../components/forms/categoryForm";
import { ModalAlert } from "../../components/modal";
import { AddCategory } from "../../api/category";
import { RedirectPage } from "../../helpers/redirectPage";


const CategoryGlobalAdd = () => {
    const [load, setLoad] = useState(true)
    const [status,setStatus] = useState(false)
    const values = {name: '', description: ''};

    useEffect(() => {
        setLoad(false)
    },[])

    const handleSubmit = async(values) => {
        setStatus(true)
        try {
            const result = await AddCategory(values);
            if(result.success){
                ModalAlert('Success', 'successfully registered', 'success');
                RedirectPage('/admin/categories')
            } else {
                ModalAlert('Error', result.message, 'warning')
            }
        } catch (error) {
            ModalAlert('Error', 'please try again', 'error')
        }
    }

    return(
        <>
            {
                load?
                    <Spinner />
                :
                    <>
                        <NavMenu />
                        <div className='container-box'>
                            <div className='card'>
                                <div className='card-body'>
                                    <p className='title'>Category Add</p>
                                    <Form 
                                        values={values}
                                        validationSchema={validationFrom}
                                        MyForm={CategoryForm}
                                        valueButton={status}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}

export default CategoryGlobalAdd;