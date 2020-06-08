import React, { useState, useEffect } from 'react'
import Spinner from '../../components/spinner';
import NavMenu from '../../components/navbar';
import { GetCategoryGlobal, IsDeletedCategory, IsActiveCategory } from '../../api/category';
import TableComponent from '../../components/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPencilAlt, faLock, faUnlock, faTimes, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ModalConfirm, ModalAlert } from '../../components/modal';
import { RedirectPage } from '../../helpers/redirectPage';

const CategoriesGlobal = () => {
    const [load, setLoad] = useState(true);
    const title = ['Name', 'Description', 'Action'];
    const [categories, setCategories] = useState([])

    const FecthData = async() => {
        const result = await GetCategoryGlobal();
        if(result.success){
            let data = []
            if(result.data.length > 0) {
                data = result.data.map((data) => ([
                    data.name,
                    data.description,
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
                setCategories(data)
            }
        }
        setLoad(false)
    }

    useEffect(() => {
        FecthData();
    }, [])


    const handleUpdateClick = (id) => {
        RedirectPage('/admin/category_update', {categoryId: id})
    }
    

    const handleViewClick = (id) => {
        RedirectPage('/admin/category', {categoryId: id})
    }

    const handleAddClick = () => {
        RedirectPage('/admin/category_add')
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
        const result = await IsDeletedCategory({id, isDeleted: true})
        if(result.success){
            ModalAlert('Success', 'Record successfully deleted', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not deleted successfully', 'error')
        }
    }

    const handleRecovery = async(id) => {
        const result = await IsDeletedCategory({id, isDeleted: false})
        if(result.success){
            ModalAlert('Success', 'Record successfully retrieved', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not retrieved successfully', 'error')
        }
    }

    const handleLock = async(id) => {
        const result = await IsActiveCategory({id,isActive:false})
        if(result.success){
            ModalAlert('Success', 'record locked successfully', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Registration not blocked successfully', 'error')
        }
    }

    const handleUnLock = async(id) => {
        const result = await IsActiveCategory({id,isActive:true})
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
                                <p className='title'>Categories</p>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddClick()} className="add"/>
                                </div>   

                            </div>
                            <TableComponent data={categories} title={title} message='Categories not found' />
                        </div>
                    </>
            }
        </>
    )
}

export default CategoriesGlobal;