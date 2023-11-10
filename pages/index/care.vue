<template>
    <div>
        <div v-for="(hotTopic, index) in hotTopics" :key="index">
        <div class="card" v-for="(item, index) in hotTopic" :key="index" style=" border-top:10px #fafafa solid;">
            <!-- <popup /> -->
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
                    <!-- <img :src="item.pic_url[0]" alt=""> -->
                    <swiper class="swiper" :options="swiperOption" v-bind:class="`img`+item.uid">
                        <div class="cover-img"></div>
                        <swiper-slide v-if="item.pic_url.length > 1" v-for="(url, index) in item.pic_url" :key="index">
                            <div class="background-cover"></div>
                            <img :src="url" alt=""   @error="imageLoadError(url, $event)" >
                        </swiper-slide>

                        <img v-if="item.pic_url.length == 1" :src="item.pic_url[0]" alt=""  @error="imageLoadError(item.pic_url[0], $event)">
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                    <!-- <swiper  ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(item, index) in papaData" :key="index">
                        </swiper-slide>
                    </swiper> -->


                <ul class="styling" style="margin: auto">
                    <like :status="item.likes_status" :type="item.type" :likeId="item.id" :number="item.likes_num" />
                    <dislike :status="item.dislikes_status" :type="item.type" :dislikeId="item.id" :number="item.dislike_num" />   
                 <!-- <li @click="likeButton(item.type, item.id)"> <i class="icon-heart"></i> {{item.likes_num}}</li>
                 <li @click="dislikeButton(item.type, item.id)"><i class="icon-sad2"></i> {{item.dislike_num}}</li> -->
                 <li @click="goDetail(item.id)"><i class="icon-bubbles"></i>{{item.review_num}}</li>
                 <li @click="showShare(item)"><i class="icon-share2"></i>{{item.share_num}}</li>
                </ul>
                </div>
                <div class="content" @click="goDetail(item.id)">
                    <!-- {{item.pic_url[0]}} -->
                    {{item.content}}
                </div>
            <div class="social">

                </div>
            </div>
        </div>
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
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      swiperOption: {
          autoHeight: true,
        calculateHeight:true,
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: false
      },
      hotTopics: [],
      key: '128bitslength*@#',
      showSharePopup: false,
      page: 1,
      loading: false,
      searchEnd: false
    }
  },
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
  mounted(){
    this.getHotList()
    // always show header footer in recommand page
    this.$store.commit('setIsHeaderShow', true)
    this.$store.commit('setIsFooterShow', true)
    if (process.browser){
        window.addEventListener("scroll", this.checkScroll)
    }
  },
  methods: {    
    checkScroll() {
            window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.page = this.page + 1
                this.getHotList()
            }
        }.bind(this);
    },
    async followButton(type,id) {
        let encryptData = await this.encrypt({"type":type ,"op_uid":id ,"room_id":''},1)
        let formData = new FormData();
        formData.append("data", encryptData);
        this.$axios.post(process.env.BASE_URL+'my/follow', formData)
            .then((res) => {
                console.log("發漏",res.data)
                this.getHotList();
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async likeButton(type,id) {
        let encryptData = await this.encrypt({"type":1 ,"id":id},1)
        let formData = new FormData();
        formData.append("data", encryptData);
        this.$axios.post(process.env.BASE_URL+'blog/like', formData)
            .then((res) => {
                console.log("賴可",res.data,"ID",id,"type",1)
                // this.hotTopics ={},
                // this.getHotList();
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async dislikeButton(type,id) {
        let encryptData = await this.encrypt({"type":1 ,"id":id},1)
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/dislike', formData)
            .then((res) => {
                console.log("抵斯賴可",res.data)
                // this.hotTopics ={},
                // this.getHotList();
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async getHotList() {
        if(!this.searchEnd) {
            let encryptData = await this.encrypt({"type":1 ,"page_size":20,"page_no":this.page,isEncrypted: 1}, 1)
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'blog/index', formData)
                .then((res) => {
                    console.log("借我看看",res)
                    this.hotTopics.push(res.data.data)
                    if (typeof res.data.data == 'undefined' || res.data.data.length == 0) {
                        // the array is defined and has at least one element
                        this.searchEnd = true
                    }
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
        }

    },
    handleCardClick(targetId) {
        this.$router.push({ path: `/my/${targetId}` })
    },
    imageLoadError(url, e) {
        // 
        this.readFileAsArrayBuffer(url).then((imgArrayBuffer) => {
            // const loader = util.loadImageWithWorker
            e.target.classList += 'swiper-lazy'
            e.target.setAttribute("src", this.decryptImageFromArrayBuffer(imgArrayBuffer))
            let index = e.target.parentElement.parentElement.parentElement.getAttribute("swiper-index")
            // e.target.setAttribute("src", this.decryptImageFromArrayBuffer(imgArrayBuffer));
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
    showShare(item) {
        this.tempItem = item
        this.showSharePopup = true
        document.body.style.overflow = "hidden"
    },
    closeShare() {
        this.showSharePopup = false
        document.body.style.overflow = "visible"
    },
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.checkScroll);
  },
    }
</script>  
<style lang="scss">
    .user {
        display: flex;
        width:100%;
        margin:8px 0;
        // margin-bottom: 20px;
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