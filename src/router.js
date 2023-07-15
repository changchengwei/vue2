import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'


Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
  mode:'hash',
  routes:[

  ]
})

const navigationList = [
  {
    path: '/homePage',
    name: '',
    component: 'homePage'
  }
]
/**
 * 登录钩子函数
 * to 即将要进入的目标 路由对象
 * from 当前导航正要离开的路由
 * next 一定要调用该方法来 resolve 这个钩子
 * next() 进行管道中的下一个钩子 如果全部钩子执行完了，则状态就是 confirmed （确认的）
 */
router.beforeEach((to, from, next) => {
  if (!store.state.asyncRoutestMark) {
      // navigationList 是上面模拟接口返回的数据
      // 这里将新的路由都作为 home 的子路由(实际开发根据情况)
      // meta 是存储一些信息，可以用于权限校验或其他
      navigationList.forEach( navigation => {
        router.addRoute('console',{
          path: navigation.path,
          name: navigation.component,
          component: () => import(`./pages${navigation.path}`)
        })
        router.addRoute({
          path: `/card${navigation.path}`,
          name: navigation.component,
          component: () => import(`./pages${navigation.path}`)
        })
      })
      router.addRoute('console',{
        path: '*',
        name: 'err404',
        component: () => import('./components/err/err404.vue')
      })
      // console.log(router.getRoutes(), '查看现有路由')
      store.commit('setAsyncRoutestMark', true) // 添加路由后更改标识为true
      if(to.path == '/'){
        next('/login')
      }else{
        next({ ...to, replace: true })  //路由进行重定向放行
      }
  } else {
    next()
  }
})

export default router