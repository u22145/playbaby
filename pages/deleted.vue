<template>
  <div style="margin-top:50px">
      <!-- {{inhotTopic.avatar}} -->
        <div class="card" v-if="inhotTopic != null">
            <div class="user" @click="handleCardClick(inhotTopic.uid)">
                <img class="thumbnail" :src="String(inhotTopic.avatar)" alt="">
                <div>
                    <div class="name">{{inhotTopic.nickname}}</div>
                    <div>
                        <Tag :content="inhotTopic.age" :color="`red`" :type="inhotTopic.gender" />
                        <span class="region"><img :src="inhotTopic.country_flag" alt=""></span>
                    </div>
                </div>
            </div>
            <div class="media">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide  v-for="(url, index) in inhotTopic.pic_url" :key="index"><img :src="url" alt=""  @error="imageLoadError(url, $event)" ></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>

                <ul class="styling" style="margin: auto">
                <like :status="inhotTopic.likes_status" :type="inhotTopic.type" :likeId="inhotTopic.id" :number="inhotTopic.likes_num" />
                <dislike :status="inhotTopic.dislikes_status" :type="inhotTopic.type" :dislikeId="inhotTopic.id" :number="inhotTopic.dislike_num" />   
                 <li>轉發{{inhotTopic.share_num}}</li>
                 <li>評論{{inhotTopic.review_num}}</li>
                </ul>
                <div class="content" @click="goDetail(inhotTopic.id)">
                    {{inhotTopic.content}}
                </div>
            </div>
            <div class="social">

            </div>
        </div>
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
          }
      },
      cid:this.$route.params.id,
      inhotTopic: null,
      key: '128bitslength*@#'
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
    this.getHotList();
    console.log("有喔！")
  },
  methods: {
    async likeButton(type,id) {
        // this.$alert("哈囉");
        console.log()
        let encryptData = await this.encrypt({"type":type ,"id":id})
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/like', formData)
            .then((res) => {
                console.log("賴可",res.data)
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async dislikeButton(type,id) {
        let encryptData = await this.encrypt({"type":type ,"id":id})
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/dislike', formData)
            .then((res) => {
                console.log("抵斯賴可",res.data)
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async getHotList() {
        let encryptData = await this.encrypt({"id":  this.$route.params.id})
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/detail', formData)
            .then((res) => {
                console.log("可能187",res.data.data)
                this.inhotTopic = res.data.data;
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    handleCardClick(targetId) {
        this.$router.push({ path: `/my/${targetId}` })

    },
    imageLoadError(url, e) {
        // let cx = document.createElement("canvas");
        // e.target.parentElement.append(cx);
        // console.log(this.$loadImage)
        this.readFileAsArrayBuffer(url).then((imgArrayBuffer) => {
            const loader = util.loadImageWithWorker
            e.target.setAttribute("src", this.decryptImageFromArrayBuffer(imgArrayBuffer));
        });

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

     
  }
}
</script>  
<style lang="scss">
    .user {
        display: flex;
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
    .media img {
        width:100%;
        min-height:375px;
    }
    .styling {
        width:100%;
        background: #fefefe;
        display: flex;
        clear:both;
        text-align: center;
        li {
            width:25%;
            float:left;
            border-right:1px #ddd solid;
            color:#666;
            font-size:8px;
        }
    }
</style>