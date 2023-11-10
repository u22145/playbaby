

import '@/utils/mixins';
import SVGA from "svgaplayerweb";
// import axiosRetry from 'axios-retry';

// axiosRetry(axios, { retries: 3 });
export default {
    async getRTCToken(data)  {
        //  type anchor and audience
        // EX data anchor {room_id: this.room_id, type: 'anchor'} --- HOST
        // {room_id: this.room_id, type: 'audience', chkUser: 0} for guest user
        // {room_id: this.room_id, type: 'audience'}  ---- login client
        let encryptData = await this.encrypt(data.data)
        let formData = new FormData();
        this.role = data.role
        formData.append("data", encryptData)
        this.$axios.post(process.env.BASE_URL+'my/get_rtc_token', formData)
            .then((res) => {
                    this.option.token = res.data.data.rtc_token
                    if(data.role == "audience") {
                        this.option.uid = res.data.data.uid
                        this.join(this.rtc, this.option)
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
            })
    },
    // EX data {room_id: this.room_id}
    async getRTMToken(data) {
        let encryptData = await this.encrypt(data.data)
        let formData = new FormData();
        formData.append("data", encryptData)
        this.$axios.post(process.env.BASE_URL+'my/get_rtm_token', formData)
            .then((res) => {
                    this.RTMToken = res.data.data.rtm_token
                    if(this.role == "anchor") {
                        this.loginRTM()
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
            })
    },
    getrtcError() {
        this.rtc.client.on("error", (err) => {
            console.log(err)
          })
    },
    createRTMClient() {
        this.client = AgoraRTM.createInstance(this.option.appID);
    },
    setMessageFormat(message="", type, pm_id='', uid='', nickname = '', avatar='', level='') {
        let postMessage = {
            msg_content: {
                text: message
            },
            pm_id: pm_id,
            to: { uid:'', nickname: '', avatar: '' },
            type: type,
            send_time: 0,
            from: {
                isBroadcaster: false,
                level: level,
                uid: uid,
                nickname: nickname,
                isAdmin: false,
                avatar: avatar
            }
        }
        return JSON.stringify(postMessage)
    },
    loginRTM() {
        this.client.login({ token: this.RTMToken, uid: this.option.uid.toString() }).then(() => {
        this.createRTMChanel()
        this.sendRTMChannelMessage(
            this.setMessageFormat("正在连接聊天室......", 14)
        )
        }).catch(err => {
            // this.handleAuthError()
            this.sendRTMChannelMessage(
                this.setMessageFormat("连接聊天室失败", 14)
            )
            console.log('AgoraRTM client login failure', err);
        });
    },
    createRTMChanel() {
        this.channel = this.client.createChannel(this.option.channel.toString());
        this.joinRTMChanel()
    },
    joinRTMChanel() {
        this.channel.join().then(() => {
        /* 加入频道成功的处理逻辑 */
        
        this.sendRTMChannelMessage(
            this.setMessageFormat("连接聊天室成功", 14,'','',this.nickname, '', this.level)
        )
        console.log('join chanel success')
        if(this.role == 'anchor') {
            this.join(this.rtc, this.option);
        }
        this.listenRTMChannelMessage()
        }).catch(error => {
        /* 加入频道失败的处理逻辑 */
        this.sendRTMChannelMessage(
            this.setMessageFormat("连接聊天室失败", 14)
        )
        console.log('join chanel error')
        });
    },
    sendRTMChannelMessage(message) {
        this.channel.sendMessage({ text: message }).then(() => {
        /* 频道消息发送成功的处理逻辑 */
        let data = JSON.parse(message);
        if(data.type ==2) {
            let level = data.from.level
            let levelText = ""
            if(level > 10) {
                levelText = "<span class='purple-level'>"+ level +"</span>"
            }
            else {
                levelText = "<span class='orange-level'>"+ level +"</span>"
            }
            this.message += "<div>"+levelText+"<span>" + data.from.nickname + " : " + data.msg_content.text + "</div>"
        }
        // system message
        if(data.type ==14) {
            this.message += "<div><span>系統: " + data.msg_content.text + "</div>"
        }
        console.log('send message success')
        }).catch(error => {
        /* 频道消息发送失败的处理逻辑 */
        console.log('send message failed')
        });
    },
    listenRTMChannelMessage() {
        this.channel.on('ChannelMessage', ({ text }, senderId) => { // text 为收到的频道消息文本，senderId 为发送方的 User ID
        /* 收到频道消息的处理逻辑 */
        let data = JSON.parse(text);
            // message from other user
            if(data.type ==2) {
                let level = data.from.level
                let levelText = ""
                if(level > 10) {
                    levelText = "<span class='purple-level'>"+ level +"</span>"
                }
                else {
                    levelText = "<span class='orange-level'>"+ level +"</span>"
                }
                this.message += "<div>"+levelText+"<span>" + data.from.nickname + " : " + data.msg_content.text + "</div>"
            }
            // send gift
            if(data.type == 6) {
               this.playSVGA(data.msg_content.text.effect)
               let text = data.from.nickname + " 送 " + data.msg_content.text.name + data.msg_content.text.num + ' 个';
               this.showGiftSender(text)
            }
            // message from someone login
            if(data.type == 14) {
                let level = data.from.level
                let levelText = ""
                if(level > 10) {
                    levelText = "<span class='purple-level'>"+ level +"</span>"
                }
                else {
                    levelText = "<span class='orange-level'>"+ level +"</span>"
                }
                this.message += "<div><span class='red-background'>Hi</span>" + levelText +"<span>" + data.from.nickname  + data.msg_content.text + "</div>"
            }
        });
    },
    playSVGA(svga) {
        var player = new SVGA.Player("#svga");
        var parser = new SVGA.Parser("#svga");
        let url = "https://test-api.playbabies.net/static/animation/" +svga+".svga"
        console.log(url)
       parser.load(url, function(videoItem) {
            player.setVideoItem(videoItem);
            if(document.getElementById("svga").classList.contains('hide')) {
                document.getElementById("svga").classList.remove("hide")
            }
            player.startAnimation();
            setTimeout(() => {
                player.pauseAnimation()
                document.getElementById("svga").classList += " hide"
            }, 2000)
        });
    },
    async endView(id) {
        if(document.querySelector('#remote_video_panel_'+id).length > 0) {
            document.querySelector('#remote_video_panel_'+id).remove();
        }
        let encryptData = await this.encrypt({room_id: this.option.channel})
        let formData = new FormData();
        formData.append("data", encryptData)
        this.$axios.post(process.env.BASE_URL+'live/end_view', formData)
            .then((res) => {
                    if(res.data.status == 0) {
                        this.$router.push('/')
                    }
                    if(res.data.status == 1) {
                        console.log(this)
                        this.isEndView = true
                        this.endViewData = res.data.data
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
            })
    },
    showGiftSender(text) {
        let popup = document.getElementById("send-gift-popup")
        popup.innerText = text
        popup.classList+= ' show'
        setTimeout(() => {
            popup.classList.remove("show")
        },2000)
    },
    join(rtc, option){
        if (rtc.joined) {
            return;
        }

        /**
         * A class defining the properties of the config parameter in the createClient method.
         * Note:
         *    Ensure that you do not leave mode and codec as empty.
         *    Ensure that you set these properties before calling Client.join.
         *  You could find more detail here. https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html
         **/
        rtc.client = AgoraRTC.createClient({mode: option.mode, codec: option.codec})

        rtc.params = option

        // handle AgoraRTC client event
        this.handleEvents(rtc)
        if(this.role == "audience") {
            rtc.client.setClientRole("audience");
        }
        else {
            rtc.client.setClientRole("host");
        }
        if(AgoraRTS.checkSystemRequirements()) {
            AgoraRTS.init(AgoraRTC, {
                // 设置 SDK 文件夹中的解码库文件的线上访问地址。
                // SDK 会根据这里填写的路径来动态请求相应的解码库文件。
                wasmDecoderPath: "AgoraRTS.wasm",
                asmDecoderPath: "AgoraRTS.asm",
                // 保证流畅度，拉大延迟到 5s
                bufferDelay: 5000,
              });
            AgoraRTS.proxy(this.rtc.client);
        }
        // init client
        rtc.client.init(option.appID, function () {
            console.log("init success")

            /**
             * Joins an AgoraRTC Channel
             * This method joins an AgoraRTC channel.
             * Parameters
             * tokenOrKey: string | null
             *    Low security requirements: Pass null as the parameter value.
             *    High security requirements: Pass the string of the Token or Channel Key as the parameter value. See Use Security Keys for details.
             *  channel: string
             *    A string that provides a unique channel name for the Agora session. The length must be within 64 bytes. Supported character scopes:
             *    26 lowercase English letters a-z
             *    26 uppercase English letters A-Z
             *    10 numbers 0-9
             *    Space
             *    "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
             *  uid: number | null
             *    The user ID, an integer. Ensure this ID is unique. If you set the uid to null, the server assigns one and returns it in the onSuccess callback.
             *   Note:
             *      All users in the same channel should have the same type (number or string) of uid.
             *      If you use a number as the user ID, it should be a 32-bit unsigned integer with a value ranging from 0 to (232-1).
            **/
            rtc.client.join(option.token ? option.token : null, option.channel.toString(), option.uid ? +parseInt(option.uid) : null, function (uid) {
            console.log("join channel: " + option.channel + " success, uid: " + uid)
            rtc.joined = true

            rtc.params.uid = uid

            if(this.role == "audience") {
                this.createRTMClient()
                this.loginRTM()
            }
            if(this.role == "anchor") {
                // create local stream
                rtc.localStream = AgoraRTC.createStream({
                    streamID: rtc.params.uid,
                    audio: true,
                    video: true,
                    screen: false,
                    microphoneId: option.microphoneId,
                    cameraId: option.cameraId
                })
                this.rtc.localStream.setVideoEncoderConfiguration({
                    // 视频分辨率
                    resolution: {
                      width: 640,
                      height: 480
                    },
                    // 视频编码帧率。通常建议是 15 帧，不超过 30 帧
                    frameRate: {
                      min: 15,
                      max: 30
                    },
                    // 码率。我们建议参考下面的视频属性参考表进行设置
                    bitrate: {
                      min: 1000,
                      max: 5000
                    }
                  });
                // initialize local stream. Callback function executed after intitialization is done
                rtc.localStream.init(function () {
                    console.log("init local stream success")
                    // play stream with html element id "local_stream"
                    rtc.localStream.play("local_stream")

                    // publish local stream
                    this.publish(rtc)
                }.bind(this), function (err)  {
                    console.error("init local stream failed ", err)
                })
            }
            }.bind(this), function(err) {
            console.error("client join failed", err)
            // this.$alert("登录错误 请重新登录")
            // .then(() => {
            //     this.$router.push('/')
            // })
            }.bind(this))
        }.bind(this), (err) => {
            console.error(err)
        })
    },
   publish (rtc) {
    if (!rtc.client) {
        return
    }
    if (rtc.published) {
        return
    }
    var oldState = rtc.published

    // publish localStream
    rtc.client.publish(rtc.localStream, function (err) {
        rtc.published = oldState
        console.log("publish failed")
        console.error(err)
    })
    rtc.published = true
    },
    handleEvents (rtc) {
        // Occurs when an error message is reported and requires error handling.
        rtc.client.on("error", (err) => {
            console.log(err)
        })
        // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
        rtc.client.on("peer-leave", function (evt) {
            var id = evt.uid;
            console.log("id", evt)
            let streams = rtc.remoteStreams.filter(e => id !== e.getId())
            let peerStream = rtc.remoteStreams.find(e => id === e.getId())
            if(peerStream && peerStream.isPlaying()) {
            peerStream.stop()
            }
            rtc.remoteStreams = streams
            if (id !== rtc.params.uid) {
                  if(this.role == 'audience') {
                    this.showCover = true
                    this.hostDisconnect = true
                    let self = this
                    setTimeout(() =>{
                        self.endView(id)
                    }, 3000)
                }
            }
            console.log("peer-leave", id)
        }.bind(this))
        // Occurs when the local stream is published.
        rtc.client.on("stream-published", function (evt) {
            console.log("stream-published")
        })
        // Occurs when the remote stream is added.
        rtc.client.on("stream-added", function (evt) {  
            var remoteStream = evt.stream
            var id = remoteStream.getId()
            if (id !== rtc.params.uid) {
            rtc.client.subscribe(remoteStream, function (err) {
                console.log("stream subscribe failed", err)
            })
            }
            console.log("stream-added remote-uid: ", id)
        })
        // Occurs when a user subscribes to a remote stream.
        rtc.client.on("stream-subscribed", function (evt) {
            var remoteStream = evt.stream
            var id = remoteStream.getId()
            rtc.remoteStreams.push(remoteStream)
            this.addView(id)
            remoteStream.play("remote_video_" + id)
            console.log("stream-subscribed remote-uid: ", id)
        }.bind(this))
        // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
        rtc.client.on("stream-removed", function (evt) {
            var remoteStream = evt.stream
            var id = remoteStream.getId()
            if(remoteStream.isPlaying()) {
            remoteStream.stop()
            }
            rtc.remoteStreams = rtc.remoteStreams.filter(function (stream) {
            return stream.getId() !== id
            })
            removeView(id)
            console.log("stream-removed remote-uid: ", id)
        })
        rtc.client.on("onTokenPrivilegeWillExpire", function(){
            // After requesting a new token
            // rtc.client.renewToken(token);
            console.log("onTokenPrivilegeWillExpire")
        })
        rtc.client.on("onTokenPrivilegeDidExpire", function(){
            // After requesting a new token
            // client.renewToken(token);
            console.log("onTokenPrivilegeDidExpire")
        })
    },
    addView(id, show) {
            if (!document.getElementById(id)) {
                let panel = document.createElement('div');
                panel.id = 'remote_video_panel_' + id;
                panel.classList += "video-view";
            document.getElementById('video').appendChild(panel)
            
            let placeholder = document.createElement('div');
            placeholder.id = "remote_video_" + id;
            placeholder.classList += 'video-placeholder';
            document.getElementById('remote_video_panel_' + id).appendChild(placeholder)

            let removeInfo = document.createElement('div');
            removeInfo.id = "remote_video_info_" + id;
            removeInfo.classList += 'video-profile' 
            document.getElementById("remote_video_panel_" + id).appendChild(removeInfo);

            let autoplay = document.createElement("div")
            autoplay.id = "video_autoplay_" + id;
            autoplay.classList += 'autoplay-fallback hide';
            document.getElementById("remote_video_panel_" + id).appendChild(autoplay);

        }
    },
    async leaveRTC() {
        // Leave the channel
        if(this.rtc && this.rtc.client) {
            this.rtc.client.leave(function () {
            // Stop playing the local stream
            if(this.rtc.localStream) {
                this.rtc.localStream.stop();
                // Close the local stream
                this.rtc.localStream.close();
            }
            // Stop playing the remote streams and remove the views
            if(this.rtc.remoteStreams) {
                while (this.rtc.remoteStreams.length > 0) {
                    var stream = this.rtc.remoteStreams.shift();
                    var id = stream.getId();
                    stream.stop();
                    removeView(id);
                }   
            }
        }.bind(this), function (err) {
            console.error(err);
            })
        }
        if(this.role == "anchor") {
            let encryptData = await this.encrypt({room_id: this.option.channel})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'live/end_show', formData)
                .then((res) => {
                        // if(res.data.status == 1) {
                            this.$store.commit("setIsHeaderShow", true)
                            this.$store.commit("setIsFooterShow", true)
                            this.isEndShow = true
                            this.endShowData = res.data.data
                            clearInterval(this.triggerRefresh)
                            clearInterval(this.triggerHeartBeat)
                            clearInterval(this.intervalScroll)
                            // this.$router.back()
                            // this.$store.commit("setIsVudeoShow", false)
                        // }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        }
        if(this.role == "audience") {
            let encryptData = await this.encrypt({room_id: this.option.channel})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'live/end_view', formData)
                .then((res) => {
                        // if(res.data.status == 1) {
                            this.$store.commit("setIsHeaderShow", true)
                            this.$store.commit("setIsFooterShow", true)
                            this.$router.back()
                            // this.$store.commit("setIsVudeoShow", false)
                        // }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        }
    },
    logoutRTM() {
        this.client.logout();
    },
    
}