import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 打开浏览器 → getters → 组件调用actions中的方法 → mutations（设置state的值） → getters（更新数据）
let store = new Vuex.Store({
    // 这里放全局参数
    state: {
        asyncRoutestMark:false
    },
    // 这里是set方法
    mutations: {
        setAsyncRoutestMark: (state, asyncRoutestMark) => {
            state.asyncRoutestMark = asyncRoutestMark
        }
    },
    // 这里是get方法,并且每次打开浏览器优先执行该方法，获取所有的状态
    getters: {

    },
})
export default store; 