<template>
<div>
    <div class="full-page-stream">
        <div class="cover" v-show="showCover">
            <div class="blur" v-show="hostDisconnect">
                <div class="content">主播离开直播间</div>
            </div>
            <img @error="handleError($event)" src="live_list_placeHolder@2x.png" alt="">
        </div>
        <div class="float-user">
            <div><img class="avatar" :src="data.streamData.avatar" alt=""></div>
            <div>
                <div>{{data.streamData.nickname}}</div>
                <div><i class="icon-fire"></i>{{viewer}}</div>
            </div>
            <div @click="follow" class="following"><i class="icon-heart1"></i> </div>
        </div>
        <div class="float-coin"><i class="icon-coin-dollar1"></i>{{gift}}</div>
        <div class="float-marquee"><i class="icon-volume-medium"></i><div class="marquee-content">{{marquee}}</div></div>
        <div id="video"></div>
        <div class="drawing-parent">
            <div id="svga" ref="canvas" clearsAfterStop="true"></div>
        </div>
        <div class="chat-room" id="chat-room" v-html="message"></div>
        <input type="text" class="chat-input" v-model="inputMessage">
        <div id="local_stream"></div>
        <button class="submit-message" @click="submitMessage(2)">發送</button>
        <div class="float-gift" @click="openGift"> <i class="icon-gift"></i> </div>
        <div class="gift-List" v-show="showGiftList">
            <div class="gift-item" v-for="(item, index) in giftList" :key="index" :class="{ 'active': choosenGiftId == item.id }" @click="chooseGift(item.id, $event, item.fee, item.effect, item.gift)">
                <div><img :src="item.gift_pic" alt=""></div>
                <div>{{item.gift}}</div>
                <div>{{item.fee}}</div>
            </div>
            <select class="gift-num" v-model="giftNum" style="border-radius:10px;margin-top:10px;padding-left:10px;background:#B280B7;color:#fff">
                <option  v-for="item in giftText" :value="item.num" :key="item.num">{{item.title}}</option>
            </select>
            <div class="btn" @click="sendGift">送出</div>
        </div>
        <div class="blur-overlay" v-show="showBlur">
            <div class="check-panel">
                <p>您好, 本直播間目前須持門票觀看
                是否支付{{ticketPrice}}BABY購買門票
                </p>
                <div v-show="buyTicketFailed" class="red">购买失败</div>
                <div class="btn" @click="goDeposit">充值</div> <div @click="payTicket" class="btn">确定</div>
            </div>
        </div>
        <div class="float-close" @click="leaveRTC">X</div>
    </div>
    <div class="end-view" v-if="isEndView">
        <div class="close" @click="directHome">X</div>
        <div class="user-block">
            <div><img class="avatar" :src="endViewData.avatar" @error="handleError($event)"></div>
            <div class="nickname">{{endViewData.nickname}}</div>
            <div>直播已结束</div>
        </div>
        <div class="earn-block">
            <!-- <span class="gold">{{endShowData.gift}} BaBy = {{endShowData.gift *4}}</span> -->
            <div>上次直播时间 {{endViewData.begin_time}}</div>
        </div>
        <div class="time-block">
            <div class="left">
                <div>人气值</div>
                <div>{{endViewData.viewer_num}}</div>
            </div>
            <div class="right">
                <div>直播时长</div>
                <div>{{endViewData.duration}}</div> 
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    .blur{
        backdrop-filter: blur(15px);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .end-view {
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
        .avatar {
            width: 30px;
            height: 30px;
            border-radius: 100%;
        }
        .btn {
            margin-top: 10px;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 30px;
            width:calc( 100% - 20px);
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
        .hide {
            opacity: 0;
        }
        .drawing-parent {
            width: 200px;
            height: 200px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        #svga {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            z-index: 9;
        }
    }
    .float-user, .float-coin , .float-marquee {
        position: absolute;
        z-index: 2;
        border-radius: 30px;
        background-color: rgba(0,0,0,0.3);
        display: block;
    }
    .blur-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; 
        width: 100%;
        height: 100%;
        z-index: 3;
        backdrop-filter: blur(15px);
        .check-panel {
            background: white;
            width: 300px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px;
        }
        .btn {
            display: inline-block;
            width: 120px;
        }
        .red {
            color: red; 
        }
    }
    .cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        overflow:hidden;
        // border-radius: none;
        height:100%;
        width:100%;
        img {
            height: 100%;
            // width:100%;
        }
    }
    .float-message, .float-game, .float-gift {
        position: absolute;
        bottom: 2%;
        background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        border-radius: 100%;
        width: 50px;
        height: 50px;
    }
    .float-coin {
        top: 68px;
        left: 10px;
        color:#fff;
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
    .float-close {
        position: absolute;
        top: 30px;
        right: 30px;
        background-color: rgba(0,0,0,0.3);
        width: 40px;
        height: 40px;
        color: white;
        font-size:20px;
        line-height:34px;
        border-radius: 100%;
        text-align: center;
        padding-top: 3px;
        z-index: 4;
    }
    .float-message {
        left: 30px;
    }
    .float-gift {
        right: 5%;
        text-align: center;
        line-height: 60px;
        i:before {
            font-size: 30px;
            color: white;
        }
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
    .float-user {
        left: 10px;
        top: 20px;
        width: 140px;
        color:#fff;
        padding:5px 5px 2px 5px;
        display: flex;
        font-size: 12px;
        .following {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 10px;
            background: red;
            text-align: center;
            line-height: 21px;
            border-radius: 100%;
            top: 15px;
        }
        &>div:nth-child(2){
            margin-left: 7px;
        }
        .icon-fire {
            margin-right: 5px;
        }
    }
    #video {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: none;
        top: 0;
        left: 0;
        .video-view, .video-placeholder {
            width: 100%;
            height: 100%;
        }
    }
    .gift-List {
    width: 100vw;
    height: auto;
    z-index: 9999;
    border-radius:30px 30px 0 0 ;
    padding: 15px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 65px;
    right: 0px;
        .gift-item {
            width: 23%;
            height: 22vw;
            margin:1%;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 15px;
            float: left;
            color: white;
            font-size: 12px;
            text-align: center;
            img {
                height: auto;
                width: 40px;
            }
            &.active {
                border-color: purple;
            }
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
        head() {
            return {
                script: [
                { src: '/AgoraRTCSDK-3.1.0.js' },
                { src: '/agora-rtm-sdk-1.3.0.js' },
                { src: '/AgoraRTS.js' },
                ]
            }
        },
        props: ['data'],
        data() {
            return {
                rtc: {
                    client: null,
                    joined: false,
                    published: false,
                    localStream: null,
                    remoteStreams: [],
                    params: {}
                },
                option: {
                    mode: "live",
                    codec: "h264",
                    appID: "8f347a9342704de38da3c7acc5be208e",
                    channel: "", 
                    uid: this.$store.getters.getUid,
                    token: ""
                },
                RTMToken: null,
                hostDisconnect: false,
                // RTCToken: null,
                isLogin: false,
                message:　"",
                inputMessage: "",
                giftList: null,
                showGiftList: false,
                selectedGift: null,
                showCover: true,
                nickname: sessionStorage.getItem('pbNickName') ? sessionStorage.getItem('pbNickName') : '',
                giftText: null,
                choosenGiftId: "",
                giftNum: 1,
                choosenFee: 0,
                gift: 0,
                effect: "",
                intervalScroll: null,
                giftName: "",
                role: "",
                isTicketSet: false,
                ticketPrice: 0,
                showBlur: false,
                timeLeft: 0,
                buyTicketFailed: false,
                level: 1,
                isEndView: false,
                endViewData: null,
                viewer: 0,
                marquee: "dashuih asdhudahsua hasuhidas asuhduias huiahda ashudhasiu huihdasu asuhdisa ahuidhsa huihasdas ahudihasu ahudihas huiashdua",
            }
        },
        beforeMount() {
            this.option.channel = this.data.streamData.room_id
            this.refreshPerMinute()
        },
        mounted() {
            this.getRTMToken({data:{room_id: this.option.channel, chkUser: 1}, role:"audience"})
            this.getRTCToken({data: {room_id: this.option.channel, type: 'audience', chkUser: 1}, role:"audience"})
            this.getGiftList()
            this.checkVip()
            this.getMarquee()
            this.triggerRefresh = setInterval(() => {
                this.refreshPerMinute()
            }, 60000)
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
            this.sendRTMChannelMessage = agoraJS.sendRTMChannelMessage.bind(this)
            this.listenRTMChannelMessage = agoraJS.listenRTMChannelMessage.bind(this)
            this.leaveRTC = agoraJS.leaveRTC.bind(this)
            this.logoutRTM = agoraJS.logoutRTM.bind(this)
            this.addView = agoraJS.addView.bind(this)
            this.setMessageFormat = agoraJS.setMessageFormat.bind(this)
            this.playSVGA = agoraJS.playSVGA.bind(this)
            this.endView = agoraJS.endView.bind(this)
        },
        methods: {
            submitMessage(type) {
                if(this.level < 2) {
                    this.$alert("您还不是VIP不能发言喔,请打赏主播成为VIP")
                }
                else {
                    let message = this.setMessageFormat(this.inputMessage, type, this.option.uid, this.option.uid, this.nickname, this.avatar, this.level)
                    this.sendRTMChannelMessage(message);
                    this.inputMessage ='';
                    this.autoScrollBottom()
                }
            },
            autoScrollBottom() {
                this.intervalScroll =setInterval(() => {
                    let chatWindow = document.getElementById('chat-room'); 
                    var xH = chatWindow.scrollHeight;
                    chatWindow.scrollTo(0, xH);
                }, 100);
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
            chooseGift(id, e, fee, effect, name) {
                this.choosenGiftId = id
                this.choosenFee = fee
                this.effect = effect
                this.giftName = name
            },
            openGift() {
                this.showGiftList = !this.showGiftList
            },
            goDeposit() {
                this.$route.push('/')
            },
            directHome() {
                this.$router.push('/')
            },
            async payTicket() {
                let data = {room_id: this.option.channel}
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'live/buy_ticket', formData)
                    .then((res) => {
                            if(res.data.status ==1) {
                                this.showBlur = false
                            }
                            else {

                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            async sendGift() {
                let data = {
                    op_uid: this.option.channel,
                    gift_id: this.choosenGiftId,
                    num: this.giftNum,
                    call_id: this.option.channel
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'chat/send_gift', formData)
                    .then((res) => {
                            if(res.data.status ==1) {
                                this.playSVGA(this.effect)
                                // message send to host let it play animation
                                let message = {
                                    effect: this.effect,
                                    giftId: this.choosenGiftId,
                                    name: this.giftName,
                                    num: this.giftNum,
                                    url: ""
                                }
                                this.sendRTMChannelMessage(
                                    this.setMessageFormat(message, 6,"",this.option.uid, this.nickname, this.avatar)
                                )
                                this.showGiftList = false
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            console.log("get encrypt error")
                    })
            },
            async refreshPerMinute() {
                    let data = {room_id: this.option.channel}
                    let encryptData = await this.encrypt(data)
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'live/refresh', formData)
                        .then((res) => {
                                    this.viewer = res.data.data.viewer
                                    this.gift = res.data.data.gift
                                    this.ticketPrice = res.data.data.ticket_price
                                    if(res.data.data.ticket_in == 1 && res.data.data.ticket_buy ==0) {
                                        this.showBlur()
                                    }
                            })
                            .catch((err) => {
                                console.log("get encrypt error")
                        })
            },
            showBlur() {
                this.showBlur = true
            },

            async getGiftList() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'chat/get_gift', formData)
                    .then((res) => {
                            this.giftList = res.data.data.gift_list
                            this.giftText = res.data.data.gift_num
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            handleError(e) {
                e.target.setAttribute("src", "avatar.jpg")
            },
            async checkVip() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'user/get_info', formData)
                    .then((res) => {
                            if(res.data.data.level > 3) {
                                this.level = res.data.data.level
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            },
            async follow() {
                let encryptData = await this.encrypt({op_uid: this.option.channel, type: 1,room_id: this.option.channel})
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'my/follow', formData)
                    .then((res) => {
                            if(res.data.data.follow  == 1) {
                                this.$alert("已关注")
                            }
                            if(res.data.data.follow  == 0) {
                                this.$alert("已取消关注")
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            }
            
        },
         beforeDestroy: function () {
            clearInterval(this.intervalScroll)
            clearInterval(this.triggerRefresh)
        }
    }
</script>