<template>
    <div>
        <!-- <div v-for="(hotTopic, index) in hotTopics" :key="index"> -->
        <div class="card" :class="['card'+item.id]" v-for="(item, index) in hotTopics" :key="index" style=" border-top:10px #fafafa solid;">
            <!-- <popup /> -->
            <div class="fee" v-if="item.fee > 0" @click="buyBlog(item.fee, 'card'+item.id, item.id)"><i class="icon-coin-dollar"></i>{{item.fee}} BaBy</div>
            <div class="user">
                <!-- use fake contry cause image doesn't exist -->
                <img class="thumbnail" :src="item.avatar == '' ? item.gender+'.png' : item.avatar" alt=""  @error="handleAvatarError($event,item.gender)"  @click="handleCardClick(item.uid)">
                <div style="width:60%"  @click="handleCardClick(item.uid)">
                    <div class="name">{{item.nickname}}</div>
                    <div>
                        <Tag :content="item.age" :color="`red`" :type="item.gender" />
                        <span class="region">
                            
                            <img :src="item.country_flag" alt="" @error="handleFlagError">
                        </span>
                    </div>
                </div>
                <div style="float:right;right:5%;display:block;line-height:40px;">
                    <follow :data="item.following" :id="item.uid" />    
                </div>
            </div>
                <div class="media">
                    <div class="blur-overlay" v-if="item.can_play == 2"></div>
                    <swiper class="swiper" :options="swiperOption" ref="mySwiper" v-bind:class="`img`+item.uid">
                        <swiper-slide v-for="(url, index) in item.pic_url" :key="index">
                            <div class="background-cover"></div>
                            <img :src="url" alt=""   @error="imageLoadError(url, $event)" >
                        </swiper-slide>
                        <div v-show="item.pic_url && item.pic_url.length > 1" class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                <ul class="styling" style="margin: auto">
                <like :status="item.likes_status" :type="item.type" :likeId="item.id" :number="item.likes_num" />
                <dislike :status="item.dislikes_status" :type="item.type" :dislikeId="item.id" :number="item.dislike_num" />    
                 <li @click="goDetail(item.id)"><i class="icon-bubbles"></i>{{item.review_num}}</li>
                 <li @click="showShare(item, $event)"><i class="icon-share2"></i><span class="share-num">{{item.share_num}}</span></li>
                </ul>
                </div>
                <div class="content" @click="goDetail(item.id)">
                    <div class="blur-overlay" v-if="item.can_play == 2"></div>
                    {{item.content}}
                </div>
            </div>
        <!-- </div> -->
        <sharefriend v-if="showSharePopup" v-bind:content="tempItem" @closeShare="closeShare" />
    </div>
</template>

<script>
// import Vue from 'vue';
// import VueSimpleAlert from "vue-simple-alert";

import '@/utils/mixins';
import { Base64 } from 'js-base64';
import aesJs from 'aes-js';
import util from '~/assets/js/util'
import Vue from 'vue'
import ScrollLoader from 'vue-scroll-loader'

