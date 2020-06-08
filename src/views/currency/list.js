import React, {useState,useEffect} from 'react';
import {GetCurrencies, IsDeletedCurrency, IsActiveCurrency} from '../../api/currency';
import NavMenu from '../../components/navbar';
import Spinner from '../../components/spinner';
import TableComponent from '../../components/table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt, faLock, faUnlock, faTimes, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ModalConfirm, ModalAlert } from '../../components/modal';
import { RedirectPage } from '../../helpers/redirectPage';

const Currencies = () => {
    const [load, setLoad] = useState(true);
    const [data, setData] = useState([]);
    const title = ['Name', 'Code', 'Symbol', 'Action'];
    

    const FecthData = async() => {
        const result = await GetCurrencies();
        let currencies = []
        if(result.success) {
            if(result.data.length > 0) {
                currencies = result.data.map((data) => ([
                    data.name,
                    data.code,
                    data.symbol,
                    (
                        <div style={{fontWeight: 700}}>
                            <FontAwesomeIcon icon={faSearch} size="0.4x" style={{cursor:'pointer'}} onClick={() => {handleViewClick(data.id)}} /> 
                            {
                                !data.isdeleted && data.isactive &&
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={() => {handleUpdateClick(data.id)}}/>
                            }
                            {
                                !data.isdeleted && data.isactive?
                                <FontAwesomeIcon icon={faLock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, true)}}/>
                                :
                                !data.isdeleted &&
                                <FontAwesomeIcon icon={faUnlock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, false)}}/>
                            }
                            {
                                !data.isdeleted?
                                <FontAwesomeIcon icon={faTimes} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, true)}} />
                                :
                                <FontAwesomeIcon icon={faCheck} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, false)}} />
                            }
                        </div>
                    )
                ]))
            }
            setData(currencies)
        }
        setLoad(false)
    }

    useEffect(() => {
        FecthData();
    }, [])


    const handleUpdateClick = (id) => {
        RedirectPage('/admin/currency_update', {currencyId: id})
    }
    

    const handleViewClick = (id) => {
        RedirectPage('/admin/currency', {currencyId: id})
    }

    const handleAddClick = () => {
        RedirectPage('/admin/currency_add')
    }

    const HandleConfirmDeleted = (id, isDeleted) => {
        if(isDeleted){
            ModalConfirm('Warning', 'Are you sure you want to delete the record?', 'warning', ()=>{handleDeleted(id)})
        } else {
            ModalConfirm('Warning', 'Are you sure to retrieve the record?', 'warning', ()=>{handleRecovery(id)})
        }
    }

    const HandleConfirmIsActive = (id, isActive) => {
        if(isActive){
            ModalConfirm('Warning', 'Are you sure you want to block the record?', 'warning', ()=>{handleLock(id)})
        } else {
            ModalConfirm('Warning', 'Are you sure to unlock the registry?', 'warning', ()=>{handleUnLock(id)})
        }
    }

    const handleDeleted = async(id) => {
        const result = await IsDeletedCurrency({id, isDeleted: true})
        if(result.success){
            ModalAlert('Success', 'Record successfully deleted', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not deleted successfully', 'error')
        }
    }

    const handleRecovery = async(id) => {
        const result = await IsDeletedCurrency({id, isDeleted: false})
        if(result.success){
            ModalAlert('Success', 'Record successfully retrieved', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not retrieved successfully', 'error')
        }
    }

    const handleLock = async(id) => {
        const result = await IsActiveCurrency({id,isActive:false})
        if(result.success){
            ModalAlert('Success', 'record locked successfully', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Registration not blocked successfully', 'error')
        }
    }

    const handleUnLock = async(id) => {
        const result = await IsActiveCurrency({id,isActive:true})
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
                    <NavMenu />
                    <div className='table-list'>
                        <div className='table-header'>
                            <p className='title'>Currencies</p>
                            <div className='icon'>
                                <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddClick()} className="add"/>
                            </div>   

                        </div>
                        <TableComponent data={data} title={title} message='Currencies not found' />
                    </div>
                </>
            }
        </>
    )
}

export default Currencies;