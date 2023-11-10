<template>
    <div class="video-container">
        性別：{{videoData.data.gender}}
        <div class="loading"> <i class="icon-spinner2"></i> </div>
        <div class="play-btn"  @click="playVideo(videoData.index, $event, videoData.data.id, videoData.data.fee)">
        </div>
        <video ref="videoPlayer" class="video-js" :id="videoData.index"></video>
        <div class="info">
            <div>{{videoData.data.nickname}}</div>
            <div>{{videoData.data.title}}</div>
        </div>
        <ul class="social">
            <li class="avatar" @click="handleCardClick(videoData.data.uid)"><img :src="videoData.data.avatar == '' ? videoData.data.gender+'.png' : videoData.data.avatar" alt=""    ></li>
            <!-- <div class="avatar" @click="handleCardClick(videoData.data.uid)"><img :src="videoData.data.avatar" alt=""></div> -->
            <like :status="videoData.data.likes_status" :type="videoData.data.type" :likeId="videoData.data.id" :number="videoData.data.likes_num" />
            <dislike :status="videoData.data.dislikes_status" :type="videoData.data.type" :dislikeId="videoData.data.id" :number="videoData.data.dislike_num" />   
            <!-- <div @click="likeButton(2, videoData.data.id)">{{videoData.data.likes_num}}<i class="icon-heart"></i></div>
            <div @click="dislikeButton(2, videoData.data.id)">{{videoData.data.dislike_num}}<i class="icon-sad2"></i></div> -->
            <li @click="openVideoComment">{{videoData.data.review_num}}<i class="icon-bubbles"></i></li>
            <li>{{videoData.data.share_num}}<i class="icon-share2"></i></li>
        </ul>
        <div class="video-commend" :class="[videoShowComment ? 'active' : '']">
            <div class="title align-center">{{videoData.data.review_num}}条评论 </div>
            <div class="comment-container">
                <div v-for="(item, index) in videoComment" :key="index" class="comnent">
                    <div class="user">
                    <img class="thumbnail" :src="String(item.avatar) == '' ? item.gender+'.png' : item.avatar" alt=""  @click="handleCardClick(item.uid)">
                        <div style="width:60%" >
                            <div class="name"> 
                                <span style="float:left;padding-right:5px;">{{item.nickname}} </span> 
                                <Tag :content="item.age" :color="`red`" :type="item.gender" />
                                <span class="region"><img :src="item.country_flag" alt=""></span>
                            </div>
                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0">
                                {{item.review}} 
                            </div>
                            <div @click="clickReply(item.rev_id)" class="show-reply" v-if="item.reply.length > 0">{{item.reply[0].nickname}} 等人 共{{item.reply.length}}則<span class="purple-link">回復</span></div>
                            <div class="reply-page" v-show="showReply">
                                <div v-for="(reply, index) in item.reply" class="coment" :key="index">
                                    <div class="user">
                                        <!-- <img class="thumbnail" :src="String(reply.avatar) == '' ? reply.gender+'.png' : reply.avatar" alt=""  @click="handleCardClick(reply.uid)">
                                        <div style="width:60%">
                                            <div class="name"> 
                                                <span style="float:left;padding-right:5px;">{{reply.nickname}} </span> 
                                                <Tag :content="reply.age" :color="`red`" :type="reply.gender" />
                                                <span class="region"><img :src="reply.country_flag" alt=""></span>
                                            </div>
                                            <div style="clear:both;font-size:14px;color:#666;padding:6px 0">
                                                {{reply.review}} 
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="width:20%;line-height:40px;text-align:center;color:#999" @click="likeButton(3, item.rev_id)">
                            讚  {{item.likes_num}}
                        </div>
                    </div>
            </div>
            </div>
            <ul class="sticky-footer2">
                <div>
                    <input class="reply"  type="text" placeholder="請輸入留言" v-model="review">
                </div>
                <button class="submit-btn2" type="button" @click="reviewSubmit(videoData.data.id)">提交</button>
            </ul>
        </div>
        <div class="video-reply">

        </div>
        <div class="video-overlay" v-if="videoShowComment" @click="closeVideoComment">

        </div>
    </div>
