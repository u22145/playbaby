<template>
        <!-- <div class="radius-header"><back style="float:left;display:inline"/><div class="align-center">{{title}}</div></div> -->
        <div class="my-container align-center post-page">
            <div class="title">發動態</div>
            <input type="text" placeholder="标题" v-if="type=='novel'" v-model="novelTitle">
            <input type="file" id="upload-file" ref="file" v-on:change="uploadFile($event)" hidden>
            <label v-if="type!='novel'" for="upload-file" class="upload-file">+</label>
            <textarea name="" id="" cols="30" rows="10" :placeholder="placeholder" v-model="content" style="padding:10px"></textarea>
             <div v-if="type!='novel'" id="cover-img-upload"></div>
             <div>
                 <div>Baby幣收費</div>
                 <input class="charge" type="number" placeholder="收費" v-model="fee">
             </div>
            <div class="btn" :class="[disabledBtn ? 'disabled': '']" @click="submitPost">发布</div>
        </div>
</template>
<script>

import '@/utils/mixins';
import aesJs from 'aes-js';
import * as qiniu from 'qiniu-js'
export default {
    data() {
        return {
            type: this.$route.params.id,
            title: "发布文章",
            key: '128bitslength*@#',
            content: "",
            pic: "",
            video_id: "",
            blog_id: "",
            video_pic: "",
            placeholder: "记录这一刻,晒给懂你的人",
            fee: 0,
            disabledBtn: true,
            key: '128bitslength*@#',
            encryptFile: null,
            qiniuName: "",
            qiniuToken: ""
        }
    },
    methods: {
        async submitPost() {
            if(this.disabledBtn) {
                this.$alert("档案上传还未完成 请耐心等候")
                return false
            }
            if((this.content == "") || (this.uploadType == 0 && this.title =='')) {
                this.$alert("请填写内容或标题")
                return false
            }
            this.disabledBtn = true
            let data = {
                content: this.content,
                pic: this.qiniuName,
                video_id: this.video_id,
                video_pic: this.video_pic,
                fee: this.fee,
                appid: 1
            }
            

            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'blog/write_new', formData)
                .then((res) => {
                        if(res.data.status ==1) {
                            this.$alert("上传成功 请静待管理员审核")
                            .then(() => {
                                this.$router.push('/')
                            })
                        }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        async uploadFile(e) {
            console.log(e.target)
            var reader = new FileReader();
            const key = aesJs.utils.utf8.toBytes(this.key);
            const aesEcb = new aesJs.ModeOfOperation.ecb(key);
            reader.readAsArrayBuffer( this.$refs.file.files[0])

            reader.onload = async function() {
                let img = reader.result
                // var textBytes = aesJs.utils.utf8.toBytes(img);
                let newImg = new Uint8Array(img);
                if(newImg.length % 16 > 0 ) {
                    let padding = 16-(newImg.length % 16);
                    let newEncryptedBytes = new Uint8Array(newImg.length+padding)
                    for(var i=0; i<newImg.length ; i++) {
                        newEncryptedBytes[i] = newImg[i]
                    }
                    var encryptedBytes = aesEcb.encrypt(newEncryptedBytes);
                    this.file = new File([encryptedBytes], this.$refs.file.files[0].name, {type:'image/png'});
                    this.getQiniuToken()
                    const observable = qiniu.upload(this.file, this.$refs.file.files[0].name.replace(/\.[^/.]+$/, ""), this.qiniuToken)
                    let self = this
                    const observer = {
                    next(res){
                        // ...
                    },
                    error(err){
                        self.$alert('檔案已存在')
                    },
                    async complete(res){
                        console.log(res.key)
                        if(self.qiniuName != '') {
                            self.qiniuName = self.qiniuName + "|" + res.key     
                        }
                        else {
                            self.qiniuName = res.key
                        }
                        let data = {type: 5, appid:1}
                        let encryptData = await self.encrypt(data)
                        let formData = new FormData();
                        formData.append("data", encryptData)
                        formData.append("file[]", self.$refs.file.files[0])
                        this.$axios.post(process.env.BASE_URL+'my/upload_pic', formData)
                            .then((res) => {
                                    if(res.data.status == 1) {
                                        if(res.data.data[0].pic_url) {
                                            let img = document.createElement('img')
                                            img.classList+= 'cover'
                                            img.src = res.data.data[0].pic_url.toLowerCase()
                                            e.target.parentNode.insertBefore(img, e.target)
                                            let picName = res.data.data[0].pic_url.replace(/\S+blog_pic\//, "")
                                            self.pic = picName
                                            
                                        }
                                        if(res.data.data[0].video_id) {
                                            self.video_id = res.data.data[0].video_id
                                        }
                                        self.disabledBtn = false
                                    }
                                    
                                    // this.video_pic = res.data.data.video_pic
                                })
                                .catch((err) => {
                                    console.log("get encrypt error")
                                })
                    }
                    }
                    const subscription = observable.subscribe(observer)
                }
            }.bind(this);
        },
        async getQiniuToken() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'my/get_qiniu_token', formData)
                .then((res) => {
                        this.qiniuToken = res.data.data.token
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
        }
    },
    mounted() {
        this.getQiniuToken()
        // if(this.type == "article") {
        //     this.title= "发布文章"
        //     this.uploadType =5
        //     this.apiSlug = 'blog/write_new'
        //     this.ffmpegType = 0
        // }
        // if(this.type == "video") {  
        //     this.title= "发短片"
        //     this.uploadType = 6
        //     this.apiSlug ='papa/upload_new'
        //     this.ffmpegType = 1
        //     this.placeholder = "視頻標題"
        // }
        // if(this.type == 'novel') {
        //     this.title= "发小说"
        //     this.uploadType = 0
        //     this.apiSlug = 'blog/write_new'
        // }
    }
}
</script>
<style lang="scss">
    .post-page {
        padding: 20px 20px 80px 20px;
        .cover {
            display: inline-block;
            width: 60px;
            height: 60px;
            object-fit: cover;
            margin-right: 5px;
            border: 1px solid #ccc;
        }
        .upload-file {
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 24px;
            display: block;
            border: 3px  dotted #ccc;
        }
        textarea {
            border: 0;
            width: 100%;
            background:#efefef;
            border-radius: 10px;
            margin-top: 20px;
            height: 120px;
        }
        .charge {
            width: 100%;
            margin: 10px 0;
            border-radius: 5px;
            border-color: #ddd;
            border-width: 1px;
            padding: 10px;
        }
        .btn.disabled {
            background: #ccc;
            border-radius: 30px;
            color: black;
        }
    }
    #cover-img-upload {
        height: 50px;
        text-align: left;
        margin-bottom: 20px;
        .cover-image-upload {
            max-height: 100%;
            width: auto;
        }
    }
        
</style>