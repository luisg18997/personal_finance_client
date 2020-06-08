import React, { useState, useEffect } from 'react'
import Spinner from '../../components/spinner';
import NavMenu from '../../components/navbar';
import { GetCategoryGlobalPersonal, DeleteCategoryPersonal, IsActiveCategory } from '../../api/category';
import { ModalAlert, ModalConfirm } from '../../components/modal';
import { RedirectPage } from '../../helpers/redirectPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableComponent from '../../components/table';
import { faSearch, faPencilAlt, faLock, faUnlock, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

const CategoriesPersonal = () => {
    const [load, setLoad] = useState(true);
    const title = ['Name', 'Description', 'Action'];
    const [categories, setCategories] = useState([])

    const FecthData = async() => {
        const user_data = JSON.parse(localStorage.getItem('user_data'))
        const result = await GetCategoryGlobalPersonal(user_data.id);
        if(result.success){
            let data = []
            if(result.data.length > 0) {
                console.log(result.data)
                const catPersonal = result.data.filter((personal => personal.is_personal === true))
                if(catPersonal.length > 0){
                    data = catPersonal.map((data) =>  ([
                        data.name,
                        data.description,
                        (
                            <div style={{fontWeight: 700}}>
                                <FontAwesomeIcon icon={faSearch} size="0.4x" style={{cursor:'pointer'}} onClick={() => {handleViewClick(data.id)}} /> 
                                {
                                        data.isactive &&
                                    <FontAwesomeIcon icon={faPencilAlt} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={() => {handleUpdateClick(data.id)}}/>
                                }
                                {
                                        data.isactive?
                                    <FontAwesomeIcon icon={faLock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, true)}}/>
                                    :
                                    <FontAwesomeIcon icon={faUnlock} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmIsActive(data.id, false)}}/>
                                }
                                <FontAwesomeIcon icon={faTimes} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, user_data.id)}} />
                            </div>
                        )
                    ]))
                }
                setCategories(data)
            }
        }
        setLoad(false)
    }

    useEffect(() => {
        FecthData();
    }, [])


    const handleUpdateClick = (id) => {
        RedirectPage('/client/category_update', {categoryId: id})
    }
    

    const handleViewClick = (id) => {
        RedirectPage('/client/category', {categoryId: id})
    }

    const handleAddClick = () => {
        RedirectPage('/client/category_add')
    }

    const HandleConfirmDeleted = (id, userId) => {
    
    ModalConfirm('Warning', 'Are you sure you want to delete the record?', 'warning', ()=>{handleDeleted(id, userId)})
       
    }

    const HandleConfirmIsActive = (id, isActive) => {
        if(isActive){
            ModalConfirm('Warning', 'Are you sure you want to block the record?', 'warning', ()=>{handleLock(id)})
        } else {
            ModalConfirm('Warning', 'Are you sure to unlock the registry?', 'warning', ()=>{handleUnLock(id)})
        }
    }

    const handleDeleted = async(id, userId) => {
        const result = await DeleteCategoryPersonal({id, userId})
        if(result.success){
            ModalAlert('Success', 'Record successfully deleted', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not deleted successfully', 'error')
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
                                <p className='title'>Categories Personal</p>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddClick()} className="add"/>
                                </div>   

                            </div>
                            <TableComponent data={categories} title={title} message='Categories Personal not found' />
                        </div>
                    </>
            }
        </>
    )
}

export default CategoriesPersonal;