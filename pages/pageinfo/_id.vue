<template>
  <div class="pageInfo" style="margin-top:100px;background:#fff">
          <CommonHeader/>
        <div class="card inner" v-if="inhotTopic != null" >
            <div class="user">
                <img class="thumbnail" :src="String(inhotTopic.avatar) == '' ? inhotTopic.gender+'.png' : inhotTopic.avatar"  alt="" @click="handleCardClick(inhotTopic.uid)">
                <div>
                    <div class="name">{{inhotTopic.nickname}}</div>
                    <div>
                        <Tag :content="inhotTopic.age" :color="`red`" :type="inhotTopic.gender" />
                        <span class="region"><img :src="inhotTopic.country_flag" alt=""></span>
                    </div>
                </div>
            </div>
            <div class="media" style="padding-bottom:30px">
                <swiper class="swiper" :options="swiperOption" v-bind:class="[inhotTopic.pic_url.length > 0 ? 'hasImage': '' ]">
                    <swiper-slide  v-for="(url, index) in inhotTopic.pic_url" :key="index" data-manual-lazy><img :src="url" alt=""  @error="imageLoadError(url, $event)" ></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>


                <ul class="styling" style="margin: auto">
                    <like :status="inhotTopic.likes_status" :type="inhotTopic.type" :likeId="inhotTopic.id" :number="inhotTopic.likes_num" />
                    <dislike :status="inhotTopic.dislikes_status" :type="inhotTopic.type" :dislikeId="inhotTopic.id" :number="inhotTopic.dislike_num" />   
                 <li @click="goDetail(inhotTopic.id)"><i class="icon-bubbles"></i>{{inhotTopic.review_num}}</li>
                 <li @click="showShare(inhotTopic, $event)"><i class="icon-share2"></i><span>{{inhotTopic.share_num}}</span></li>
                </ul>
                <div class="content">
                    {{inhotTopic.content}}
                </div>
            </div>
            <div class="social" style="padding-bottom:60px">
                <div v-if="$store.getters.getIsLogin" class="comnent" v-for="(item,index) in inhotReview" :key="index">
                    <div class="user">
                       <img class="thumbnail" :src="String(item.avatar) == '' ? item.gender+'.png' : item.avatar" alt=""  @click="handleCardClick(item.uid)">
                        <div style="width:60%" @click="goDetail2(item.rev_id,$route.params.id,item)">
                            <div class="name"> 
                                <span style="float:left;padding-right:5px;">{{item.nickname}} </span> 
                                <Tag :content="item.age" :color="`red`" :type="item.gender" />
                                <span class="region"><img :src="item.country_flag" alt=""></span>
                            </div>
                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0">
                                {{item.review}} 
                            </div>
                        </div>
                        <div style="width:20%;line-height:40px;text-align:center;color:#999" @click="likeButton(3, item.rev_id, $event)">
                            <i class="icon-like2"></i>  {{item.likes_num}}
                        </div>
                    </div>
                </div>

                <div v-if="!$store.getters.getIsLogin" class="comnent" v-for="(item,index) in inhotTopic.review" :key="index">
                    <div class="user">
                        <img class="thumbnail" :src="String(item.avatar) == '' ? item.gender+'.png' : item.avatar" alt=""  @click="handleCardClick(item.uid)">
                        <div style="width:60%" >
                            <div class="name"> 
                                <span style="float:left;padding-right:5px;">{{item.nickname}} </span> 
                                <Tag :content="item.age" :color="`red`" :type="item.gender" />
                                <span class="region"><img :src="item.country_flag" alt=""></span>
                            </div>
                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0" >
                                {{item.review}}
                            </div>
                        </div>
                        <div style="width:20%;line-height:40px;text-align:center;color:#999" >
                            <i class="icon-like2"></i>  {{item.likes_num}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <sharefriend v-if="showSharePopup" v-bind:content="inhotTopic" @closeShare="closeShare" />
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
      inhotReview:null,
      key: '128bitslength*@#',
      showSharePopup: false
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
    this.$store.commit("setIsFooterShow", false);
      if (this.$store.getters.getIsLogin) {
    this.getReview();
      };
    this.getHotList();
    // this.$store.commit("setPopup", false)
  },
  destroyed() {
      this.$store.commit("setIsFooterShow", true);
  },
  methods: {
    async likeButton(type,id, e) {
        // this.$alert("哈囉");
        console.log(e.target)
        e.target.classList.toggle("purple")
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
    async getHotList() {
        let encryptData = await this.encrypt({"id":  this.$route.params.id},0)
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
    async getReview() {
        let encryptData = await this.encrypt({ "module":1 , "tid":  this.$route.params.id,"page_size": 100,"page_no":1},1)
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/review', formData)
            .then((res) => {
                console.log("可能287",res.data)
                this.inhotReview = res.data.data;
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
    goDetail2(num,num2,num3) {
        let aaa = num +'|'+num2;
        this.$store.commit("setReview", num3);
        this.$router.push({ path: `/pagecomment/${aaa}` })
    },
    showShare(item, e) {
        let currentShare = parseInt(e.target.parentElement.children[1].innerText)
        e.target.parentElement.children[1].innerText = currentShare + 1
        this.tempItem = item
        this.showSharePopup = true
        document.body.style.overflow = "hidden"
    },
    closeShare() {
        this.showSharePopup = false
        document.body.style.overflow = "visible"
    }
  }
}
</script>  
<style lang="scss">
    .pageInfo .hasImage {
        min-height: 350px;
    }
    .user {
        display: flex;
              margin:8px 0;
        // margin-bottom: 20px;
        .icon-like2{
            &:before {
                color: black;
            }
            &.purple::before {
                color: purple;
            }
        }
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
        height:auto;
        // min-height:375px;
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