<template>
    <div class="papa">
        <swiper  ref="mySwiper" :options="swiperOptions" @slideChange="slideChanged">
            <swiper-slide v-for="(item, index) in papaData" :key="index" :class="[noSwiper? 'swiper-no-swiping': '']">
                    <VideoPlayer 
                        :videoData="{data: item, index: index}"
                        @enableswiper="enableSwiper"
                        @disableswiper="disableSwiper"
                    ></VideoPlayer> 
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>

import '@/utils/mixins';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import EventBus from '../pages/share/event-bus';
export default {
    data() {
        return {
            papaData: null,
            noSwiper: false,
            swiperOptions: {
                direction: 'vertical'
            }
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    computed: {
        swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
    this.$store.commit("setIsHeaderShow", false)
      this.getPapaIndex()
      this.swiper.slideTo(0, 1000, false)
      document.querySelector('.swiper-container').style.height = window.innerHeight + "px"
    },
    methods: {
        async getPapaIndex() {
            let encryptData = await this.encrypt({saveFile: 1})
            let formData = new FormData();
            formData.append("data", encryptData)
            let countryList = this.$axios.post(process.env.BASE_URL+'papa/index', formData)
            .then((res) => {
                    // this.history = res.data.data
                    console.log("啪啪",res)
                    this.papaData = res.data.data
                })
            .catch((err) => {
                console.log("get encrypt error")
            })
        },
        disableSwiper() {
            this.$store.commit("setIsFooterShow", false);
            this.noSwiper = true
        },
        enableSwiper() {
            this.noSwiper = false
            this.$store.commit("setIsFooterShow", true);
        },
        slideChanged() {
            console.log('video'+(parseInt(this.swiper.activeIndex)-1))
            EventBus.$emit('video'+this.swiper.activeIndex);
        }
    }
}
</script>
<style lang="scss">
    .papa {
        .swiper-container  {
            // height: 100vh;
            .swiper-slide {
                position: relative;
            }
        }
        background: black;
    }
</style>