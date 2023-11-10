<template>
    <div class="edit-info my-outer">
        <div class="radius-header"><back/><div class="align-center">更换头像</div></div>
        <div class="my-container">
            <div class="flex-container">
                <div class="avatar align-center">
                    <div class="title">目前头像</div>
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="change align-center">
                    <div class="title">更换头像</div>
                    <input type="file" id="upload-photo" ref="file" v-on:change="changeImg($event)" hidden>
                    <label class="upload-label" for="upload-photo">+</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
import * as qiniu from 'qiniu-js'
export default {
    data() {
        return {
            userInfo: {
                avatar: ""
            },
            token: ""
        }
    },
    mounted() {
        this.getUser()
        this.getQuinuToken()
    },
    methods: {
        async getUser() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'user/get_info', formData)
                .then((res) => {
                    this.userInfo = res.data.data
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        async changeImg(e) {
            let self = this
            const observable = qiniu.upload(this.$refs.file, this.$refs.file.files[0].name, this.token)
                const observer = {
                    next(res){
                        // ...
                    },
                    error(err){
                        self.$alert('檔案已存在')
                    },
                    async complete(res) {
                            self.file = self.$refs.file.files[0];
                            let data = {type: 1, appid:1}
                            let encryptData = await self.encrypt(data)
                            let formData = new FormData();
                            let forElement = document.getElementById('upload')
                            formData.append("data", encryptData)
                            formData.append("file[]", self.file)
                            this.$axios.post(process.env.BASE_URL+'my/upload_pic', formData)
                                .then((res) => {
                                    if(res.data.status ==1) {

                                    }
                                        // this.video_pic = res.data.data.video_pic
                                    })
                                    .catch((err) => {
                                        console.log("get encrypt error")
                                })
                    }}
                    const subscription = observable.subscribe(observer)
        },
        async getQuinuToken() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'my/get_qiniu_token', formData)
                .then((res) => {
                        this.token = res.data.data.token
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
        }
    }
}
</script>
<style lang="scss">
    .edit-info {
        .my-container {
            padding: 10px;
            .avatar img{
                width: 120px;
                height: 120px;
                border-radius: 100%;
            }
            .flex-container {
                display: flex;
                justify-content: space-around;
            }
            .title {
                margin-bottom: 15px;
            }
            .upload-label {
                width: 120px;
                height: 120px;
                border: 3px dotted #ccc;
                display: block;
                text-align: center;
                font-size: 36px;
                font-weight: bold;
                line-height: 120px;
                border-radius: 100%;
            }
        }
    }
</style>