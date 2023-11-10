<template>
    <div class="register">
        <Back />
        <div class="register-container">
            <div class="title">
                快速注册
            </div>
            <div>
                <select v-model="area_code" style="border-radius: 30px;margin-bottom: 10px;height: 40px; background: rgba(255, 255, 255, 0.8);">
                    <option v-for="item in selectOption" :value="item.area_code" :key="item.id">{{"+"+item.area_code + " " + item.zh}}</option>
                </select>
                <input type="text" placeholder="手機號碼" v-model="mobile"  style="border-radius: 30px;margin-bottom: 10px;height: 40px; background: rgba(255, 255, 255, 0.8);">
                <div class="verify-code-container">
                    <input type="text" placeholder="请填入验证码" v-model="verifyCode"  style="border-radius: 30px;margin-bottom: 10px;height: 40px; background: rgba(255, 255, 255, 0.8);">
                    <div class="send-verify-code" @click="sendVerifyCode" style="line-height:36px;padding:0">获取验证码</div>
                </div>
            </div>
            <div>
                <input  type="password" placeholder="密碼" v-model="password"  style="border-radius: 30px;margin-bottom: 10px;height: 40px; background: rgba(255, 255, 255, 0.8);">
                <input type="text" placeholder="请输入邀请码(非必填)" v-model="inviteCode"  style="border-radius: 30px;margin-bottom: 10px;height: 40px; background: rgba(255, 255, 255, 0.8);">
            </div>
            <button class="login-btn" type="button" @click="onSubmit">注册</button>
        </div>
    </div>
</template>
<style lang="scss">
    .register {
        height: 100vh;
        padding-top: 60px;
        background: linear-gradient(90deg, rgba(106, 58, 147, 0.7) -1.03%, rgba(232, 63, 111, 0.7) 96.07%);
        .register-container {
            max-width: 300px;
            margin: 0 auto;
        }
        input[type='password'],input[type='text'],select {
            width: 100%;
            height: 30px;
            margin-bottom: 2px;
            border: 0;
        }
        .remember-me {
            font-size: 12px;
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
        .forget-password-link  {
            font-size: 12px;
            float: right;
        }
        .register-link {
            font-size: 12px;
            float: left;
        }
        .verify-code-container {
            position: relative;
            .send-verify-code {
                position: absolute;
                right: 5px;
                top: 5px;
                color: purple;
                font-size: 12px;
            }   
        }
    }
</style>
<script>
    
    import '@/utils/mixins';
    export default {
        data() {
            return {
                mobile: "",
                password: "",
                area_code: "",
                selectOption: null,
                verifyCode: "",
                inviteCode: ""
            }
        },
        methods: {
            async sendVerifyCode() {
                if(!this.mobile) {
                    this.$alert("请输入手机号码")
                }
                else if(!this.area_code) {
                    this.$alert("请选择区码")
                }
                else {
                    let encryptData = await this.encrypt({mobile: this.mobile, area_code: this.area_code, type:2})
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    let countryList = this.$axios.post(process.env.BASE_URL+'user/get_mbcode', formData)
                        .then((res) => {
                                    this.$alert(res.data.msg)
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
                }
            },
            async checkVerifyCode() {
                    let encryptData = await this.encrypt({mobile: this.mobile, area_code: this.area_code, code:this.verifyCode})
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    let countryList = this.$axios.post(process.env.BASE_URL+'user/chk_mbcode', formData)
                        .then((res) => {
                                if(res.data.status == 1) {
                                    this.submit()
                                }
                                else {
                                    this.$alert("验证码错误")
                                }
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
            },
             async getConrty() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                let countryList = this.$axios.post(process.env.BASE_URL+'other/get_country', formData)
                    .then((res) => {
                            this.selectOption = res.data.data
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
             },
             async onSubmit() {
                this.checkVerifyCode()

            },
            async submit() {
                    let advert = ""
                    advert = this.$route.query.num
                    let encryptData = await this.encrypt({mobile: this.mobile, area_code: this.area_code, password: this.password,code: this.verifyCode, invite_code: this.inviteCode, advert_id:advert, pl: 10}, 0)
                    let formData = new FormData();
                    formData.append("data", encryptData);
                    this.$axios.post(process.env.BASE_URL+'user/register', formData)
                        .then((res) => {
                            if(res.data.status == 1) {

                                this.$store.commit('setUid', res.data.data.uid)
                                this.$store.commit('setUserCode', res.data.data.usercode)
                                this.$store.commit('setLogin', true)
                                // if(this.remember_me) {
                                sessionStorage.setItem("pbUid", res.data.data.uid)
                                sessionStorage.setItem("pbUserCode", res.data.data.usercode)
                                sessionStorage.setItem("pbNickName", res.data.data.nickname)
                                sessionStorage.setItem("pbIsLogin", true)
                                this.$router.push('/register-2')
                                // this.$alert("註冊成功")
                            }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
            }
        },
        mounted() {
            this.getConrty()
        },
    }
</script>