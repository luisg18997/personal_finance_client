import React, { useState, useEffect } from 'react'
import Spinner from '../../components/spinner';
import NavMenu from '../../components/navbar';
import { IsActiveClient, IsDeletedClient, GetClients } from '../../api/client';
import { ModalAlert, ModalConfirm } from '../../components/modal';
import { RedirectPage } from '../../helpers/redirectPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt, faLock, faUnlock, faTimes, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import TableComponent from '../../components/table';

const Clients = () => {
    const [load, setLoad] = useState(true);
    const title = ['Name', 'Last name', 'email', 'birth Date', 'ACtions']
    const [data, setData] = useState([])

    const FecthData = async() => {
        const result = await GetClients();
        let clients = []
        if(result.success) {
            if(result.data.length > 0) {
                clients = result.data.map((data) => ([
                    data.name,
                    data.last_name,
                    data.email,
                    data.birth_date,
                    (
                        <div style={{fontWeight: 700}}>
                            <FontAwesomeIcon icon={faSearch} size="0.4x" style={{cursor:'pointer'}} onClick={() => {handleViewClick(data.id)}} /> 
                            {
                                !data.isdeleted && data.isactive &&
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={() => {handleUpdateClick(data.id)}}/>
                            }
                            {
                                !data.isdeleted && data.isactive?
                                <FontAwesomeIcon icon={faLock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, data.user_id, true)}}/>
                                :
                                !data.isdeleted &&
                                <FontAwesomeIcon icon={faUnlock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, data.user_id, false)}}/>
                            }
                            {
                                !data.isdeleted?
                                <FontAwesomeIcon icon={faTimes} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, data.user_id, true)}} />
                                :
                                <FontAwesomeIcon icon={faCheck} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, data.user_id, false)}} />
                            }
                        </div>
                    )
                ]))
            }
            setData(clients)
        }
        setLoad(false)
    }

    useEffect(() => {
        FecthData();
    }, [])


    const handleUpdateClick = (id) => {
        RedirectPage('/admin/client_update', {clientId: id})
    }
    

    const handleViewClick = (id) => {
        RedirectPage('/admin/client', {clientId: id})
    }

    const handleAddClick = () => {
        RedirectPage('/admin/client_add')
    }

    const HandleConfirmDeleted = (id, userId, isDeleted) => {
        if(isDeleted){
            ModalConfirm('Warning', 'Are you sure you want to delete the record?', 'warning', ()=>{handleDeleted(id, userId)})
        } else {
            ModalConfirm('Warning', 'Are you sure to retrieve the record?', 'warning', ()=>{handleRecovery(id, userId)})
        }
    }

    const HandleConfirmIsActive = (id,userId, isActive) => {
        if(isActive){
            ModalConfirm('Warning', 'Are you sure you want to block the record?', 'warning', ()=>{handleLock(id, userId)})
        } else {
            ModalConfirm('Warning', 'Are you sure to unlock the registry?', 'warning', ()=>{handleUnLock(id, userId)})
        }
    }

    const handleDeleted = async(id, userId) => {
        const result = await IsDeletedClient({id, userId, isDeleted: true})
        if(result.success){
            ModalAlert('Success', 'Record successfully deleted', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not deleted successfully', 'error')
        }
    }

    const handleRecovery = async(id, userId) => {
        const result = await IsDeletedClient({id, userId, isDeleted: false})
        if(result.success){
            ModalAlert('Success', 'Record successfully retrieved', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not retrieved successfully', 'error')
        }
    }

    const handleLock = async(id, userId) => {
        const result = await IsActiveClient({id, userId,isActive:false})
        if(result.success){
            ModalAlert('Success', 'record locked successfully', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Registration not blocked successfully', 'error')
        }
    }

    const handleUnLock = async(id, userId) => {
        const result = await IsActiveClient({id, userId,isActive:true})
        if(result.success){
            ModalAlert('Success', 'Registration unlocked successfully', 'success');
            await FecthData()
        } else {
            ModalAlert('Error', 'registration not unlocked successfully', 'error')
        }
    }
    return(
        <>
            {
                load?
                    <Spinner />
                :
                    <>
                        <NavMenu/>
                        <div className='table-list'>
                            <div className='table-header'>
                                <p className='title'>Clients</p>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddClick()} className="add"/>
                                </div>   

                            </div>
                            <TableComponent data={data} title={title} message='Clients not found' />
                        </div>
                    </>
            }
        </>
    )
}

export default Clients;