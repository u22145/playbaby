<template>
    <div class="stream-card" @click="openLiveChanel">
        <div class="cover-img" :style="{ backgroundImage: `url(${pic})` }"></div>
        <div class="detail"><div class="title">{{nickname}}</div> <div class="viewer">{{hot}}</div></div>
        
    </div>
</template>

<style lang="scss">
    .stream-card {
        width: 47%;
        float: left;
        display: inline-block;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
        margin: 5px ;
        .cover-img {
            height: 150px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }
        .detail {
            overflow: hidden;
            position: relative;
            margin-top:-26px;
            width:100%;
            padding:0 2%;
            line-height:26px;
            background: linear-gradient(0deg, rgba(100, 57, 134, 1) 0%, rgba(232, 63, 111, 0.5) 50%,rgba(232, 63, 111, 0) 100%);;
            color:#fff;
            .title {
                float: left;
            }
            .viewer {
                float:right;
            }
        }
    }
</style>
<script>

import '@/utils/mixins';
import Streaming from '../pages/streaming-client';
export default {
    data() {
        return {
            room_id: this.item.room_id,
            uid: this.item.uid,
            nickname: this.item.nickname,
            avatar: this.item.avatar,
            pic: this.item.pic,
            country_flag: this.item.country_flag,
            hot: this.item.hot
        }
    },
    methods: {
        async openLiveChanel() {
            if(this.$store.state.isLogin) {
                let data = {
                    room_id: this.room_id
                }
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'live/view_show', formData)
                    .then((res) => {
                            this.$parent.$emit("openLiveStream", {streamData: res.data.data})
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            }
            else {
                this.$alert("登陆才能观看直播喔", false, false, {confirmButtonText: '确定'})

            }
        }
    },
    props: ['item'],
    mounted() {
    },
}
</script>