import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'lib-flexible'
// 在这里引入你所需的组件
import {
    Button,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    Lazyload,
    NavBar,
    PullRefresh,
    Toast,
    Grid,
    GridItem,
    Image as VanImage,
    List,
    Tab,
    Tabs,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Card,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    NoticeBar
} from 'vant';
//按需引入UI组件
Vue.use(Button),
    Vue.use(Tabbar),
    Vue.use(TabbarItem),
    Vue.use(Swipe),
    Vue.use(Toast),
    Vue.use(SwipeItem),
    Vue.use(Lazyload, {
        lazyComponent: true,
        loading: require('./assets/img/common/placeholder.png'),
    }),
    Vue.use(NavBar),
    Vue.use(PullRefresh),
    Vue.use(Grid),
    Vue.use(GridItem),
    Vue.use(VanImage),
    Vue.use(List),
    Vue.use(Tab),
    Vue.use(Tabs),
    Vue.use(GoodsAction),
    Vue.use(GoodsActionIcon),
    Vue.use(GoodsActionButton),
    Vue.use(Card),
    Vue.use(Checkbox),
    Vue.use(CheckboxGroup),
    Vue.use(SubmitBar),
    Vue.use(NoticeBar),







    //新建一个事件总线new一个vue实例
    Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
    //解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')