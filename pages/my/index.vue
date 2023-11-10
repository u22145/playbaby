<template>
 <client-only placeholder="Loading...">
    <div class="my-profile container">
        <MyHeader />
        <div class="user-info">
            <div class="flex-item">{{myData.nickname}}</div>
            <!-- <div class="flex-item"><img :src="myData.symbol" alt=""></div> -->
            <div class="user-img-outer" @click="directDetailPage(myData.uid)">
                <div class="flex-item user-img" >
                    <img :src="myData.avatar == '' ? myData.gender+'.png' : myData.avatar"  alt="" @error="handleError($event,myData.gender)">
                </div>
            </div>
            <div style="font-size:22px" class="flex-item">LV  {{myData.level}} </div>
        </div>
        <div class="social-media">
            <div class="flex-item" @click="directFollowingList">
                <div class="purple">{{myData.following_num}}</div>
                <div>关注</div>
            </div>
            <div class="flex-item fans" @click="directFansList">
                <div class="purple">{{myData.follower_num}}</div>
                <div>粉丝</div>
            </div>
            <div class="flex-item post" @click="directPostList">
                <div class="pink">{{myData.blog_num}}</div>
                <div>发布</div>
            </div>
            <div class="flex-item like">
                <div class="pink">{{myData.likes_num}}</div>
                <div>获赞</div>
            </div>
        </div>
        <div class="banner" v-if="bannerList2 != null"><img :src="bannerList2[0].pic" alt=""></div>
        <!-- <div class="banner"><img src="img-loading.jpg" alt=""></div> -->
        <div class="links">
            <div class="link">
                <nuxt-link to="/deposit"><i class="icon-download"></i>入金<span class="arrow2"></span></nuxt-link>
            </div>
            <div class="link">
                <nuxt-link to="/earnmoney"><i class="icon-coin-dollar"></i>推广赚钱<span class="arrow2"></span></nuxt-link>
            </div>
            <!-- <div class="link">
                <nuxt-link to="/myWallet"><i class="icon-list2"></i>消息<span class="arrow2"></span></nuxt-link>
            </div> -->
            <div class="link">
                <nuxt-link to="/host-verify"><i class="icon-user-check"></i>主播认证<span class="arrow2"></span></nuxt-link>
            </div>
            <div class="link">
                <nuxt-link to="/invite-friend"><i class="icon-user-plus"></i>邀请好友<span class="arrow2"></span> </nuxt-link>
            </div>
            <div class="link">
                <nuxt-link to="/myWallet">
                <i class="icon-credit-card"></i>
                我的錢包 
                <span class="arrow2"></span>
                </nuxt-link>
            </div>
            <div class="link" @click="logout()">
                登出   V 0.1.8 <i class="icon-forward"></i>  
            </div>
        </div>
    </div>
     </client-only>
</template>
<style lang="scss">
        .container {
            // margin-top: 100px;
        }
        .social-media {
            padding: 0 30px;
        }
        .social-media {
            display: flex;
            margin-top: 30px;
            .flex-item {
                flex: 1;
                text-align: center;
            }
        }
    .my-profile {
        background: white;
        color:#666;
            .arrow2 {
                border-color: black;
                border-width: 2px 0 0 2px;
                display: inline-block;
                border-style: solid;
                width: 10px;
                height: 10px;
                transform: rotate(135deg);
                float: right;
                margin-top: 10px;
            }
        margin-bottom: 65px;
        .pink {
            color: #E94070;
            font-size: 36px;
            line-height: 44px;
        }
        .purple {
            color: #6F3B92;
            font-size: 36px;
            line-height: 44px;
        }
        margin-top: 120px;
        .user-info {
            display: flex;
            width:100%;
            text-align: center;
            justify-content: space-around;
            .flex-item {
                justify-content: space-around;
                line-height: 140px;
            }
        }
        .user-img-outer {
            width: 140px;
            height: 140px;
            border-radius: 100%;
            // border: 4px solid purple;
            background:linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            padding: 0px;
        }
        .user-img {
            width: 132px;
            height: 132px;
            border-radius: 100%;
            overflow: hidden;
            background: #ddd;
            background-position: 50% 50%;
            border:#fff 6px solid;
            margin:4px;
            background-size: contain;
            background-repeat: no-repeat;
            // background: white;
            // background-position: 50% 50%;
            // background-size: contain;
            // background-repeat: no-repeat;
            img {
                height: 120px;
            };
        }
        .banner {
            margin-top: 30px;
            img{
                width: 100%;
                height: 150px;
            }
        }
        .link {
            padding: 20px 20px 20px 80px;
            position: relative;
            border-bottom:  1px solid #EDEDED;
            a {
                width: 100%;
                height: 100%;
                display: block;
                color:#666;
            }
            i {
                position: absolute;
                display: inline-block;
                left: 40px;
                &:before {
                    font-size: 24px;
                }
            }
            span {
                margin-right:20px;
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
                myData: "",
                bannerList2:null,
                fakeImg: "https://via.placeholder.com/300"
            }
        },
        middleware: 'authenticated',
        methods: {
            async getBanner2() {
                let encryptData = await this.encrypt({"type":1 },0)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'other/banner_list', formData)
                    .then((res) => {
                        console.log("BANNER",res.data.data)
                        this.bannerList2 = res.data.data;
                        // this.hotTopics ={},
                        // this.getHotList();
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                    })
            },
            directDetailPage(uid) {
                this.$router.push({ path: `/my/${uid}` })
            },
            async getMyData() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                let countryList = this.$axios.post(process.env.BASE_URL+'user/get_info', formData)
                    .then((res) => {
                            this.myData = res.data.data
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            async logout() {
                let encryptData = await this.encrypt({}, 0)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'user/logout', formData)
                    .then((res) => {
                            // if(res.data.status ==1) {
                                this.$store.commit('setLogin', false)
                                this.$store.commit('setUid', '')
                                this.$store.commit('setUserCode', '')
                                sessionStorage.removeItem("pbUid")
                                sessionStorage.removeItem("pbUserCode")
                                sessionStorage.removeItem("pbNickName")
                                sessionStorage.setItem("pbIsLogin", false)
                                this.$alert('登出成功')
                                .then(() => {
                                    this.$router.push("/")
                                })
                                // setTimeout(() => {
                                //     this.$router.push("/")
                                // })
                            // }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                })
            },
            handleError(e,f) {
                e.target.setAttribute("src", f+".png")
            },
            directFollowingList() {
                this.$router.push('/following-list')
            },
            directFansList() {
                this.$router.push('/fans-list')
            },
            directPostList() {
                this.$router.push('/post-list')
            }
        },
        beforeMount() {
        },
        mounted() {
            this.getBanner2();
            this.getMyData();
            this.$store.commit("setIsHeaderShow", true);
            this.$store.commit("setIsFooterShow", true)
        },
    }
</script>