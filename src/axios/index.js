import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const {NODE_ENV,VUE_APP_ROOT,VUE_APP_API,VUE_APP_URL} = process.env;

// 添加请求拦截器 request 统一处理接口路径（区分生产环境,测试环境）
axios.interceptors.request.use((config) => {
    
    // 在请求头中添加token
    if (localStorage.getItem('xtoken')) {
        config.headers['xtoken'] = localStorage.getItem('xtoken')
    }
    if(config.url.includes('/api')){
        config.url = config.url
        // config.url = NODE_ENV == 'production'
        // ?config.url.replace('/api', VUE_APP_ROOT)
        // :config.url
    }else{
        config.url = VUE_APP_ROOT + config.url;
    }
    return config
}, error => {
    return Promise.reject(error);
});


// 添加响应拦截器 response
axios.interceptors.response.use(
    // 接口请求成功拦截
    response => {
        return response.data;
    },
    // 接口请求失败拦截
    error => {
        let errData = error.response.data
        if (errData.code == 1003) {
            showMessage(errData.msg).then(() => {
                login()
            })
        } else {
            showMessage(errData.msg)
        }
        return Promise.reject(errData)
    }
)
function showMessage (msg) {
    return MessageBox.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}
function login () {
    let url = VUE_APP_URL + '/app-console#/login' // 登录页
    window.open(url, '_parent')
}