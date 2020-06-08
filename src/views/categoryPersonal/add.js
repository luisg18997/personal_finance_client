import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import Form from "../../components/formik";
import validationFrom from "../../components/forms/validators/categoryValidator";
import CategoryForm from "../../components/forms/categoryForm";
import { ModalAlert } from "../../components/modal";
import { AddCategoryPersonal } from "../../api/category";
import { RedirectPage } from "../../helpers/redirectPage";


const CategoryPersonalAdd = () => {
    const [load, setLoad] = useState(true)
    const [status,setStatus] = useState(false)
    const [values, setValues] = useState({userId: '', name: '', description: ''});

    const handleChangeData = () => {
        const user_data = JSON.parse(localStorage.getItem('user_data'));
        setValues({
            ...values,
            userId: user_data.id
        })
        setLoad(false)
    }

    useEffect(() => {
        handleChangeData()
    },[])

    const handleSubmit = async(values) => {
        setStatus(true)
        try {
            const result = await AddCategoryPersonal(values);
            if(result.success){
                ModalAlert('Success', 'successfully registered', 'success');
                RedirectPage('/client/categories')
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
                                <p className='title'>Category Personal Add</p>
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

export default CategoryPersonalAdd;