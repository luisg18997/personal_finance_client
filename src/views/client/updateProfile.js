import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import ClientForm from "../../components/forms/clientForm";
import history from "../../helpers/history";
import { UpdateClient, GetClient } from "../../api/client";
import { ModalAlert } from "../../components/modal";
import { RedirectPage } from "../../helpers/redirectPage";
import Form from "../../components/formik";
import validationFrom from "../../components/forms/validators/clientValidator";


const UpdateProfileClient = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', userId: '', email: '', last_name: '', name: '', birth_date: '',avatarFile: null, avatar: '', avatarPreview: ''})
    const [status, setStatus] = useState(false)
    const [route, setRoute] = useState('')


    const FecthData = async() => {
        const data = history.location.state.route?history.location.state.route: '/client/profile'
        console.log(data)
        setRoute(data);
        try {
            const user_data = JSON.parse(localStorage.getItem('user_data'))
            const result = await GetClient(user_data.client_id);
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
            setLoad(false)
        } catch (error) {
            RedirectPage(data);
        }
    }
    
    useEffect(() => {
        FecthData()
    },[])

    const handleSubmit = async(value) => {
        setStatus(true)
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
                RedirectPage(route);
            } else {
                ModalAlert('Error', result.message, 'warning');
            }
        } catch (error) {
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

export default UpdateProfileClient;