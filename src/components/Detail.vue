<template>
    <div class="detail">
        <MHeader :back="true">详情</MHeader>

        <ul>
            <li>
                <label for="bookName">图书名称：</label>
                <input type="text" v-model="book.bookName" id="bookName">
            </li>
            <li>
                <label for="bookInfo">图书信息：</label>
                <input type="text" v-model="book.bookInfo" id="bookInfo">
            </li>
            <li>
                <label for="bookPrice">图书价钱：</label>
                <input type="text" v-model.number="book.bookPrice" id="bookPrice">
            </li>
            <li>
                <button @click="update">确认修改</button>
            </li>
        </ul>

    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue';
    import {findOneBook, updateBook} from '../api';

    export default {
        data() {
            return {book: {}}
        },
        watch: {
            $route() { //只要路劲变化 重新回去数据
                this.getData();
            }
        },
        created() { //页面以加载需要根据id 发送请求
            this.getData();
        },
        methods: {
            async update() {
                await updateBook(this.bid, this.book);
                this.$router.push('/list'); //修改完成后跳转页面
            },
            async getData() { //通过id找到某一项后赋予给book
                this.book = await findOneBook(this.bid);
                //如果是空对象 需要跳转回列表页
                Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list');
            }
        },
        computed: {
            bid() {
                return this.$route.params.bid;  //将路劲参数的id映射到bid上
            }
        },
        components: {MHeader}
    }
</script>
<style scoped>
    .detail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 100;
    }

    ul {
        margin: 50px 20px 0 20px;
    }

    ul li label {
        display: block;
        font-size: 25px;

    }

    ul li input {
        margin: 10px 0;
        height: 25px;
        width: 100%;
    }

    ul li button {
        width: 100px;
        display: block;
        height: 50px;
        background: #0b60ef;
        color: #fff;
        border: none;
        border-radius: 10px;
        outline: none;
        font-size: 22px;
    }
</style>
