<template>
    <div>
        <MHeader>首页</MHeader>
        <div class="content">
            <Loading v-if="loading">疯狂加载中...</Loading>
            <template v-else>
                <Swiper :swiperSlides="sliders"></Swiper>
                <div class="container">
                    <h3>热门图书</h3>
                    <ul>
                        <li v-for="hot in hotBooks">
                            <img :src="hot.bookCover">
                            <b>{{hot.bookName}}</b>
                        </li>
                    </ul>
                </div>
            </template>

        </div>

    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue';
    import Swiper from '../base/Swiper.vue';
    // import {getSliders, getHotBook} from "../api";
    import {getAll} from "../api";
    import Loading from '../base/Loading.vue';

    export default {
        created() {
            this.getData();
            /*this.getSlider();//获取轮播图
            this.getHot(); //获取最新图书*/
        },
        data() {
            return {
                sliders: [], hotBooks: [], loading: true
            }
        },
        methods: {
            async getData() {
                let [sliders, hotBooks] = await getAll(); //[sliders,books]
                this.sliders = sliders;
                this.hotBooks = hotBooks; //...轮播图和获取图书已经完成
                this.loading = false;
            }
            /*async getHot() {
                this.hotBooks = await getHotBook();
            },
            async getSlider() {
                //给data去别名 对象中的属性名字必须和得到的结果名字一致
                this.sliders = await getSliders();
                //将获取的数据放到sliders中
            }*/
        },
        computed: {},
        components: {
            MHeader, Swiper, Loading
        }
    }
</script>
<style scoped lang="less">
    h3 {
        color: #999;
        padding: 5px 0;
    }

    .container {
        width: 90%;
        margin: 0 auto;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 10px;

    li {
        width: 50%;
        text-align: center;
        margin: 5px 0;

    img {
        width: 100%;
    }

    }
    }
    }
</style>
