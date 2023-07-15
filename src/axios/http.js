import axios from 'axios'
import store from '@/store';

let url = {
    login:'/api/console/user/login',
    register:'/api/console/user/addUser',
    xtoken:'/api/console/user/xtoken'
}

function login(params){
    return axios.post(url.login,params)
}
function loginOut(){
    store.commit('setUser', '')
    store.commit('setXtoken', '')
    localStorage.removeItem('xtoken')
}
function register(params){
   return axios.post(url.register,params)
}
function xtoken(params){
    return axios.post(url.xtoken,params)
}
export default {
    login,
    loginOut,
    register,
    xtoken
};
