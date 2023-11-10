<template>
<div>
    <div class="full-page-stream">
        <client-only placeholder="Loading...">
        <div class="cover" v-show="showCover">
            <img src="live_list_placeHolder@2x.png" @error="handleError($event)" alt="">
        </div> 
        <div v-show="onShow" class="float-user">
            <div><img class="avatar" :src="avatar" alt="" @error="handleError($event)"></div>
            <div>
                <!-- <div>{{nickname}}</div> -->
                <div><i class="icon-fire" src="" alt=""></i>{{hot}}</div>
            </div>
            <!-- <div class="following"><i class="icon-heart1"></i> </div> -->
        </div>
        <div v-show="onShow" class="float-coin"><i class="icon-coin-dollar1"></i>{{gift}}</div>
        <div id="send-gift-popup" class="align-center"></div>
        <div v-show="onShow" class="float-marquee"><i class="icon-volume-medium"></i><div class="marquee-content">{{marquee}}</div></div>
        <div class="user-detail-container" v-show="!onShow">
            <div class="img-box">
                <img :src="this.pic" alt="">
                <label class="change-image" for="file">更换图片<input  type="file" id="file" ref="file" :style="{visibility: 'hidden'}" v-on:change="changeImg()"></label>
            </div>
            <div class="input-box"><input type="text" v-model="title"></div>
        </div>
        <div id="local_stream"></div>
        <div id="svga" ref="canvas" clearsAfterStop="true"></div>
        <div v-show="onShow" class="float-ticket" @click="handleTicketClick">票</div>
        <div class="ticket-popup" v-show="showTicket">
            <p>一分钟后开启门票,请设定门票价格与持续时间</p>
            <select v-model="ticketTimeOption" style="border-radius:30px;margin-bottom:10px;height:40px">
                <option  v-for="(item, index) in ticketTimeOptions" :value="item" :key="index">{{item+ " 分钟" }}</option>
            </select>
            <select v-model="ticketMoneyOption" style="border-radius:30px;margin-bottom:10px;height:40px">
                <option  v-for="(item, index) in ticketMoneyOptions" :value="item" :key="index">{{item + "BABY"}}</option>
            </select>
            <div class="btn" @click="setTicket">确定</div>
        </div>
        <div class="start-show" @click="startShow" v-show="!onShow">開始直播</div>
        <div v-show="onShow" class="chat-room" id="chat-room" v-html="message"></div>
        <input v-show="onShow" type="text" class="chat-input" v-model="inputMessage">
        <button v-show="onShow" class="submit-message" @click="submitMessage(2)">發送</button>
        <div v-show="onShow" class="float-rich-rank">
            <img v-for="(item, index) in richRank" :key="index" :src="item.avatar" alt="">
        </div>
        <div class="float-close" :class="{ 'on-prepare': !onShow }" @click="leaveRTC">X</div>
        </client-only>
    </div>
    <div v-if="isEndShow" class="end-show-popup">
        <div class="close" @click="directHome">X</div>
        <div class="user-block">
            <div><img class="avatar" :src="endShowData.avatar" @error="handleError($event)"></div>
            <div class="nickname">{{endShowData.nickname}}</div>
            <div class="uid">ID: {{endShowData.uid}}</div>
        </div>
        <div class="earn-block">
            <span class="gold">{{endShowData.gift}} BaBy = {{parseFloat(endShowData.gift) *4}}</span>
            <div>本次直播收益</div>
        </div>
        <div class="time-block">
            <div class="left">
                <div><i class="icon-clock"></i></div>
                <div>直播时长</div>
                <div>{{endShowData.duration}}</div> 
            </div>
            <div class="right">
                <div><i class="icon-users"></i></div>
                <div>看过的人</div>
                <div>{{endShowData.viewer_num}}</div>
            </div>
        </div>
        <div class="time-block">
            <div class="left">
                <div><i class="icon-user-plus1"></i></div>
                <div>新增粉丝</div>
                <div>{{endShowData.new_follower}}</div>
            </div>
            <div class="right">
                <div><i class="icon-user"></i></div>
                <div>打赏人数</div>
                <div>{{endShowData.gift_num}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    .end-show-popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/IMG_0002.PNG');
        background-repeat: no-repeat;
        background-size: cover;
        z-index:  9999999;
        > div {
            color: white;
        }
        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 100%;
        }
        .user-block {
            width: 150px;
            margin: 80px auto 0;
            display: block;
            text-align: center;
            margin-bottom: 30px;
            > div {
                margin-bottom: 5px;
            }
        }
        .earn-block {
            width: 250px;
            margin: 0 auto;
            .gold {
                color: gold;
            }
        }
        .time-block {
            width: 320px;
            margin: 60px auto 0;
            overflow: hidden;
            margin-bottom: 20px;
            text-align: center;
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .close {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 24px;
        }
    }
    .full-page-stream {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        .play-btn, #svga {
            position: absolute;
            top: 100px;
            left: 100px;
            z-index: 99999999999;
            width: 100px;
            height: 100px;
        }
        #svga {
            left: 50%;
            top: 30%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            z-index: 9;
        }
        .icon-fire {
            margin-right: 5px;
        }
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            margin-top: 4px;
            margin-left: 5px;
            margin-right: 5px;
        }
        #send-gift-popup {
            width: 200px;
            padding: 15px 0;
            font-size: 14px;
            opacity: 0;
            position: absolute;
            left: 10px;
            top: 35%;
            z-index: 1;
            background-color: rgba(0,0,0,0.3);
            color: white;
            border-radius: 20px;
        }
        .cover {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            img {
                height: 100%;
            }
        }
        .user-detail-container {
            position: absolute;
            top: 90px;
            left: 15px;
            width: 90%;
            height: 120px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 20px;
            z-index: 2;
            display: flex;
            overflow: hidden;
            padding: 10px;
            .img-box {
                position: relative;
                width: 100px;
                text-align: center;
            }
            .change-image {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                overflow: hidden;
                font-size: 10px;
                background: white;
                height: 15px;
            }
            img {
                max-height: 100px;
                width: auto;
            }
            .input-box {
                display: block;
                width: 100%;
                height: 100%;
                padding-left: 20px;
                input {
                   background: rgba(0,0,0, .3);
                    border: 0;
                    width: 100%;
                    height: 100%;
                    color: #efefef;
                    font-size: 14px;
                }
            }
        }
        .ticket-popup {
            position: absolute;
            width: 300px;
            height: 200px;
            bottom: 50px;
            right: 10px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.7);
            z-index: 3;
            color: white;
            select {
                padding: 10px;
                border-radius: 30px;
                margin-bottom: 10px;
                height: 40px;
                width: 45%;
                display: inline-block;
            }
            .btn {
                width: 200px;
                margin: 0 auto;
                display: block;
            }
        }
        div[class^='float'] {
            position: absolute;
        }
        .float-coin {
            position: relative;
            top: 68px;
            left: 10px;
            color:#fff;
            // padding: 5px 35px 5px 10px;
            padding: 1px 30px 1px 5px;
            i:before {
                color: gold;
                font-size: 16px;
                margin-right: 5px;
            }
            &:after{
                position: absolute;
                right: 12px;
                top: 1px;
                content:">";
                display: inline-block;
            }
        }
        .float-user, .float-coin , .float-marquee {
            z-index: 2;
            border-radius: 30px;
            background-color: rgba(0,0,0,0.3);
            display: block;

        }
        .float-marquee {
            width: 95%;
            top: 99px;
            color: white;
            height: 25px;
            overflow: hidden;
            padding: 0 10px;
            left: 10px;
            white-space: nowrap;
            text-overflow: clip;
            .marquee-content {
                display: inline-block;
                width: 99%;
                margin-left: 15px;
                padding-left: 100%;
                -webkit-animation: marquee 5s linear infinite;    
                animation: marquee 5s linear infinite;
            }
            .icon-volume-medium {
                position: relative;
                top: 2px;
            }
        }
        .float-user {
            left: 10px;
            top: 20px;
            width: 140px;
            color:#fff;
            padding:1px 0px;
            display: flex;
            font-size: 12px;
            .following {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 10px;
                background: red;
                text-align: center;
                line-height: 20px;
                border-radius: 100%;
                top: 15px;
            }
            div:nth-child(2){
                position: relative;
                div{
                    position: absolute;
                    bottom: 4px;
                    left: 4px;  
                }
            }
        }
        .float-message, .float-game, .float-beauty , .float-ticket, .float-camara {
            position: absolute;
            bottom: 15px;
            background-color: rgba(0,0,0,0.3);
            border-radius: 100%;
            width: 30px;
            height: 30px;
        }
        .float-rich-rank {
            position: absolute;
            top: 30px;
            right: 140px;
            display: inline-block;
            img {
                width:20px;
                height: 20px;
                border-radius: 100%;
                justify-content: space-around;
            }
        }
        .float-close {
            position: absolute;
            top: 30px;
            right: 30px;
            background-color: rgba(0,0,0,0.3);
            width: 40px;
            height: 40px;
            font-size: 20px;
            color: white;
            border-radius: 100%;
            text-align: center;
            line-height: 34px;
            padding-top: 3px;
            &.on-prepare {
                right: initial;
                left: 30px;
            }
        }
        .float-message {
            left: 30px;
        }
        .float-game {
            left: 70px;
        }
        .float-camara {
            right: 30px;
        }
        .float-ticket {
            right: 45px;
            text-align: center;
            color: #efefef;
            padding-top: 4px;
            bottom: 3%;
        }
        .float-beauty {
            right: 100px;
        }
    .chat-room {
        position: absolute;
        bottom: calc(2% + 50px);
        left: 2%;
        width: 70%;
        height: 200px;
        overflow-y: scroll;
        border-radius: 15px 15px 0 0;
        background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
        color: white;
        font-size: 12px;
        padding:5px 10px;
        z-index: 2;
        overflow-y:auto;
        padding-bottom: 10px;
        > div {
            margin-bottom: 5px;
        }
    }
    .chat-input {
            position: absolute;
            bottom: 3%;
            left: 2%;
            line-height: 30px;
            border-radius: 30px;
            padding:0 10px;
            border:none;
            background:rgba(255, 255, 255, 0.7);
            width: 55%;
            z-index: 2;
    }
        button.submit-message {
            position: absolute;
            bottom: 3%;
            line-height: 30px;
            border-radius: 30px;
            border:none;
            padding:0 15px;
            color:#fff;
            background:linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            left: 60%;
            z-index: 2;
    }

        #local_stream {
            height: 100%;
        }
        .start-show {
            position: absolute;
            bottom: 100px;
            left: 50%;
            width: 250px;
            background: #efef1d;
            color: black;
            z-index: 3;
            padding: 10px 20px;
            margin-left: -125px;
            border-radius: 30px;
            text-align: center;
        }
        .hide {
            opacity: 0;
        }
        .show {
            opacity: 1 !important;
        }
        .red-background {
            background: red;
            padding: 3px;
            display: inline-block;
            margin-right: 5px;
        }
        .purple-level {
            background: purple;
            padding: 0px 12px;
            text-align: right;
            display: inline-block;
            margin-right: 5px;
            border-radius: 10px;
        }
        .orange-level {
            background: orange;
            padding: 0px 12px;
            text-align: right;
            display: inline-block;
            border-radius: 5px;
            margin-right: 5px;
        } 

    }
    @keyframes marquee {
        0%   { transform: translate(0, 0); }

        100% { transform: translate(-100%, 0); }
    }
    @-webkit-keyframes marquee {

        0%   { -webkit-transform: translate(0, 0); }

        100% { -webkit-transform: translate(-100%, 0); }

    }
