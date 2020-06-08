import React from 'react'
import { Route, Redirect } from 'react-router-dom';
const user_data = JSON.parse(localStorage.getItem('user_data'))

const PrivateRoute = ({component: Component, role, ...rest}) => {
    return(
        <Route {...rest} render={props => {
            user_data?
            <>
                {
                    role===user_data?
                    <Component {...props} />
                    :
                    <Redirect to={role==='user'?'/user/home': '/admin/dashboard'}/>
                    
                }
            </>
            :
            <Redirect to="/" />
        }}/>
    )
    
}

export default PrivateRoute
