<template>
    <div class="register">
        <Back />
        <div class="register-container">
            <div class="title">
                完善資料
            </div>
            <div>
                <input type="text" placeholder="暱稱" v-model="nickname">
                <input type="text" placeholder="年龄" v-model="age">
                <select name="" id="" v-model="gender">
                    <option value="1">女</option>
                    <option value="2">男</option>
                </select>
                <input type="file" id="upload-file" ref="file" v-on:change="uploadFile($event)" hidden>
                <label v-if="type!='novel'" id="upload" for="upload-file" class="upload-file">请上传头像</label>
                
            </div>
            <button class="login-btn" type="button" @click="onSubmit">确定</button>
        </div>
    </div>
</template>
<style lang="scss">
    .register {
        height: 100vh;
        padding-top: 100px;
        background: linear-gradient(90deg, rgba(106, 58, 147, 0.7) -1.03%, rgba(232, 63, 111, 0.7) 96.07%);
        .register-container {
            max-width: 250px;
            margin: 0 auto;
        }
        .img {
                width: 100%;
                height: 150px;
                background-repeat: no-repeat;
                background-size: contain; 
        }
        input[type='password'],input[type='text'],select {
            width: 100%;
            height: 30px;
            margin-bottom: 2px;
            border: 0;
        }
        .title {
            font-size: 36px;
            color: white;
            margin-bottom: 10px;
        }
        .login-btn {
            background: #C72542;
            border-radius: 30px;
            width: 100%;
            display: block;
            border: 0;
            color: white;
            padding: 13px 0;
            margin-top: 30px;
        }
        .upload-file {
            width: 100%;
            height: 150px;
            font-size: 24px;
            line-height: 150px;
            text-align: center;
            background: white;
            border: 1px solid dotted;
            display: block;
        }
        
    }
</style>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            nickname: "",
            gender: 1,
            file: null,
            age: "",
            pic_url: "",
            country: "86"
        }
    },
    methods: {
        onSubmit() {

        },
        async uploadFile(e) {
            this.file = this.$refs.file.files[0];
            let data = {type: 1, appid:1}
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            let forElement = document.getElementById('upload')
            formData.append("data", encryptData)
            formData.append("file[]", this.file)
            this.$axios.post(process.env.BASE_URL+'my/upload_pic', formData)
                .then((res) => {
                    if(res.data.status ==1) {
                        let div = document.createElement('div')
                        div.style.backgroundImage = 'url("'+res.data.data[0].pic_url+ '"'
                        div.classList += 'img'
                        forElement.innerHTML = ""
                        forElement.appendChild(div)
                        this.pic_url = res.data.data[0].pic_url
                    }
                        // this.video_pic = res.data.data.video_pic
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        async onSubmit() {
            let encryptData = await this.encrypt({nickname : this.nickname, age: this.age, gender: this.gender, country_id: this.country}, 1)
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'user/reg_step2', formData)
                .then((res) => {
                    if(res.data.status == 1) {
                        this.$router.push('/')
                    }
                    else {
                        this.$alert(res.data.msg)
                    }
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
        }
    }
}
</script>