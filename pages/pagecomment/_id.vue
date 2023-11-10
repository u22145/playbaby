<template>
  <div style="margin-top:110px;background:#fff">
          <ReviewHeader/>
                    <div class="user">
                        <img class="thumbnail" :src="String(topreview.avatar) == '' ? topreview.gender+'.png' : topreview.avatar" alt=""  @click="handleCardClick(topreview.uid)">
                        <div style="width:70%">
                            <div class="name"> 
                                <span style="float:left;padding-right:5px;">{{topreview.nickname}} </span> 
                                <Tag :content="topreview.age" :color="`red`" :type="topreview.gender" />
                                <span class="region"><img :src="topreview.country_flag" alt=""></span>
                            </div>
                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0">
                                {{topreview.review}} 
                            </div>
                        </div>
             
                    </div>



        <div class="card inner">
            <div class="social" style="padding-bottom:60px">
                <div class="comnent" v-for="(item,index) in replys" :key="index" style="border-left: 10px #B90F73 solid;background:#f9f0f0">
                    <div class="user">
                        <img class="thumbnail" :src="String(item.avatar) == '' ? item.gender+'.png' : item.avatar" alt=""  @click="handleCardClick(item.uid)">
                        <div style="width:60%" @click="goDetail2(item.rev_id)">
                            <div class="name"> 
                                <span style="float:left;padding-right:5px;">{{item.nickname}} </span> 
                                <Tag :content="item.age" :color="`red`" :type="item.gender" />
                                <span class="region"><img :src="item.country_flag" alt=""></span>
                            </div>
                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0">
                                {{item.reply}} 
                            </div>
                        </div>
                        <div style="width:20%;line-height:40px;text-align:center;color:#999" @click="likeButton(3, item.rev_id)">
                            讚  {{item.likes_num}}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
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
      topreview:[],
      replys:[],
      inhotReview:null,
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
    created() {
    this.topreview = this.$store.state.setReview;

    },
  mounted(){
    this.$store.commit("setIsFooterShow", false);
    this.getReply();
    console.log(this.$route.params.id);
    // this.$store.commit("setPopup", false)
  },
  destroyed() {
      this.$store.commit("setIsFooterShow", true);
      this.$store.commit("setReview", {});
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
                if(type == 1) {
                console.log("動態")
                this.getHotList();
                } else if (type == 3) {
                console.log("評論")
                this.getReview();    
                }
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
                this.getHotList();
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async getReply() {
        let encryptData = await this.encrypt({"tid":50965,"rev_id": this.$route.params.id,"page_size": 10,"page_no": 1},1)
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/reply', formData)
            .then((res) => {
                console.log("不可能5566",res.data)
                this.replys = res.data.data;
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
    goDetail(num) {
        // this.$router.push({name:'pageinfo',params: {id: num}})
        this.$router.push({ path: `/pageinfo/${num}` })
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
    goDetail2(num) {
        this.$router.push({ path: `/pagecomment/${num}` })
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
        width:100%;
    }
    .content {
        margin: 5px 15px;
    }
    .inner .media img {
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
    .comnent {
        width:100%;
        height:auto;
        border:#efefef 1px solid;
    }
</style>