<template>
    <div class="login">
        <div class="login-container">
            <div class="loginbox">
                <div class="title">
                    <!-- PLAY BABY -->
                    <img style="float:left;width:80%;margin-bottom:10px" src="logo.png" alt="">
                </div>
                <div>
                    <select v-model="area_code" style="border-radius:30px;margin-bottom:10px;height:40px">
                        <option  v-for="item in selectOption" :value="item.area_code" :key="item.id">{{"+"+item.area_code + " " + item.zh}}</option>
                    </select>
                    <input style="border-radius:30px;margin-bottom:10px;height:40px" type="text" placeholder="手機號碼" v-model="mobile">
                </div>
                <div>
                    <input style="border-radius:30px;margin-bottom:10px;height:40px" type="password" placeholder="密碼" v-model="password">
                </div>
                <div>
                    <label for="remember-me" class="remember-me"><input type="checkbox" id="remember-me" v-model="remember_me">記住我</label>
                    <div class="forget-password-link"><nuxt-link to="/forget_password">忘記密碼</nuxt-link></div>
                </div>
                <button class="login-btn" type="button" @click="onSubmit">登录</button>
                <div class="register-link"><nuxt-link to="/register">快速注册</nuxt-link></div>

            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .login {
        height: 100vh;
        // padding-top: 100px;
        background-image: url(/login.png);
        background-size: auto 100%;
        background-repeat:no-repeat;
        background-position:center right;
        .login-container {
            width:100%;
            height:100%;
            padding-top: 100px;
            bottom:0px;
            background: linear-gradient(90deg, rgba(106, 58, 147, 0.7) 0%, rgba(232, 63, 111, 0.7) 100%);
            // max-width: 250px;
            padding:  100px 30px;
        }
        input[type='password'],input[type='text'],select {
            width: 100%;
            height: 30px;
            margin-bottom: 2px;
            border: 0;
            background: rgba(255,255,255,0.8);
            padding: 0 10px;
        }
        .remember-me {
            font-size: 14px;
            margin-top: 10px;
            padding-left:10px;
            display: inline-block;
            color:#fff;
            #remember-me {
                margin-right: 10px;
            }
        }
        .title {
            font-size: 36px;
            color: white;
            margin-bottom: 10px;
            // margin-top: 10%;
        }
        .loginbox {
            position: absolute;
            width:84%;
            margin-bottom: 80px;
            bottom:0px;
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
            font-size: 14px;
            float: right;
            padding-right:10px;
            margin-top: 5px;
            a {
            color:#fff;
            }
        }
        .register-link {
            font-size: 14px;
            float: left;
            padding-left:10px;
            margin-top: 10px;
            a {
            color:#fff;
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
                area_code: "86",
                selectOption: null,
                remember_me : false
            }
        },
        methods: {
             async getConrty() {
                let encryptData = await this.encrypt({},0)
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
                let data = {
                    mobile: this.mobile,
                    password: this.password,
                    area_code:this.area_code
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'user/login', formData)
                    .then((res) => {
                            if(res.data.status == 1) {
                                this.$store.commit('setUid', res.data.data.uid)
                                this.$store.commit('setUserCode', res.data.data.usercode)
                                this.$store.commit('setLogin', true)
                                this.$store.commit("setNickName", res.data.data.nickname)
                                // if(this.remember_me) {
                                    sessionStorage.setItem("pbUid", res.data.data.uid)
                                    sessionStorage.setItem("pbUserCode", res.data.data.usercode)
                                    sessionStorage.setItem("pbNickName", res.data.data.nickname)
                                    sessionStorage.setItem("pbIsLogin", true)
                                // }
                                sessionStorage.setItem("activeMenu", "recommend")
                                this.$router.push("/")
                                // console.log(this.$store.getters.getUid)
                            }
                            else {
                                this.$alert("帐号密码错误", false, false, {confirmButtonText: '确定'})
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            }
        },
        mounted() {
            this.$store.commit("setIsHeaderShow", false);
            this.$store.commit("setPopup", false)
            this.getConrty()
        },
        destroyed() {
            this.$store.commit("setIsHeaderShow", true);
        },
    }
</script>