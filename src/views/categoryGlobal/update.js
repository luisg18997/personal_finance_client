import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { RedirectPage } from "../../helpers/redirectPage";
import history from "../../helpers/history";
import { GetCategory, UpdateCategory } from "../../api/category";
import Form from "../../components/formik";
import validationFrom from "../../components/forms/validators/categoryValidator";
import CategoryForm from "../../components/forms/categoryForm";
import { ModalAlert } from "../../components/modal";


const CategoryGlobalUpdate = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', name: '', description: ''})
    const [status, setStatus] = useState(false)

    const FecthData = async() => {
        try {
            if(history.location.state){
                const {categoryId} = history.location.state
                const result = await GetCategory(categoryId);
                if(result.success){
                    setValues({
                        ...values,
                        id: result.data.id,
                        name: result.data.category,
                        description: result.data.description,
                    })
                } else {
                    throw 'not found';
                }
            } else {
                throw 'not found';
            }
        } catch (error) {
            RedirectPage('/admin/categories');
        }
        setLoad(false)
    }

    useEffect(() => {
        FecthData()
    },[])

    const handleSubmit = async(values) => {
        setStatus(true)
        try {
            const result = await UpdateCategory(values);
            if(result.success){
                ModalAlert('Success', 'successfully updated', 'success');
                RedirectPage('/admin/categories');
            } else {
                ModalAlert('Error', result.message, 'warning');
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
                                    <p className='title'>Category Update</p>
                                    <Form 
                                        handleSubmit={handleSubmit}
                                        validationSchema={validationFrom}
                                        values={values}
                                        valueButton={status}
                                        MyForm={CategoryForm}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>

    )
}

export default CategoryGlobalUpdate;