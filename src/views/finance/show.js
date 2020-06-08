import React, {useState, useEffect} from 'react';
import { RedirectPage } from '../../helpers/redirectPage';
import { GetFinance } from '../../api/finance';
import Spinner from "../../components/spinner";
import NavMenu from '../../components/navbar';
import history from '../../helpers/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


const FinanceShow = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '',category: '', financeDate:'', financeHour:'', title:'', description:'', mount:'', isIncome: 'true', currency: '', userId: ''})

    useEffect(() => {
        const handleChangeData = async() => {
            try {
                if(history.location.state.financeId){
                    const {financeId} = history.location.state
                    const user_data = JSON.parse(localStorage.getItem('user_data'));
                    const result = await GetFinance(financeId);
                    if(result.success){
                        setValues({
                            id: result.data.id,
                            title: result.data.title,
                            description: result.data.description,
                            financeDate: result.data.finance_date,
                            financeHour: result.data.finance_hour,
                            mount: result.data.mount,
                            category: result.data.category,
                            currency: result.data.currency,
                            isIncome: result.data.is_income? 'Income': 'Expense',
                            userId: user_data.id
                        })
                        setLoad(false)
                    } else {
                        throw 'not found';
                    }
                    
                }else {
                    throw 'not found';
                }
            } catch (error) {
                console.log(error)
                RedirectPage('/client/finance_list')
            }
        }
        handleChangeData()
    },[])

    const ChangePage = () => {
        RedirectPage('/client/finance_list');
    }

    return(
        <>
            {
                load?
                    <Spinner />
                :
                <>
                    <NavMenu />
                    <div className='content'>
                        <div className='container-box'>
                            <div className='card'>
                                <div className='card-body'>
                                    <p className='title'>Finance</p>
                                    <div className='text-right pr-3 mr-3'>
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{cursor: 'pointer'}} size={'lg'} onClick={() => {ChangePage()}}/>
                                    </div>
                                    <div className='row pt-3 w-100 justify-content-center'>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Title of finance: </b> {values.title}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Type of finance: </b> {values.isIncome}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Date of finance: </b> {values.financeDate}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Hour of finance: </b> {values.financeHour}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Mount of finance: </b> {values.mount}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Currency of finance: </b> {values.currency}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <p><b className='label-name'>Category of finance: </b> {values.category}</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6  col-sm-12'>
                                            <p><b className='label-name'>Description of finance: </b> {values.description}</p>
                                        </div>
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

export default FinanceShow