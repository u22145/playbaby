<template>
    <div class="invite my-outer">
        <div class="radius-header"><back/><div class="align-center">邀請好友</div></div>
        <div class="my-container">
                <div class="card">
                    <div>
                        <div>资产收益</div>
                        <div  class="data">{{earnMoneyData.amount}} BABY</div>
                    </div>
                    <div>
                        <div>邀请人数</div>
                        <div  class="data">{{earnMoneyData.num}} 人</div>
                    </div>
                    <div class="rule" @click="directLink('/rule')">活动规则</div>
                    <div class="go-earn" @click="directLink('/earn')"><i class="arrow right"></i></div>
                </div>
                <div class="sibling">
                     <h3 class="align-center sub-title">直屬下級</h3>
                     <div class="sibling-container">
                         <div v-if="earnDetail.length < 1" class="align-center">沒有任何直屬下級 </div>
                         <div v-if="earnDetail.length >1"  v-for="(item, index) in earnDetail " :key="index">
                             
                         </div>
                     </div>
                     <div class="btn" @click="directLink('/invite')">邀请好友</div>
                </div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            earnMoneyData: {
                amount: 0,
                num: 0
            },
            earnDetail: []
        }
    },
    mounted() {
        this.$store.commit("setIsHeaderShow", true)
        this.$store.commit("setIsFooterShow", true)
        // this.$store.commit("setIsHeaderShow", false)
        this.getEarnMoneyData()
        this.getEarnMoneyDetail()
    },
    methods: {
        async getEarnMoneyData() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'earn/rank', formData)
                .then((res) => {
                        this.earnMoneyData = res.data.data
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        async getEarnMoneyDetail() {
            let encryptData = await this.encrypt({page_size: 10, page_no: 1})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'earn/detail', formData)
                .then((res) => {
                        this.earnDetail = res.data.data
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        directLink(link) {
            this.$router.push(link)
        }
    }
}
</script>
<style lang="scss">
    .invite {
        .btn {
            display: block;
            margin: 20px auto 0;
        }
        .go-earn {
            position: absolute;
            top: 50%;
            right: 15px;
            margin-top: -20px;
        }
        .card {
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            margin: 0 10px;
            padding: 15px 30px 60px;
            color: #efefef;
            display: flex;
            justify-content: space-around;
            text-align: center;
            position: relative;
            .data {
                margin-top: 15px;
            }
            .rule {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 12px;
            }
        }
        .share {    
            padding: 20px 0;
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        }
        .sub-title {
            margin-top: 10px;
        }
        .sibling {
            padding: 10px;
        }
        .sibling-container {
            overflow: hidden;
            .left {
                float: left;
                display: flex;
            }
            .right {
                float: right;
            }
        }
    }
</style>