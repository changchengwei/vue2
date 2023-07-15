import Vue from 'vue'
import svg from './svg.vue'
Vue.directive('loadings',{
    inserted(el, bing) { 
        // el ==>表示被绑定了指令的那个元素，这个el是一个原生的js对象。
        // bing ==> 指令相关的信息
        // 得到一个组件的构造函数
        const loadingCtor = Vue.extend(svg)
        // 得到实例loadingComp
        const loadingComp = new loadingCtor()
        // 获取实例的html
        const htmlLoading = loadingComp.$mount().$el
        // 将html放在el的实例上面去
        el.myHtml = htmlLoading
        if (bing.value) { 
            appendHtml(el)
        }
      },
      update(el, bing) { 
        // bing.value 是v-loading绑定的那个值； true 要显示加载动画
        //新值 bing.value与旧值bing.oldValue是否相等
        if (bing.value !== bing.oldValue ) { 
            bing.value ? appendHtml(el) : removeHtml(el)
        }
      }
})
function appendHtml(el) { 
    el.appendChild(el.myHtml)
  }
  
  function removeHtml(el) { 
    el.removeChild(el.myHtml)
  }