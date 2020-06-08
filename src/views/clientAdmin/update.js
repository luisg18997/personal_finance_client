import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import Form from "../../components/formik";
import ClientForm from "../../components/forms/clientForm";
import validationFrom from "../../components/forms/validators/clientValidator";
import history from "../../helpers/history";
import { GetClient, UpdateClient } from "../../api/client";
import { RedirectPage } from "../../helpers/redirectPage";
import { ModalAlert } from "../../components/modal";


const ClientUpdate = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', userId: '', email: '', last_name: '', name: '', birth_date: '',avatarFile: null, avatar: '', avatarPreview: ''})
    const [status, setStatus] = useState(false)


    const FecthData = async() => {
        try {
            if(history.location.state){
                const {clientId} = history.location.state
                const result = await GetClient(clientId);
                if(result.success){
                    setValues({
                        ...values,
                        id: result.data.id,
                        userId: result.data.user_id,
                        name: result.data.name,
                        last_name: result.data.last_name,
                        email: result.data.email,
                        avatar: result.data.avatar,
                        avatarPreview: result.data.avatar,
                        birth_date: result.data.birth_date
                    })
                } else {
                    throw 'not found';
                }
            } else  {
               throw 'not found';
            }
            setLoad(false)
        } catch (error) {
            RedirectPage('/admin/clients');
        }
    }
    
    useEffect(() => {
        FecthData()
    },[])

    const handleSubmit = async(value) => {
        setStatus(true)
        console.log(value)
        try {
            const data = new FormData();
            data.append('id',value.id)
            data.append('userId', value.userId)
            data.append('email', value.email)
            data.append('name', value.name)
            data.append('last_name', value.last_name)
            data.append('birth_date', value.birth_date? value.birth_date: "")
            data.append('avatarPreview', value.avatarPreview)
            data.append('avatar', value.avatarFile)

            const result = await UpdateClient(data)

            if(result.success){
                ModalAlert('Success', 'successfully updated', 'success');
                RedirectPage('/admin/clients');
            } else {
                ModalAlert('Error', result.message, 'warning');
            }


        } catch (error) {
            console.log(error)
            ModalAlert('Error', 'please try again', 'error')
        }
        setStatus(false)
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
                                    <p className='title'>Client Update</p>
                                    <Form 
                                        MyForm={ClientForm}
                                        validationSchema={validationFrom}
                                        values={values}
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

export default ClientUpdate;