</style>
<script>
    
    import '@/utils/mixins';
    import agoraJS from '../pages/share/agoraFunction'
    import SVGA from "svgaplayerweb";
    export default {
        props: ['data'],
        middleware: 'authenticated',
        head() {
            return {
                script: [
                { src: '/AgoraRTCSDK-3.1.0.js' },
                { src: '/agora-rtm-sdk-1.3.0.js' },
                { src: '/AgoraRTS.js' },
                ]
            }
        },
        data() {
            return {
                showCover: true,
                onShow: false,
                isEndShow: false,
                rtc: {
                    client: null,
                    joined: false,
                    published: false,
                    localStream: null,
                    remoteStreams: [],
                    params: {}
                },
                marquee: "",
                rickRank: null,
                option: {
                    mode: "live",
                    codec: "h264",
                    appID: "8f347a9342704de38da3c7acc5be208e",
                    channel: "", 
                    uid: this.$store.getters.getUid,
                    token: ""
                },
                client: null,
                chanel: null,
                RTMToken: null,
                endShowData: {
                    uid:"",
                    nickname:"",
                    avatar:"",
                    begin_time:"",
                    duration:"",
                    viewer_num:"",
                    gift: "",
                    gift_num: "" ,
                    new_follower:""
                },
                isLogin: false,
                hot: 0,
                pic: "",
                title: "",
                showType: "prepare",
                avatar: "",
                nickname: "",
                uid: this.$store.getters.getUid,
                message:　"",
                inputMessage: "",
                file: null,
                viewer: 0,
                gift: null,
                richRank: null,
                triggerRefresh: null,
                player: null,
                parser: null,
                intervalScroll: null,
                role: "",
                showTicket: false,
                ticketTimeOption: "15",
                ticketMoneyOption: "28",
                ticketTimeOptions: ["15","20","25","30","35","40","45","50","55","60"],
                ticketMoneyOptions: ["28", "38", "48", "58", "68", "78", "88", "98","108", "118", "128", "138", "148", "158", "168", "178", "188", "198"]
            }
        },
        created() {
            this.getRTMToken = agoraJS.getRTMToken.bind(this)
            this.getRTCToken = agoraJS.getRTCToken.bind(this)
            this.loginRTM = agoraJS.loginRTM.bind(this)
            this.createRTMClient = agoraJS.createRTMClient.bind(this)
            this.createRTMChanel = agoraJS.createRTMChanel.bind(this)
            this.joinRTMChanel = agoraJS.joinRTMChanel.bind(this)
            this.join = agoraJS.join.bind(this)
            this.publish = agoraJS.publish.bind(this)
            this.handleEvents = agoraJS.handleEvents.bind(this)
            this.setMessageFormat = agoraJS.setMessageFormat.bind(this)
            this.sendRTMChannelMessage = agoraJS.sendRTMChannelMessage.bind(this)
            this.listenRTMChannelMessage = agoraJS.listenRTMChannelMessage.bind(this)
            this.leaveRTC = agoraJS.leaveRTC.bind(this)
            this.logoutRTM = agoraJS.logoutRTM.bind(this)
            this.playSVGA = agoraJS.playSVGA.bind(this)
            this.showGiftSender = agoraJS.showGiftSender.bind(this)
        },
        beforeMount() {
            if(sessionStorage.getItem("pbUid")) {
                this.option.channel = sessionStorage.getItem("pbUid")
            }
            document.body.style.overflow = "visible"
        },
        mounted() {
            this.$store.commit("setPopup", false)
            this.prePareShow();
            this.getMarquee()
            this.triggerHeartBeat = setInterval(() => {
                this.heartBeat()
            }, 3000);
            this.triggerRefresh = setInterval(() => {
                this.refreshPerMinute()
            }, 60000)
        },
        methods: {
            async changeImg() {
                this.file = this.$refs.file.files[0];
                let data = {type: 7}
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                formData.append('file[]', this.file)
                this.$axios.post(process.env.BASE_URL+'my/upload_pic', formData)
                    .then((res) => {
                            this.pic = res.data.data[0].pic_url
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            submitMessage(type) {
                let message = this.setMessageFormat(this.inputMessage, type,this.uid, this.uid, this.nickname, this.avatar)
                this.sendRTMChannelMessage(message)
                this.inputMessage ='';
                this.autoScrollBottom()
            },
            autoScrollBottom() {
                this.intervalScroll =setInterval(() => {
                    let chatWindow = document.getElementById('chat-room'); 
                    var xH = chatWindow.scrollHeight;
                    chatWindow.scrollTo(0, xH);
                }, 100);
            },
            async refreshPerMinute() {
                    let data = {room_id: this.option.channel}
                    let encryptData = await this.encrypt(data)
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'live/refresh', formData)
                        .then((res) => {
                                // if(res.data.status != 1) {
                                //     this.handleAuthError();
                                // }
                                // else {
                                    this.viewer = res.data.data.viewer
                                    this.gift = res.data.data.gift
                                    this.richRank = this.richRank
                                // }
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
            },
            async heartBeat() {
                    let data = {room_id: this.option.channel}
                    let encryptData = await this.encrypt(data)
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'live/heartbeat', formData)
                        .then((res) => {
                                if(res.data.status == 0) {
                                    clearInterval(this.triggerHeartBeat)
                                    this.leaveRTC()
                                }
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
            },
            async prePareShow() {
                let data = {}
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'live/prepare_show', formData)
                    .then((res) => {
                            if(res.data.data.is_anchor == 0) {
                                this.$alert("您还不是认证主播喔")
                                .then(() => {
                                    this.$router.push('/')
                                })
                            }
                            else {
                                this.pic = res.data.data.pic
                                this.title = res.data.data.title
                                this.$store.commit("setIsHeaderShow", false)
                                this.$store.commit("setIsFooterShow", false)
                                this.getRTMToken({data: {room_id: this.option.channel}, role:"anchor"})
                                this.getRTCToken({data: {room_id: this.option.channel, type: 'anchor'}, role:"anchor"})
                                this.createRTMClient()
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            async startShow() {
                    let data = {title: this.title, pic: this.pic}
                    let encryptData = await this.encrypt(data)
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'live/start_show', formData)
                        .then((res) => {
                                this.nickname = res.data.data.nickname
                                this.avatar = res.data.data.avatar
                                this.title = res.data.data.title

                                // create RTM
                                this.onShow = true
                                this.refreshPerMinute()
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
            },

            handleAuthError() {
                this.$alert("RTM 登陸失敗")
                .then((r) =>{
                    this.$store.commit('setLogin', false)
                    sessionStorage.removeItem("pbUid")
                    sessionStorage.removeItem("pbUserCode")
                    this.$router.push("/login")
                })
            },
            handleError(e) {
                e.target.setAttribute("src", "1.png")
            },
            handleTicketClick() {
                this.showTicket = !this.showTicket 
            },
            async setTicket() {
                let data = {
                    room_id: this.option.channel,
                    delay: 1,
                    duration: this.ticketTimeOption,
                    price: ticketMoneyOptions
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'live/set_ticket', formData)
                    .then((res) => {
                            if(res.data.status == 1) {
                                this.$alert("设定门票成功")
                            }
                            if(res.data.status == 0) {
                                this.$alert("设定门票失败")
                            }
                            if(res.data.status == 3) {
                                this.$alert("认证失败")
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            async getMarquee() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                formData.append('file[]', this.file)
                this.$axios.post(process.env.BASE_URL+'other/notice', formData)
                    .then((res) => {
                            this.marquee = res.data.data[0].content
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            directHome() {
                this.$router.push('/')
            }
        },
        beforeDestroy: function () {
            clearInterval(this.triggerRefresh)
            clearInterval(this.triggerHeartBeat)
            clearInterval(this.intervalScroll)
        }
    }
</script>