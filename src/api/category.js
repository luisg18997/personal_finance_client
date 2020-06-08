import { URLAPI, URLAPIPOST, URLAPIGET } from './apiBase';
const api = URLAPI(`${process.env.REACT_APP_API_URL}category/`)
const user_data = JSON.parse(localStorage.getItem('user_data'))


export const AddCategory = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'register', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const AddCategoryPersonal = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'registerPersonal', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetCategory = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetCategoryGlobal = async() => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, '')
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const GetCategoryGlobalPersonal = async(id) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIGET(api, `personal/${id}`)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const UpdateCategory = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'update', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsActiveCategory =async (values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isActive', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const IsDeletedCategory = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'isDeleted', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}

export const DeleteCategoryPersonal = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'deletePersonal', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);        
    }
}