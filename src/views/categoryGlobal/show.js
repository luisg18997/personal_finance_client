import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import NavMenu from "../../components/navbar";
import history from "../../helpers/history";
import { RedirectPage } from "../../helpers/redirectPage";
import { GetCategory } from "../../api/category";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CategoryGlobalView = () => {
    const [load, setLoad] = useState(true)
    const [values, setValues] = useState({id: '', name: '', description: ''})

    const FecthData = async() => {
        try {
            if(history.location.state){
                const {categoryId} = history.location.state
                const result = await GetCategory(categoryId);
                if(result.success){
                    setValues({
                        ...values,
                        id: result.data.id,
                        name: result.data.category,
                        description: result.data.description,
                    })
                }
            } else {
                throw 'not found';
            }
        } catch (error) {
            RedirectPage('/admin/categories');
        }
        setLoad(false)
    }

    const ChangePage = () => {
        RedirectPage('/admin/categories');
    }

    useEffect(() => {
        FecthData()
    },[])
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
                                    <p className='title'>Category</p>
                                    <div className='text-right pr-3 mr-3'>
                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{cursor: 'pointer'}} size={'lg'} onClick={() => {ChangePage()}}/>
                                    </div>
                                    <div className='row pt-3 w-100 justify-content-center'>
                                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                                <p><b className='label-name'>Name of Category: </b> {values.name}</p>
                                            </div>
                                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                                <p><b className='label-name'>Code of Category: </b> {values.description}</p>
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

export default CategoryGlobalView;