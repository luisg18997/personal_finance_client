import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { GetClient } from "../../api/client";
import { faArrowAltCircleLeft, faKey, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "../../components/showImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RedirectPage } from "../../helpers/redirectPage";


const ProfileClient = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', userId: '', email: '', last_name: '', name: '', birth_date: '', avatar: ''})

    const FecthData = async() => {
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
                    birth_date: result.data.birth_date
                })
            } else {
                throw 'not found';
            }
            setLoad(false)
        } catch (error) {
            RedirectPage('/client/dashboard');
        }
    }
    
    useEffect(() => {
        FecthData()
    },[])

    const ChangePage = (route) => {
        RedirectPage(route);
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
                            <div className='card-body justify-content-center'>
                                <p className='title'>Profile</p>
                                <div className='text-right pr-3 mr-3'>
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{cursor: 'pointer',paddingRight: 5}} size={'lg'} onClick={() => {ChangePage('/client/dashboard')}}/>
                                        <FontAwesomeIcon icon={faUserEdit} style={{cursor: 'pointer',paddingRight: 5}} size={'lg'}  onClick={() => {ChangePage('/client/profile_update')}}/>
                                        <FontAwesomeIcon icon={faKey} style={{cursor: 'pointer'}} size={'lg'}  onClick={() => {ChangePage('/client/change_pass')}}/>
                                </div>
                                <div className='row w-100 justify-content-center'>
                                    <div className='col-lg-12 pb-4 col-md-12 col-sm-12'>
                                        <Image url={values.avatar} />
                                    </div>
                                    <div className='col-lg-6 pl-3 pr-3 col-md-6 col-sm-12'>
                                        <p><b className='label-name'>Name: </b> {values.name}</p>
                                    </div>
                                    <div className='col-lg-6 pl-3 pr-3 col-md-6 col-sm-12'>
                                        <p><b className='label-name'>Last name: </b> {values.last_name}</p>
                                    </div>
                                    <div className='col-lg-6 pl-3 pr-3 col-md-6 col-sm-12'>
                                        <p><b className='label-name'>Birth date: </b> {values.birth_date}</p>
                                    </div>
                                    <div className='col-lg-6 pl-3 pr-3 col-md-6 col-sm-12'>
                                        <p><b className='label-name'>Email: </b> {values.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )
}

export default ProfileClient;