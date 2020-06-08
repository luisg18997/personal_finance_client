import { URLAPI, URLAPIPOST, URLAPIGET } from './apiBase';
const api = URLAPI(`${process.env.REACT_APP_API_URL}currency/`)
const user_data = JSON.parse(localStorage.getItem('user_data'))


export const AddCurrency = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'register', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetCurrency = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetCurrencies = async() => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, '')
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const UpdateCurrency = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'update', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsActiveCurrency =async (values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isActive', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsDeletedCurrency = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isDeleted', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}