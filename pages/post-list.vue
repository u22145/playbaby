<template>
    <div class="post-list my-outer">
        <div class="radius-header"><back/><div class="align-center">关注</div></div>
        <div class="my-container">
            <div class="card" v-for="(item, index) in postList" :key="index" style=" border-top:10px #fafafa solid;">
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
                <client-only placeholder="Loading...">
                    <div class="media">
                        <swiper class="swiper" :options="swiperOption" ref="mySwiper" v-bind:class="`img`+item.uid">
                            <swiper-slide v-for="(url, index) in item.pic_url" :key="index">
                                <img class="hidden-img" :src="url" alt=""  @error="imageLoadError(url, $event)"  >
                            </swiper-slide>
                            <div v-show="item.pic_url.length > 1" class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    <ul class="styling" style="margin: auto">
                    <like :status="item.likes_status" :type="item.type" :likeId="item.id" :number="item.likes_num" />
                    <dislike :status="item.dislikes_status" :type="item.type" :dislikeId="item.id" :number="item.dislike_num" />    
                    <li @click="goDetail(item.id)"><i class="icon-bubbles"></i>{{item.review_num}}</li>
                    <li @click="showShare(item, $event)"><i class="icon-share2"></i><span class="share-num">{{item.share_num}}</span></li>
                    </ul>
                    </div>
                    </client-only>
                    <div class="content" @click="goDetail(item.id)">
                        {{item.content}}
                    </div>
                </div>
            <sharefriend v-if="showSharePopup" v-bind:content="tempItem" @closeShare="closeShare" />
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
import { Base64 } from 'js-base64';
import aesJs from 'aes-js';
import util from '~/assets/js/util'
export default {
    data() {
        return {
            postList: null,      
            swiperOption: {
                lazy: {
                loadPrevNext: true
                },
                spaceBetween: 30,
                pagination: {
                el: ".swiper-pagination"
                },
                notNextTick: true,
                autoplay: false
            },
            key: '128bitslength*@#',
            showSharePopup: false,
            page: 1,
            loading: false,
            dynamicSwiperName: "swiper"
        }
    },
    mounted() {
        this.getPost()
    },
    methods: {
        async getPost() {
            let abc = 0;
            if (this.$store.getters.getIsLogin) {
                abc = 1;
            }  //判斷是否登入  帶登入資訊
                let encryptData = await this.encrypt({"type":0 ,"page_size":20,"page_no":this.page,isEncrypted: 1,"chkUser":0}, abc)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'blog/home_blog', formData)
                    .then((res) => {
                        console.log("我看看",res.data.data)
                        this.postList= res.data.data
                        if (typeof res.data.data == 'undefined' || res.data.data.length == 0) {
                            // the array is defined and has at least one element
                            this.searchEnd = true
                        }
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
                // const loader = util.loadImageWithWorker
                let div = document.createElement("div")
                div.classList += " buffer-img"
                div.style.backgroundImage = "url('"+this.decryptImageFromArrayBuffer(imgArrayBuffer)+"')"
                e.target.parentElement.append(div)
                console.log(e.target.parentElement.parentElement.parentElement)
                let index = e.target.parentElement.parentElement.parentElement.getAttribute("swiper-index")
                // this.dynamicSwiperName = "swiper"+index
                // console.log(this.mySwiper.$swiper)
                // this.mySwiper.reInit()
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
        }
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
        .buffer-img {
            height: 375px;
            width: 100vw;
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: no-repeat;
        }
        img {
            height: 0;
            width: 0;
        }
        .cover-img {
            background-image: url(/img-loading.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            top: 21px;
            left: 0;
            width: 100%;
            height: 375px;
            background-position: 50% 50%;
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