Vue.use(ScrollLoader)
export default {
  data() {
    return {
      swiperOption: {
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
        },
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination"
        },
        notNextTick: true,
        autoplay: false
      },

      hotTopics: [
      ],
      key: '128bitslength*@#',
      showSharePopup: false,
      page: 1,
      loading: false,
      searchEnd: false,
      dynamicSwiperName: "swiper",
      queneList: []
    }
  },
  beforeMount() {
    this.getHotList()
  } , 
  mounted(){
    // always show header footer in recommand page
    // this.pushFromQuene(5)
    this.$store.commit('setIsHeaderShow', true)
    this.$store.commit('setIsFooterShow', true)
    sessionStorage.setItem("activeMenu", "recommend")
    window.addEventListener("scroll", this.checkScroll)
    console.log('Current Swiper instance object', this.swiper)
  },
    computed: {

    },
  methods: {    
            pushFromQuene(times) {
                for(var i=0; i < times; i++) {
                   this.hotTopics.push(this.queneList[0].shift())
                }
            },
            checkScroll(e) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    this.page = this.page + 1
                    this.pushFromQuene(1)
                }
            },
            async followButton(type,id) {
                let encryptData = await this.encrypt({"type":type ,"op_uid":id ,"room_id":''},1)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'my/follow', formData)
                    .then((res) => {
                        console.log("發漏",res.data)
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
            },
            async dislikeButton(type,id,index) {
                let encryptData = await this.encrypt({"type":1 ,"id":id},1)
                let formData = new FormData();
                formData.append("data", encryptData);
                let countryList = this.$axios.post(process.env.BASE_URL+'blog/dislike', formData)
                    .then((res) => {
                        console.log("抵斯賴可",res.data,"index",index)
                        // this.hotTopics ={},
                        // this.getHotList();
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
            },
            async getHotList() {
                let abc = 0;
                if (this.$store.getters.getIsLogin) {
                    abc = 1;
                }  //判斷是否登入  帶登入資訊
                    let encryptData = await this.encrypt({"page_size":99,"page_no":this.page, uid: this.$store.getters.getUid}, abc)
                    let formData = new FormData();
                    formData.append("data", encryptData);
                    this.$axios.post(process.env.BASE_URL+'blog/index', formData)
                        .then((res) => {
                            this.queneList.push(res.data.data)
                            for(var i = 0;i<5 ;i ++) {
                                console.log(this.queneList[0].shift())
                                this.hotTopics.push(this.queneList[0].shift())
                            }
                            console.log(this.hotTopics)
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })

            },
            handleCardClick(targetId) {
                this.$router.push({ path: `/my/${targetId}` })
            },
            imageLoadError(url, e) {
                // 

                    this.readFileAsArrayBuffer(url).then((imgArrayBuffer) => {
                        e.target.classList += 'swiper-lazy'
                        e.target.setAttribute("src", this.decryptImageFromArrayBuffer(imgArrayBuffer))
                        let index = e.target.parentElement.parentElement.parentElement.getAttribute("swiper-index")
                    });

            },
            handleAvatarError(e,f) {
                console.log(e)
                e.target.setAttribute("src", f+".png")
            },
            handleFlagError(e) {
                e.target.setAttribute("src", "china.svg")
            },
            readFileAsArrayBuffer(url) {
            return this.$axios({
                method: 'get',
                url,
                responseType: 'arraybuffer',
            }).then((response) => response.data);
            },
            decryptImageFromArrayBuffer(imgArrayBuffer) {
                const imgUint8Array = new Uint8Array(imgArrayBuffer);
                const key = aesJs.utils.utf8.toBytes(this.key);
                // eslint-disable-next-line new-cap
                const aesEcb = new aesJs.ModeOfOperation.ecb(key);
                const decImgUint8Array = aesEcb.decrypt(imgUint8Array);
                const imgBlob = new Blob([decImgUint8Array.buffer]);
                const blobUrl = window.URL.createObjectURL(imgBlob);
                return blobUrl;
            },
            goDetail(num) {
                // this.$router.push({name:'pageinfo',params: {id: num}})
                this.$router.push({ path: `/pageinfo/${num}` })
            },
            showShare(item, e) {
                // console.log(e.target.parentElement.innerText)
                let currentShare = parseInt(e.target.parentElement.children[1].innerText)
                e.target.parentElement.children[1].innerText = currentShare + 1
                this.tempItem = item
                this.showSharePopup = true
                document.body.style.overflow = "hidden"
            },
            closeShare() {
                this.showSharePopup = false
                document.body.style.overflow = "visible"
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
        beforeDestroy(){
            window.removeEventListener('scroll', this.checkScroll);
        }
    }
</script>  
<style lang="scss">
    .user {
        display: flex;
        width:100%;
        margin:8px 0;
        // margin-bottom: 20px;
    }
    .media {
        position: relative;
    }
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
    .card {
        position: relative;
    }
    .fee {
        position: absolute;
        top: 15px;
        left: 43%;
        i {
            margin-right: 10px;
        }
    }
    .icon-coin-dollar {
        color: gold;
    }
    .user img {
        background:#ddd;
    }
    .thumbnail {
        width: 50px;
        height: 50px;
        
        border-radius: 100%;
        margin: 0 10px;
    }
    .region img{
        width: 20px;
        height: 20px;
        border-radius: 100%;
        float:left;
        background:#ddd;
    }
    .name {
        margin:3px 0 5px;
        color:#333333;
    }
    .content {
        margin: 5px 15px;
        position: relative;
    }
    .media {
        img {
            height: 375px;
            width: 100vw;
            object-fit: cover;
        }
        .background-cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 375px;
            width: 100vw;
            background-image: url('/img-loading.jpg');
            background-size: cover;
            z-index: -1;
        }
    }
    .styling {
        width:100%;
        background: #fefefe;
        display: flex;
        clear:both;
        text-align: center;
        // border-bottom:2px #efefef solid;
        li {
            width:25%;
            float:left;
            // border-right:1px #eee solid;
            border-bottom:2px #fafafa solid;
            background:#fcfcfc;

            color:#999;
            font-size:16px;
            line-height:30px;
        }
        i:before {
            font-size: 20px;
            margin-right: 5px;
        }
    }
</style>