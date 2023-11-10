<template>
    <div class="rank-list">
        <div class="top3" >
            <div v-if="index <= 2" class="cool" v-for="(item, index) in rankingList" :key="index">
                <div style="width:100%;display:block;margin:auto">
                    <span style="color:#fff;line-height:30px;font-weight:600;padding:4px;border-radius:10px;border:#fff 1px solid">No.{{index +1}}</span>
                    <div class="avatar"><img :src="item.avatar" alt="" @error="handleAvatarError($event,item.gender)"></div>
                    <div class="nickname">{{item.nickname}}</div>
                    <div class="amount">{{item.amount}}</div>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
        <div v-if="index >=3" class="other" v-for="(item, index) in rankingList" :key="index">
            <div >
                <div style="float:left;margin:0 10px">No.{{index +1}} </div>
                <div class="avatar" style="float:left;display:block;height:60px"><img :src="item.avatar" alt="" @error="handleAvatarError($event,item.gender)"></div>
                <div class="nickname" style="float:left;padding-left:10px">{{item.nickname}}</div>
                <div class="amount" style="float:right">{{item.amount}}</div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

    .rank-list {
        padding-top: 100px;
        height:100vh;
        width:100%;
        text-align: center;
        background: linear-gradient(to bottom, #ffbd16 0%, rgb(255, 132, 17) 70%);
        .avatar {
            margin:auto;
            img {
                width: 60px;
                height: 60px;
                margin:auto;
                max-width: 100%;
                border-radius: 100%;
            }
        }
        .top3 {
            display: flex;
            width:100%;
            height:240px;
            .nickname {
                color:#fff;
                line-height:30px;
            }
            .amount {
                color:#fff;
                padding:2px 6px;
                margin:0 10px;
                border-radius:10px;
                background:rgba(170, 125, 0, 0.4);
            }
            .cool {
                width:33%;
                // background:rgba(255,255,255,0.4);
                margin:0 4px;
            }
            .cool:nth-child(1) {
                // float:left;
                left:33%;
                position: absolute;
                // background:rgb(255, 238, 0);
                .avatar {
                    margin:auto;
                    background: linear-gradient( 130deg, rgb(255, 170, 12) 0%, rgb(221, 215, 205) 50%, rgb(255, 179, 38) 100%);
                    border-radius: 50%;
                    padding: 10px;
                    width:120px;
                    border:rgb(207, 160, 59) 2px solid;
                    img {
                        width: 100px;
                        height: 100px;
                        // border:8px rgb(255, 213, 75) solid;
                        margin:auto;
                        max-width: 100%;
                        border-radius: 100%;
                    }
                }
            }
            .cool:nth-child(2) {
                // float:left;
                left:0;
                padding:20px 0;
                position: absolute;
                // background:red;
                .avatar {
                    margin:auto;
                    background: linear-gradient( 130deg, rgb(100, 100, 100) 0%, rgb(221, 215, 205) 50%, rgb(156, 156, 156) 100%);
                    border-radius: 50%;
                    padding: 8px;
                    width:106px;
                    border:rgb(163, 163, 163) 2px solid;
                    img {
                        width: 90px;
                        height: 90px;
                        margin:auto;
                        max-width: 100%;
                        border-radius: 100%;
                    }
                }
            }
            .cool:nth-child(3) {
                // float:right;
                // margin:auto;
                padding:20px 0;
                right:0;
                position: absolute;
                .avatar {
                    margin:auto;
                    background: linear-gradient( 130deg, rgb(68, 53, 40) 0%, rgb(221, 215, 205) 50%, rgb(150, 126, 106) 100%);
                    border-radius: 50%;
                    padding: 8px;
                    width:106px;
                    border:rgb(145, 127, 108) 2px solid;

                    img {
                        width: 90px;
                        height: 90px;
                        margin:auto;
                        max-width: 100%;
                        border-radius: 100%;
                    }
                }
                // background:rgb(168, 119, 119);
            }
        }
        .other {
            width: calc(100%-20px);
            background:linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
            border-radius:5px;
            margin:0 10px 5px 10px;
            color:#666;
            line-height: 60px;
            padding: 6px 10px;
        }
    }
</style>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            rankingList: null
        }
    },
    mounted() {
        this.getRankList()
    },
    methods: {
        async getRankList() {
            let encryptData = await this.encrypt({type: 1, period: 2, num: 10})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'live/ranking', formData)
                .then((res) => {
                        this.rankingList = res.data.data
                            console.log("排行榜",res);

                    })
                    .catch((err) => {
                        console.log("get encrypt error")
            })
        },
        filteredList(from, end) {
            return this.rankingList.slice(0, 3);
        },
        handleAvatarError(e,f) {
            e.target.setAttribute("src", f+".png")
            // e.target.setAttribute("src", "avatar.jpg")
        },
    }
}
</script>