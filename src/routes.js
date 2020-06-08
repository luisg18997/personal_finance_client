import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './helpers/history'
import Login from './views/auth/login'
import ChangePass from './views/auth/changePass'
import ForgotPass from './views/auth/forgotPass'
import AdminDashboard from './views/admin/dashboard'
import ClientDashboard from './views/client/dashboard'
import Currencies from './views/currency/list'
import CurrencyAdd from './views/currency/add'
import CurrencyUpdate from './views/currency/update'
import CurrencyShow from './views/currency/show'
import CategoriesGlobal from './views/categoryGlobal/list'
import CategoryGlobalView from './views/categoryGlobal/show'
import CategoryGlobalAdd from './views/categoryGlobal/add'
import CategoryGlobalUpdate from './views/categoryGlobal/update'
import ChangePassAdmin from './views/admin/changePass'
import Clients from './views/clientAdmin/list'
import ClientAdd from './views/clientAdmin/add'
import ClientUpdate from './views/clientAdmin/update'
import ClientView from './views/clientAdmin/show'
import UpdateUser from './views/admin/updateUser'
import UpdateProfileClient from './views/client/updateProfile'
import ProfileClient from './views/client/profile'
import ChangePassClient from './views/client/changePass'
import CategoriesPersonal from './views/categoryPersonal/list'
import CategoryPersonalAdd from './views/categoryPersonal/add'
import CategoryPersonalUpdate from './views/categoryPersonal/update'
import CategoryPersonalView from './views/categoryPersonal/show'
import SingUp from './views/auth/singUp'
import FinanceList from './views/finance/list'
import FinanceAdd from './views/finance/add'
import FinanceUpdate from './views/finance/update'
import FinanceShow from './views/finance/show'
import FinanceReport from './views/finance/report'


const Routes = () => {

    return(
        <Router history={history}>
            <Switch>
                {/* route auth */}
                <Route exact path='/' component={Login} />
                <Route path='/change_pass' component={ChangePass} />
                <Route path='/forgot_pass' component={ForgotPass} />
                <Route path='/sign_up' component={SingUp} />

                {/* route client */}
                <Route path='/client/dashboard' component={ClientDashboard} />
                <Route path='/client/profile' component={ProfileClient} />
                <Route path='/client/profile_update' component={UpdateProfileClient} />
                <Route path='/client/change_pass' component={ChangePassClient} />

                <Route path='/client/categories' component={CategoriesPersonal} />
                <Route path='/client/category_add' component={CategoryPersonalAdd} />
                <Route path='/client/category_update' component={CategoryPersonalUpdate} />
                <Route path='/client/category' component={CategoryPersonalView} />

                <Route path='/client/finance_list' component={FinanceList} />
                <Route path='/client/finance_add' component={FinanceAdd} />
                <Route path='/client/finance_update' component={FinanceUpdate} />
                <Route path='/client/finance' component={FinanceShow} />
                <Route path='/client/finance_report' component={FinanceReport} />
                
                {/* route admin */}
                <Route path='/admin/dashboard' component={AdminDashboard} />
                <Route path='/admin/change_pass' component={ChangePassAdmin} />
                <Route path='/admin/update_profile' component={UpdateUser} />

                <Route path='/admin/currencies' component={Currencies} />
                <Route path='/admin/currency_add' component={CurrencyAdd} />
                <Route path='/admin/currency_update' component={CurrencyUpdate} />
                <Route path='/admin/currency' component={CurrencyShow} />

                <Route path='/admin/categories' component={CategoriesGlobal} />
                <Route path='/admin/category_add' component={CategoryGlobalAdd} />
                <Route path='/admin/category_update' component={CategoryGlobalUpdate} />
                <Route path='/admin/category' component={CategoryGlobalView} />

                <Route path='/admin/clients' component={Clients} />
                <Route path='/admin/client_add' component={ClientAdd} />
                <Route path='/admin/client_update' component={ClientUpdate} />
                <Route path='/admin/client' component={ClientView} />
                
            </Switch>
        </Router>
    )
}

export default Routes