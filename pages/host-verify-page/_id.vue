<template>
    <div>
        <div class="guild-verify my-outer" v-if="type=='guild'">
            <div class="radius-header"><back/><div class="align-center">公会主播认证</div></div>
            <div class="my-container">
                <input type="text" placeholder="请填写公会ID" v-model="guild">
                <div class="btn" @click="submitGuild">送出</div>
                <p>1.如已有明確需加入的公會,請直接填寫公會ID,申請加入公會</p>
                <p>2.如是個人開播,無明確公會,可退出當前頁,前往個人播主申請頁面,沒有找到您搜尋的公會,請與公會長核實後重新輸入</p>
            </div>
        </div>
        <div class="verify-normal my-outer" v-if="type=='normal'">
            <div class="radius-header"><back/><div class="align-center">主播認證</div></div>
            <div class="my-container">
                <div>
                    <input type="file" id="upload-self" hidden v-on:change="uploadFile(4, $event)">
                    <label for="upload-self">
                        <div class="plus align-center">+</div>
                        <div class="align-center">上传自拍</div>
                    </label>
                </div>
                <div>
                    <input type="file" id="upload-cover-photo" hidden v-on:change="uploadFile(7, $event)">
                    <label for="upload-cover-photo">
                        <div class="plus align-center">+</div>
                        <div class="align-center">上传背景</div>
                    </label>
                </div>
                <div>
                    <input type="file" id="upload-video" hidden v-on:change="uploadFile(9, $event)">
                    <label for="upload-video">
                        <div class="plus align-center">+</div>
                        <div class="align-center">上传影片</div>
                    </label>
                </div>

                <div class="btn" @click="submitVerify">送出</div>
                </div>
        </div>

    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            take_photo: "",
            pic_url: "",
            video_url: "",
            type: "guild",
            soc_id: null,
            guild: ""
        }
    },
    created() {
        if(this.$route.params.id == 'normal') {
            this.type = 'normal'
        }
    },
    methods: {
        async uploadFile(type, e) {
            let file = e.target.files[0]
            let id = e.target.getAttribute("id")
            let forElement = document.querySelector("label[for='" +id +"']")
            forElement.innerHTML = "<i class='icon-spinner2'></i>"
            let data = {type: type, appid:1}
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            formData.append("file[]", file)
            this.$axios.post(process.env.BASE_URL+'my/upload_pic', formData)
                .then((res) => {
                        if(res.data.status == 1 ) {
                            if(type == 4 || type == 7) {
                                let div = document.createElement('div')
                                div.style.backgroundImage = 'url("'+res.data.data[0].pic_url+ '"'
                                div.classList += 'img'
                                forElement.innerHTML = ""
                                forElement.appendChild(div)
                                if(type == 4) {
                                    this.pic_url = res.data.data.pic_url
                                }
                                if(type == 7) {
                                    this.take_photo = res.data.data.pic_url
                                }
                            }
                            if(type == 9) {
                                this.video_url = res.data.data.video_url
                                forElement.innerHTML = "上传成功!"
                            }
                        }
                        // this.video_pic = res.data.data.video_pic
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        async submitVerify() {
            if(this.take_photo == '' || this.pic_url=='' || this.video_url == '') {
                this.$alert('您还没有上传资料喔')
            }
            else {
                let data = {
                    take_photo: this.take_photo, 
                    pic_url:this.pic_url, 
                    video_url: this.video_url,
                }
                if(type == 'guild') {
                    data.soc_id = this.guild
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'my/cert_goddess', formData)
                    .then((res) => {
                        if(res.data.status == 1) {
                            this.$alert('提交成功 请等候审核')
                            .then(() => {
                                this.$router.push('/')
                            })
                        }
                        else {
                            this.$alert('提交失败请重新提交一次')
                        }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
                }
        },
        async submitGuild() {
            let encryptData = await this.encrypt({id: this.guild})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'my/get_soc_info', formData)
                .then((res) => {
                    if(res.data.status == 1) {
                        this.guild = res.data.data.id
                        this.type = 'normal'
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        }
    }
}
</script>
<style lang="scss">
    .guild-verify {
        .my-container {
            padding: 10px;
            input {
                display: block;
                width: 300px;
                height: 30px;
                padding: 10px;
                margin: 10px auto;
            }
        }
        .btn {
            display: block;
            margin: 0 auto;
        }
    }
    .verify-normal {
        .my-container {
            padding-top: 20px;
        }
        label {
            width: 250px;
            height: 100px;
            border: 1px dotted #ccc;
            display: block;
            margin: 20px auto;
            overflow: hidden;
            position: relative;
            div.img {
                width: 100%;
                height: 100px;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
        .icon-spinner2 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: spin 1.4s infinite linear;
        }
        .plus {
            font-size: 36px;
            font-weight: bold;
        }
        .btn {
            margin: 0 auto;
            display: block;
        }

    }
</style>