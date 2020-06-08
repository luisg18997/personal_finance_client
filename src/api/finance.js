import { URLAPI, URLAPIPOST, URLAPIGET } from './apiBase';
const api = URLAPI(`${process.env.REACT_APP_API_URL}finance/`)
const user_data = JSON.parse(localStorage.getItem('user_data'))


export const AddFinance = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'register', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetFinance = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetFinanceList = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `list/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}


export const UpdateFinance = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'update', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const DeleteFinance = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'delete', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const BalanceFinance = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `balance/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const YearOfExpense = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `yearOfExpense/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const MonthOfExpense = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `monthOfExpense/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const ExpenseProgression = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `expenseProgression/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const ExpenseCategoryByMonth = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'expenseCategoryByMonth', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const ExpenseMonthByYear = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'expenseMonthByYear', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const ExpenseDayByMonth = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'expenseDayByMonth', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

