<template>
    <div>
        <MHeader>
            列表页
        </MHeader>
        <div class="content" ref="scroll" @scroll="loadMore">
            <ul>
                <router-link v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index"
                             tag="li">
                    <img v-lazy="book.bookCover" alt="">
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>¥{{book.bookPrice}}</b>
                        <button @click.stop="remove(book.bookId)">删除</button>
                    </div>
                </router-link>
            </ul>
            <div @click="more" class='more'>加载更多</div>
        </div>
    </div>
</template>
<script>
    import {pagination, removeBook} from '../api'
    import MHeader from '../base/MHeader.vue'

    export default {
        data() {
            //offset 代表偏移量  hasMore是否有更多
            return {books: [], offset: 0, hasMore: true, isLoading: false}
        },
        created() {
            this.getData();
        },
        mounted() {
            let scroll = this.$refs.scroll; //获取到元素
            let top = scroll.offsetTop;
            let distance = 0;
            scroll.addEventListener('touchstart', (e) => {
                //滚动条在最顶端时 并且当前盒子在顶端的时候
                if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
                let start = e.touches[0].pageY;//手指点击的开始
                let move = (e) => {
                    let current = e.touches[0].pageY;
                    distance = current - start; //拉动的距离
                    if (distance > 0) {
                        if (distance <= 50) {//如果大于50就是50px
                            scroll.style.top = distance + top + 'px';
                        } else {
                            distance = 50;
                            scroll.style.top = top + 50 + 'px';
                        }
                    } else {
                        scroll.removeEventListener('touchmove', move);
                        scroll.removeEventListener('touchend', end);
                    }
                };
                let end = (e) => {
                    clearInterval(this.timer1);
                    this.timer1 = setInterval(() => {
                        if (distance <= 0) {
                            clearInterval(this.timer1);
                            distance = 0;
                            scroll.style.top = top + 'px';
                            scroll.removeEventListener('touchmove', move);
                            scroll.removeEventListener('touchsend', end);
                            this.books = [];//先清空数据
                            this.offset = 0;
                            this.hasMore = true;
                            this.getData();
                            return
                        }
                        distance -= 1;
                        scroll.style.top = top + distance + 'px';
                    }, 1)
                };
                scroll.addEventListener('touchmove', move);
                scroll.addEventListener('touchend', end);
            }, false);
        },
        methods: {
            loadMore() {
                //触发scroll事件可能触发n次   先进来开一个定时器，下次触发时将上一次定时器清除掉
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
                    if (scrollTop + clientHeight + 20 > scrollHeight) {
                        this.getData();//获取更多
                    }
                }, 100)

            },
            more() {
                this.getData();
            },
            async remove(id) {
                await removeBook(id); // 删除某一项
                //删除前台数据
                this.books = this.books.filter(item => item.bookId !== id);
            },
            async getData() {

                if (this.hasMore && !this.isLoading) {//有更多的时候获取数据
                    this.isLoading = true;
                    let {hasMore, result} = await pagination(this.offset);
                    this.books = [...this.books, ...result]; //获取的书放在books属性上
                    this.hasMore = hasMore;
                    this.isLoading = false;
                    this.offset = this.books.length; //维护偏移量 就是总书的长度
                }

            }
        },
        computed: {},
        components: {MHeader}
    }
</script>
<style scoped>
    .content ul {
        padding: 10px;
    }

    .content ul li {
        display: flex;
        padding-bottom: 10px 0;
        border-bottom: 1px solid #0b60ef;
    }

    .content ul li img {
        width: 130px;
        height: 150px;
    }

    .content h4 {
        font-size: 20px;
        line-height: 35px;
    }

    .content p {
        color: #2a2a2a;
        line-height: 25px;
    }

    .content b {
        color: red;
        position: absolute;
        left: 40%;
        margin-top: 20px;
    }

    .content button {
        display: block;
        width: 50px;
        height: 25px;
        color: #fff;
        background: orange;
        border: none;
        border-radius: 10px;
        outline: none;
        margin-top: 20px;
        position: absolute;
        right: 15px;

    }

    .more {
        margin: 20px;
        background: #00ccff;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
    }
</style>
