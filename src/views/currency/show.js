import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import { GetCurrency } from "../../api/currency";
import { RedirectPage } from "../../helpers/redirectPage";
import history from "../../helpers/history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";


const CurrencyShow = () => {
    const [load, setLoad] = useState(true)
    const [values,setValues] = useState({name: '', code: '', symbol: ''});

    const FecthData = async() => {
        try {
            if(history.location.state){
                const {currencyId} = history.location.state
                const result = await GetCurrency(currencyId);
                if(result.success){
                    console.log(result.data)
                    setValues({
                        ...values,
                        id: result.data.id,
                        name: result.data.name,
                        code: result.data.code,
                        symbol: result.data.symbol
                    })
                }
            } else  {
               throw 'not found';
            }
            setLoad(false)
        } catch (error) {
            RedirectPage('/admin/currencies');
        }
    }
    
    useEffect(() => {
        FecthData()
    },[])

    const ChangePage = () => {
        RedirectPage('/admin/currencies');
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
                                        <p className='title'>Currency</p>
                                        <div className='text-right pr-3 mr-3'>
                                            <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{cursor: 'pointer'}} size={'lg'} onClick={() => {ChangePage()}}/>
                                        </div>
                                        <div className='row pt-3 w-100 justify-content-center'>
                                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                                <p><b className='label-name'>Name of Currency: </b> {values.name}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                                <p><b className='label-name'>Code of Currency: </b> {values.code}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6 col-sm-12'>
                                                <p><b className='label-name'>Symbol of Currency: </b> {values.symbol}</p>
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

export default CurrencyShow;