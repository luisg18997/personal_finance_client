import { URLAPI, URLAPIPOST } from './apiBase';
const api = URLAPI(`${process.env.REACT_APP_API_URL}users/`)
const user_data = JSON.parse(localStorage.getItem('user_data'))

export const SingIn = async(values) => {
    try {
        const result =await URLAPIPOST(api, 'login', values)
        return result.data;
    } catch (e) {
        console.log('error in the function Login: ', e.message);
    }
}

export const UserAdd = async(values) => {
    try {
        const result =await URLAPIPOST(api, 'register', values)
        return result.data;
    } catch (e) {
        console.log('error in the function Login: ', e.message);
    }
}

export const ChangePassword = async(values) => {
    try {
        const result =await URLAPIPOST(api, 'changePassword', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);
    }
}

export const userUpdate = async(values) => {
    try {
        api.defaults.headers.Authorization = `Bearer ${user_data.accessToken}`
        const result =await URLAPIPOST(api, 'update', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);
    }
}

export const ForgotPassword = async(values) => {
    try {
        const result =await URLAPIPOST(api, 'forgotPassword', values)
        return result.data;
    } catch (e) {
        console.log('error in the function UserAdd: ', e.message);
    }
}