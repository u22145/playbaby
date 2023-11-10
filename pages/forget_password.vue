<template>
    <div class="forget-password">
        <Back />
        <div class="forget-container">
            <div class="title">
                忘记密码
            </div>
            <div>
                <select v-model="area_code">
                    <option v-for="item in selectOption" :value="item.area_code" :key="item.id">{{"+"+item.area_code + " " + item.zh}}</option>
                </select>
                <input type="text" placeholder="手機號碼" v-model="mobile">
                <div class="verify-code-container">
                    <input type="text" placeholder="请填入验证码" v-model="verifyCode">
                    <div class="send-verify-code" @click="sendVerifyCode">获取验证码</div>
                </div>
            </div>
            <div>
                <input  type="password" placeholder="密码" v-model="password">
                <input type="password" placeholder="确认密码" v-model="confirmPassword">
            </div>
            <button class="login-btn" type="button" @click="checkVerifyCode">提交</button>
        </div>
    </div>
</template>
<style lang="scss">
    .forget-password {
        height: 100vh;
        padding-top: 100px;
        background: linear-gradient(90deg, rgba(106, 58, 147, 0.7) -1.03%, rgba(232, 63, 111, 0.7) 96.07%);
        .forget-container {
            max-width: 250px;
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
                confirmPassword: "",
                area_code: "",
                selectOption: null,
                verifyCode: ""
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
                                    this.onSubmit()
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
                //  get encryp data
                    let encryptData = await this.encrypt({
                        area_code: this.area_code,
                        mobile: this.mobile,
                        code: this.verifyCode,
                        passwd: this.password,
                        appid: 1
                    })
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    let countryList = this.$axios.post(process.env.BASE_URL+'user/get_password', formData)
                        .then((res) => {
                                if(res.data.status == 1) {
                                    this.$alert("密码修改成功")
                                }
                                else {
                                    this.$alert(res.msg)
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