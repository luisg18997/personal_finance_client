import React, { Fragment } from 'react'
import NavMenu from '../../components/navbar'


const AdminDashboard = () => {

    return(
        <Fragment>
            <NavMenu />
            <div className='content'>
                <div className='box'>
                    <p className='admin-label-dashboard'>Welcome Admin</p>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminDashboard;