<template>
    <div>
        <MHeader>添加</MHeader>
        <div class="content">
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
                    <label for="bookCover">图书封面：</label>
                    <input type="text" v-model.number="book.bookCover" id="bookCover">
                </li>
                <li>
                    <button @click="add">添加</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue';
    import {addBook} from '../api';

    export default {
        data() {
            return {book: {}}
        },
        methods: {
            async add() {
                await addBook(this.book);
                this.$router.push('/list');
            }
        },
        computed: {},
        components: {MHeader}
    }
</script>
<style scoped>
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
