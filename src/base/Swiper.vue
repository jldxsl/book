<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slider,key) in swiperSlides" :key="key">
            <img :src="slider" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
    export default {
        name: 'carousel',
        props: ['swiperSlides'],
        data() {
            return {
                swiperOption: {
                    autoplay: true,
                    speed: 400,
                    loop: true,
                    setWrappperSize: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    observeParents: true
                },

            }
        }
    }
</script>
<style scoped>
    img {
        width: 100%;
    }
</style>
