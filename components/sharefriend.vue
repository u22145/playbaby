<template>
    <div class="share-with-friend">
        <div @click="handleCloseShare"><div class="arrow left"></div> 分享</div>
        <div class="share-card">
                <div><img class="avatar" :src="content.avatar" alt="">{{content.nickname}}</div>
                <div class="content">{{content.content}}</div>
                <img  v-for="(url, index) in content.pic_url" :key="index" :src="url" alt=""  @error="imageLoadError(url, $event)"  >
                <div id="img-container">

                </div>
                <div class="text">
                  <div>掃描二維碼下載App</div>
                  <p>如微信等APP掃碼無法打開 請用瀏覽器訪問https://playbaby.net,並輸入邀請碼</p>
                </div>
                <div class="qrcode-container">
                    <div class="title">邀請碼: {{inviteCode}}</div>
                    <div class="qr-code"><qrcode-vue :value="qrcodeUrl" :size="size" level="H"></qrcode-vue></div>
                    
                </div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
import { Base64 } from 'js-base64';
import aesJs from 'aes-js';
import QrcodeVue from 'qrcode.vue'
export default {
    props: ['content'],
    data() {
        return {
            qrcodeUrl: "",
            size: 100,
            key: '128bitslength*@#',
            inviteCode: "用戶未登錄"
        }
    },
    mounted() {
        if(this.$store.getters.getUid != '') {
            this.inviteCode = this.$store.getters.getUid
        } 
        // let cloneNode = document.getElementsByClassName("img"+this.content.uid)[0].children[0].children[0].children[1]
        // console.log(cloneNode)
        // if(document.querySelectorAll(".img"+this.content.uid+ " .buffer-img").length > 0 ) {
        //      let cloneNode = document.querySelectorAll(".img"+this.content.uid+ " .buffer-img")[0].cloneNode(true)
        //     document.querySelectorAll("#clone-img" + this.content.uid)[0].appendChild(cloneNode)
        // }
        this.getEarnRank()
        // console.log(document.getElementById("clone-img" + this.content.uid))
    },
    components: {
      QrcodeVue,
    },
    methods: {
        handleCloseShare() {
            this.$emit('closeShare')
        },
        async getEarnRank(type,id) {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'earn/rank', formData)
                .then((res) => {
                    this.qrcodeUrl = res.data.data.share_url
                    // console.log("賴可",res.data)
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        async triggerShare() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'blog/share', formData)
                .then((res) => {
                    
                    // console.log("賴可",res.data)
                })
                .catch((err) => {
                    console.log("get encrypt error")
                }) 
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
        imageLoadError(url, e) {
            // 
            this.readFileAsArrayBuffer(url).then((imgArrayBuffer) => {
                // const loader = util.loadImageWithWorker
                let div = document.createElement("div")
                div.classList += " buffer-img"
                div.style.backgroundImage = "url('"+this.decryptImageFromArrayBuffer(imgArrayBuffer)+"')"
                document.getElementById("img-container").appendChild(div)
                // this.dynamicSwiperName = "swiper"+index
                // console.log(this.mySwiper.$swiper)
                // this.mySwiper.reInit()
            });

        },
    }
}
</script>
<style lang="scss">
    .share-with-friend {
        #img-container > div{
            display: inline-block;
            width: 25%;
            height: 100px;
            background-repeat: no-repeat;
            background-size: contain;
        }
        div[id^="clone-"] {
            .swiper-wrapper {
                height: auto !important;
                max-height: 300px !important;
                div {
                    width: 20% !important;
                    margin-right: 10px;
                }
            }
        }
        .flex {
            display: flex;
        }
        .text {
            margin: 20px 0;
        }
        .qrcode-container {
            overflow: hidden;
            .title {
                float: left;
            }
            .qr-code {
                float: right;
            }
        }
        position: fixed;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        padding: 15px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        .share-card {
            background: white;
            margin-top: 15px;
            padding: 15px;
        }
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            display: inline-block;
            vertical-align: bottom;
            margin-right: 10px;
        }
        .content {
            margin: 15px 0;
        }
        .small-images {
            .buffer-img {
                width: auto;
                height: 200px;
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
    }
</style>