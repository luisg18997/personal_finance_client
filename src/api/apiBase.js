import axios from 'axios';
import {RedirectPage} from '../helpers/redirectPage'

export const URLAPI = (URLEnv) => {
  return  axios.create({
     baseURL: URLEnv,
     headers: {
       'content-type': 'application/json',
     }
   })
}

export const URLAPIGET = async (api, route) => {
  const result = await api.get(route)
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.error(`'The error in the call route ${route}  is:', ${error.message}`);
    if(error.response.status === 401) {
      RedirectPage('/')
    }
    return error.response;
  })
  return result;
}

export const URLAPIPOST = async(api, route, body) => {
  const result = await api.post(route,body)
  .then((res) => {
      return res
  })
  .catch((error) => {
    console.error(`'The error in the call route ${route}  is:', ${error.message}`);
    if(error.response.status === 401) {
      RedirectPage('/')
    }
    return error.response;
  })
  return result;
}
