// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

//进入路由之前每一次都会执行此方法
router.beforeEach(function (to,from,next) {
    document.title = to.meta.title;
    next();
});
Vue.config.productionTip = false;
//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';
/* eslint-disable no-new */

//图片懒加载
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'http://img4.imgtn.bdimg.com/it/u=450761770,123969588&fm=200&gp=0.jpg',
    loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204194032.gif',
    attempt: 1
});
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
