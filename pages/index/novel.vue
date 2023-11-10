<template>
    <div>
        <div class="card" :class="['card'+item.id]" v-for="(item, index) in novleData" :key="index" >
            <!-- <popup /> -->
            <div class="fee" v-if="item.fee > 0" @click="buyBlog(item.fee, 'card'+item.id, item.id)"><i class="icon-coin-dollar"></i>{{item.fee}} BaBy</div>
            <div class="user" @click="handleCardClick(item.uid)">
                <!-- use fake contry cause image doesn't exist -->
                <img class="thumbnail" :src="item.avatar == '' ? item.gender+'.png' : item.avatar" alt="">
                <div>
                    <div class="name">{{item.nickname}}</div>
                    <div>
                        <Tag :content="item.age" :color="`red`" :type="item.gender" />
                        <span class="region">
                        
                        </span>
                    </div>
                </div>
            </div>

                <div class="media">


                <ul class="styling" style="margin: auto">
                    <like :status="item.likes_status" :type="item.type" :likeId="item.id" :number="item.likes_num" />
                    <dislike :status="item.dislikes_status" :type="item.type" :dislikeId="item.id" :number="item.dislike_num" />   
                 <li @click="goDetail(item.id)"><i class="icon-bubbles"></i>{{item.review_num}}</li>
                 <li @click="showShare(item)"><i class="icon-share2"></i>{{item.share_num}}</li>
                </ul>
                </div>
                <div class="content" @click="goDetail(item.id)">
                    <!-- {{item.pic_url[0]}} -->
                    <div class="blur-overlay" v-if="item.can_play == 2"></div>
                    <p v-line-clamp:20="2">{{item.content}}</p>  
                </div>
            <div class="social">

                </div>
            </div>
    </div>  
</template>
<style lang="scss">
    .content {
        position: relative;
            .blur-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0; 
                width: 100%;
                height: 100%;
                z-index: 3;
                backdrop-filter: blur(15px);
            }
    }
</style>
<script>

import '@/utils/mixins';
import social from '../share/social'
import Vue       from 'vue'
import lineClamp from 'vue-line-clamp'
Vue.use(lineClamp, {
  // plugin options
})
export default {
    data() {
        return {
            novleData: null,
            page:1
        }
    },
    mounted() {
        this.getNovelData()
    },
    created() {
        this.likeButton = social.likeButton.bind(this)
        this.dislikeButton = social.dislikeButton.bind(this)
        this.goDetail = social.goDetail.bind(this)
    },
    methods: {
        async getNovelData() {
                let encryptData = await this.encrypt({"type":5 ,"page_size":20,"page_no":this.page,"chkUser":0}, 1)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'blog/index', formData)
                    .then((res) => {
                        console.log("小說",res.data)
                        this.novleData = res.data.data
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        handleCardClick(targetId) {
            this.$router.push({ path: `/my/${targetId}` })
        },
            buyBlog(fee, className, id) {
                this.$confirm("该内容需要支付 "+fee + "BABY,即可正常觀看是否支付?", false, false, {confirmButtonText: '确认', cancelButtonText: '再看看'})
                .then(() => {
                    this.payBlog(fee, className, id)
                })
            },
            async payBlog(fee, className, id) {
                    let encryptData = await this.encrypt({id: id},1)
                    let formData = new FormData();
                    formData.append("data", encryptData);
                    let countryList = this.$axios.post(process.env.BASE_URL+'blog/pay', formData)
                        .then((res) => {
                            if(res.data.status == 1) {
                                this.removeBlur(className)
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                        })
            },
            removeBlur(className) {
                document.querySelectorAll('.'+className+ ' .blur-overlay').forEach(e => e.parentNode.removeChild(e));
            }
    },
}
</script>