</template>
<style lang="scss">
    .video-container {
        // position: relative;
        .loading {
            z-index: 100;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: spin 1.4s infinite linear;
            opacity: 1;
            i:before {
                font-size: 2.25rem;
                color: #efefef;
            }
            &.hide {
                opacity: 0;
                z-index: -1;
            }
        }
        .show-reply {
            background: #efefef;
            padding: 5px;
            .purple-link {
                color: purple;
            }
        }
        .reply-page {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            // height: 100%;
            z-index: 200;
            background: white;
        }
        .info {
            position: absolute;
            bottom: 120px;
            left: 20px;
            color: white;
        }
        .social {
            position: absolute;
            right: 10px;
            bottom: 140px;
            color: white;
            list-style: none;
            z-index: 100;
            li {
                display: block;
                line-height:50px;
                font-size:1.25rem;
            }
            i:before {
                margin-left: 5px;
                font-size:1.25rem;
            }
        }
        .avatar img {
            width: 30px;
            height: 30px;
            border-radius: 100%;
        }
        .submit-btn2 {
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            color: white;
            display: inline-block;
            margin: 0 auto;
            padding: 10px 20px;
            width: 20%;
            float:right;
            text-align: center;
            position: absolute;
            border-radius:30px;
            border:none;
            left: 75%;
            // transform: translatex(-50%);
        }
        .comment-container {
            height: 390px;
            overflow-y: scroll;
        }
        .reply {
            background: #eee;
            color: #666;
            display: inline-block;
            margin: 0 auto;
            padding: 10px 20px;
            width: 66%;
            line-height:16px;
            float:left;
            text-align: left;
            position: absolute;
            border-radius:30px;
            border: 1px #ddd solid;
            left: 5%;
            // transform: translatex(-50%);
        }
        .sticky-footer2 {
            width:100%;
            background:white;
            height:60px;
            padding: 12px 0 5px;
            text-align: center;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #ccc;
            z-index: 2;
            position: absolute;
        }
        .video-commend {
            position: absolute;
            width: 100Vw;
            height: 500px;
            bottom: -500px;
            right: 0;
            background: white;
            z-index: 101;
            overflow-y: auto;
            display: none;
            &.active {
                bottom: 0;
                display: block;
            }
            .title {
                padding: 10px 0;
            }
            .name {
                margin:3px 0 5px;
                color:#333333;
                width:100%;
            }
            .comnent {
                width:100%;
                height:auto;
                border:#efefef 1px solid;
            }
            .thumbnail {
                width: 50px;
                height: 50px;
                
                border-radius: 100%;
                margin: 0 10px;
            }
            .region img{
                width: 20px;
                height: 20px;
                border-radius: 100%;
                float:left;
                background:#ddd;
            }
            .user {
                display: flex;
                    margin:8px 0;
                // margin-bottom: 20px;
            } 
        }
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
        }
    }
    .play-btn {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        width: 300px;
        height: 300px;
        opacity: 0;
        z-index: 99;
        &.prepared {
            opacity: 1;
        }
        &.prepared:after {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 50px 0 50px 100px;
            border-color: transparent transparent transparent #efefef;
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .video-js {
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
        @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

</style>
<script>
import videojs from 'video.js';

import '@/utils/mixins';
import Hls from 'hls.js'
import social from '../pages/share/social'
import EventBus from '../pages/share/event-bus';
export default {
    name: "VideoPlayer",
    props: {
        videoData: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    data() {
        return {
            options: {
                autoplay: true,
                controls: true,
                sources: [
                    {
                        src:"",
                        type: "video/mp4"
                    }
                ]
            },
            review: "",
            videoComment: null,
            player: null,
            video: null,
            isPlay: false,
            isUserLogin: false,
            playedNum: 0,
            videoLimit: 1,
            guestNum: 1,
            videoShowComment: false,
            showReply: false,        
            videoLimit: this.getCookie('video_num')? this.getCookie('video_num') : 10,
            guestNum: this.getCookie('guest_num')? this.getCookie('guest_num') : 5,
            isTrigger: false
        }
    },
    beforeMount() {
        if(this.videoData.index !=1) {
            this.options.autoplay = false
        }
        // this.options.sources = this.videoData.url
    },
    created() {
        this.likeButton = social.likeButton.bind(this)
        this.dislikeButton = social.dislikeButton.bind(this)
        this.goDetail = social.goDetail.bind(this)
    },
    mounted() {
        console.log(this.videoData.index)
        if(this.videoData.index == 0) {
            if(this.videoData.data.ts && this.isTrigger == false) {
                this.isTrigger = true
                var video = document.getElementById(this.videoData.index);
                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                    video.autoplay = true;
                }
                if(Hls.isSupported()) {
                        const config = {
                        manifestLoadingMaxRetry: 10,
                        manifestLoadingRetryDelay: 5000,
                        manifestLoadingMaxRetryTimeout : 50000,
                        };
                        var hls = new Hls(config);
                        hls.loadSource(this.videoData.data.ts);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        });
                }
                // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
                // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
                // This is using the built-in support of the plain video element, without using hls.js.
                else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = this.videoData.data.ts;
                    video.addEventListener('canplay',function() {
                    // video.play();
                    });
                }
                video.addEventListener("loadstart", function() {

                })

                video.addEventListener("loadeddata", function (e) {
                    let spin = e.target.parentNode.children[0]
                    let playBtn = e.target.parentNode.children[1] 
                    spin.classList.add('hide')
                    playBtn.classList.add('prepared')
                    // console.log(e.target.parentNode)
                    // console.log("Video has started loading successfully!");
                });
            }
            this.loadVideoComment()
        }
        EventBus.$on('video'+parseInt(this.videoData.index), function (data) {
            if(this.videoData.data.ts && this.isTrigger == false) {
                this.isTrigger = true
                var video = document.getElementById(this.videoData.index);
                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                    video.autoplay = true;
                }
                if(Hls.isSupported()) {
                        const config = {
                        manifestLoadingMaxRetry: 10,
                        manifestLoadingRetryDelay: 5000,
                        manifestLoadingMaxRetryTimeout : 50000,
                        };
                        var hls = new Hls(config);
                        hls.loadSource(this.videoData.data.ts);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        });
                }
                // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
                // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
                // This is using the built-in support of the plain video element, without using hls.js.
                else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = this.videoData.data.ts;
                    video.addEventListener('canplay',function() {
                    // video.play();
                    });
                }
                video.addEventListener("loadstart", function() {

                })

                video.addEventListener("loadeddata", function (e) {
                    let spin = e.target.parentNode.children[0]
                    let playBtn = e.target.parentNode.children[1] 
                    spin.classList.add('hide')
                    playBtn.classList.add('prepared')
                    // console.log(e.target.parentNode)
                    // console.log("Video has started loading successfully!");
                });
            }
            this.loadVideoComment()
        }.bind(this));

        if(this.$store.getters.getIsLogin) {
            this.isUserLogin = true
        }
    },
    methods: {
        loadVideo() {

        },
        playVideo(index, e, video_id, fee) {
            //  not login
            let targetVideo = document.getElementById(index)
            let canplay = this.playPapa(video_id)
            if(!this.isUserLogin) {
                    if(this.guestNum > 0) {
                        if(!this.isPlay) {
                            targetVideo.play();
                            this.isPlay = true
                            this.guestNum = this.guestNum -1
                            this.setCookie("guest_num", this.guestNum, 1)
                            e.target.classList.remove('prepared')
                        }
                        else {
                            targetVideo.pause();
                            this.isPlay = false
                            e.target.classList.add('prepared')
                        }
                    }
                    else {
                        this.$alert("請登入看更多影片", false, false, {confirmButtonText: '确定'})
                        .then(() => {
                            this.$router.push('/login')
                        })
                    }
            }
            // login
            else {
                if(this.videoLimit > 0) {
                        if(!this.isPlay) {
                            targetVideo.play();
                            this.isPlay = true
                            if(this.can_play!= 1) {
                                this.videoLimit = this.videoLimit -1
                                this.setCookie("video_num", this.videoLimit, 1)
                            }
                            e.target.classList.remove('prepared')
                        }
                        else {
                            targetVideo.pause();
                            this.isPlay = false
                            e.target.classList.add('prepared')
                        }
                    }
                    else {
                        if(this.can_play ==1) {
                            targetVideo.play();
                            this.isPlay = true
                            e.target.classList.remove('prepared')
                        }
                        else {
                            this.$confirm("本日观看次数已经没了,是否付 "+fee + "BABY观看", false, false, {confirmButtonText: '购买', cancelButtonText: '再看看'})
                            .then(() => {
                                this.payPapa(targetVideo)
                            })
                        }
                    }
            }
            
        },
        async playPapa(id) {
                let data = {
                    id: id,
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'papa/play', formData)
                    .then((res) => {
                        return res.data.data.can_play
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
        },
        async payPapa(video) {
                let data = {
                    id: id,
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'papa/pay', formData)
                    .then((res) => {
                            if(res.data.status == 1) {
                                video.play()
                            }
                            else {
                                this.$alert("您的餘額不足 請充值後再購買", false, false, {confirmButtonText: '确定'})
                                 this.$router.push('/deposit')
                            }
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
        },
        handleCardClick(targetId) {
            this.$router.push({ path: `/my/${targetId}` })
        },
        setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        },
        getCookie(c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
        },
        async loadVideoComment() {
            let encryptData = await this.encrypt({tid: this.videoData.data.id, module: 2, page_size: 100,page_no:1})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'blog/review', formData)
                .then((res) => {
                    this.videoComment = res.data.data
                    // console.log("我看看",res.data.data)
                    // this.hotTopics.push(res.data.data)
                    // if (typeof res.data.data == 'undefined' || res.data.data.length == 0) {
                    //     // the array is defined and has at least one element
                    //     this.searchEnd = true
                    // }
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
        },
        openVideoComment() {
            console.log("open")
            this.videoShowComment = true
            this.$emit("disableswiper")
        },
        closeVideoComment() {
            console.log("close")
            this.videoShowComment = false
            this.$emit("enableswiper")
        },
        async reviewSubmit(tid) {
            let encryptData = await this.encrypt({"tid":tid,"review":this.review, module: 2},1)
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'blog/review_write', formData)
                .then((res) => {
                    if(res.data.status == 1) {
                        this.loadVideoComment()
                        this.videoData.data.review_num++ 
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
            },
        async clickReply(revid) {
            // this.showReply = true
            // let tid = this.$store.getters.getUid
            // let encryptData = await this.encrypt({"tid":tid,"revid": revid,"page_size ":99, module: 2},1)
            // let formData = new FormData();
            // formData.append("data", encryptData);
            // this.$axios.post(process.env.BASE_URL+'blog/reply', formData)
            //     .then((res) => {
            //         if(res.data.status == 1) {
            //             this.loadVideoComment()
            //             this.videoData.data.review_num++ 
            //         }
            //     })
            //     .catch((err) => {
            //         console.log("get encrypt error")
            //     }) 
        }
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>