<template>
    <div class="stream-container">
        <LiveHeader @changeStreamList="changeStream" />
        <div class="stream-home" style="padding-top:36px">
            <div class="banner">
                <!-- <div class="cover-img"></div> -->
                <img :src="bannerList.pic" alt="">
            </div>
            <div class="ranking" @click="directRankingPage">
                <!-- <div>1. {{rankingList ?  rankingList[0].nickname : ""}}</div>
                <div>2. {{rankingList ?  rankingList[1].nickname : ""}}</div>
                <div>3. {{rankingList ?  rankingList[2].nickname : ""}}</div> -->
                <div class="rank-title">
                    <img src="" alt="">
                    <div>
                        <div>排行榜</div>
                        <div class="yellow-text">主播榜/富豪榜</div>
                    </div>
                </div>
                <div class="rank-person">
                    <img v-for="(item, index) in rankingList" :key="index" :src="item.avatar" @error="handleAvatarError($event,item.gender)"/>
                </div>
            </div>
        </div>
        <div class="stream-host-container">
            <!-- <div class="stream-type-list">
                <div @click="getLiveData(0)">热门</div>
                <div @click="getLiveData(1)">关注</div>
            </div> -->
            <StreamCard v-for="streamData in streamDatas"  v-bind:item="streamData" :key="streamData.id"></StreamCard>  
        </div>
    </div>
</template>

<style lang="scss">
    .stream-container {
        margin-top:50px;
        .stream-type-list {
            padding: 20px;
            > div {
                display: inline-block;
                padding: 10px 20px;
            }
        }
    }
    .banner {
        position: relative;
        width:100%;
        height: 155px;
        background-image: url('/img-loading.jpg');
        background-size: cover;
        background-position: 50% 50%;
        img {
            width:100%;
            height:155px;
        }
        .cover-img {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-image: url('/img-loading.jpg');
            background-size: cover;
            background-position: 50% 50%;
            z-index: -1;
        }
    }
    .rank-title {
        width: 150px;
        float: left;
        > div {
            display: inline-block;
        }
    }
    .rank-person {
        float: right;
        padding: 15px;
        img {
            width: 30px;
            height: 30px;
            border-radius: 100%;
            margin: 0 5px;
        }
    }
    .stream-home {
        overflow: hidden;
    }
    .yellow-text {
        color: #dda404;
    }
    .stream-host-container {
        padding: 5px;
    }
    .ranking {
        overflow: hidden;
    }
</style>
<script>

import '@/utils/mixins';
import streaming from './streaming-client';
export default {
    data() {
        return {
            streamDatas: null,
            bannerList: {pic: null},
            rankingList: null,
            type: Number
        }
    },
    methods: {
        async getBanner() {
            let encryptData = await this.encrypt({"type":1 },0)
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'other/banner_list', formData)
                .then((res) => {
                    console.log("BANNER",res.data.data)
                    this.bannerList = res.data.data[0];
                    // this.hotTopics ={},
                    // this.getHotList();
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        async getLiveData(type) {
            if(this.type != type) {
                let data = {
                    type: type,
                    appid: 1,
                    page_size: 500
                }
                this.type = type
                let encryptData = await this.encrypt(data)
                let formData = new FormData();
                formData.append("data", encryptData)
                 let countryList = this.$axios.post(process.env.BASE_URL+'live/index', formData)
                    .then((res) => {
                            this.streamDatas = res.data.data
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
            }
        },
        async getLiveRanking() {
            let encryptData = await this.encrypt({type: 1, period: 1, num: 3})
            let formData = new FormData();
            formData.append("data", encryptData)
            let countryList = this.$axios.post(process.env.BASE_URL+'live/ranking', formData)
                .then((res) => {
                        this.rankingList = res.data.data
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
            },
            handleAvatarError(e,f) {
                e.target.setAttribute("src", f+".png")
                // e.target.setAttribute("src", "avatar.jpg")
            },
            changeStream(menu) {
                if(menu == 'hot') {
                    this.getLiveData(0);            
                }
                else {
                    this.getLiveData(1);
                }
            },
            directRankingPage() {
                this.$router.push('/ranking')
            }
    },
    mounted() {
        this.getBanner();
        this.getLiveData(0);
        this.getLiveRanking();
        this.$store.commit("setIsHeaderShow", true)
    },
    computed: {
        
    }
}
</script>