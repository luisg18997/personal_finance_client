import { URLAPI, URLAPIPOST, URLAPIGET } from './apiBase';
const api = URLAPI(`${process.env.REACT_APP_API_URL}client/`)
const user_data = JSON.parse(localStorage.getItem('user_data'))


export const GetClient = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetClients = async() => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, '')
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const UpdateClient = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'update', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsActiveClient =async (values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isActive', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsDeletedClient = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isDeleted', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}