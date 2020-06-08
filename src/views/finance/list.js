import React, { useState, useEffect } from 'react'
import Spinner from '../../components/spinner';
import NavMenu from '../../components/navbar';
import { ModalAlert, ModalConfirm } from '../../components/modal';
import { RedirectPage } from '../../helpers/redirectPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableComponent from '../../components/table';
import { faSearch, faPencilAlt, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetFinanceList, DeleteFinance } from '../../api/finance';

const FinanceList = () => {
    const [load, setLoad] = useState(true);
    const title = ['Title', 'Mount', 'Currency', 'Category', 'Tipo', 'Date', 'Action'];
    const [categories, setCategories] = useState([])

    const FecthData = async() => {
        const user_data = JSON.parse(localStorage.getItem('user_data'))
        const result = await GetFinanceList(user_data.id);
        if(result.success){
            let data = []
            if(result.data.length > 0) {
                data = result.data.map((data) =>  ([
                    data.title,
                    data.mount,
                    data.currency,
                    data.category,
                    data.is_income? 'Income':'Expense',
                    data.finance_date,
                    (
                        <div style={{fontWeight: 700}}>
                            <FontAwesomeIcon icon={faSearch} size="0.4x" style={{cursor:'pointer'}} onClick={() => {handleViewClick(data.id)}} /> 
                            <FontAwesomeIcon icon={faPencilAlt} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={() => {handleUpdateClick(data.id)}}/>
                            <FontAwesomeIcon icon={faTimes} size="lg" style={{paddingLeft: 6, cursor:'pointer'}} onClick={()=>{HandleConfirmDeleted(data.id, user_data.id)}} />
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
        RedirectPage('/client/finance_update', {financeId: id})
    }
    

    const handleViewClick = (id) => {
        RedirectPage('/client/finance', {financeId: id})
    }

    const handleAddClick = () => {
        RedirectPage('/client/finance_add')
    }

    const HandleConfirmDeleted = (id, userId) => {
    
    ModalConfirm('Warning', 'Are you sure you want to delete the record?', 'warning', ()=>{handleDeleted(id, userId)})
       
    }


    const handleDeleted = async(id, userId) => {
        const result = await DeleteFinance({id, userId})
        if(result.success){
            ModalAlert('Success', 'Record successfully deleted', 'success')
            await FecthData()
        } else {
            ModalAlert('Error', 'Record not deleted successfully', 'error')
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
                                <p className='title'>Finance Personal</p>
                                <div className='icon'>
                                    <FontAwesomeIcon icon={faPlus} onClick={()=>handleAddClick()} className="add"/>
                                </div>   

                            </div>
                            <TableComponent data={categories} title={title} message='Finance Personal not found' />
                        </div>
                    </>
            }
        </>
    )
}

export default FinanceList;