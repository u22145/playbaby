<template>
    <div class="earn my-outer">
        <div class="radius-header"><back/><div class="align-center">收益明细</div></div>
        <div class="my-container align-center">
            <div class="title align-center">会员收益</div>
            <div class="total">
                <div>会员总收益</div>
                <div>{{earnVip.total}} BABY</div>
            </div>
            <div class="detail">
                <div class="left">
                    <div>邀请的用户</div>
                </div>
                <div class="right">
                    <div>会员收益</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            earnDetail: null,
            earnVip: {
                data: [],
                total: 0
            }
        }
    },
    mounted() {
        this.getEarnDetail()
        this.getEarnVip()
    },
    methods: {
        async getEarnDetail() {
            let encryptData = await this.encrypt({page_size: 500, page_no:1})
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
        async getEarnVip() {
            let encryptData = await this.encrypt({page_size: 500, page_no:1, year:2020})
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'earn/vip', formData)
                .then((res) => {
                        this.earnVip = res.data.data
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        }
    }
}
</script>
<style lang="scss">
    .earn {
        .title {
            padding: 20px 0 5px 0;
            border-bottom: 3px solid #000;
            display: inline-block;
        }
        .total {
            padding-top: 20px;
        }
        .my-container {
            background: white;
        }
        .detail {
            overflow: hidden;
            .left {
                float: left;
            }
            .right {
                float: right;
            }
        }
        .detail {
            padding: 30px;
        }
    }
</style>