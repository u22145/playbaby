<template>
    <div class="withdraw-history my-outer">
        <div class="radius-header"><back/><div class="align-center">历史提现纪录</div></div>
        <div class="my-container">
            <div class="detail" v-for="(item, index) of history" :key="index">
                <div><span class="left addr">提币地址 : {{item.to_addr}}</span><span class="right">{{item.status}}</span></div>
                <div><span>手续费 : </span>{{item.fee}}</div>
                <div><span class="left">结余提币数量 :{{item.net_amount}} </span><span class="right">{{item.uptime}}</span></div>
            </div>
        </div>
    </div>
</template>
<script>
    
    import '@/utils/mixins';
export default {
    data() {
        return {
            history: null
        }
    },
    mounted() {
        this.getWithdrawHistory()
    },
    methods: {
            async getWithdrawHistory() {
                    let data = {type: 2, page_size: 10, page_no: 1}
                    let encryptData = await this.encrypt(data)
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    let countryList = this.$axios.post(process.env.BASE_URL+'baby/withdraw_log', formData)
                    .then((res) => {
                            this.history = res.data.data
                        })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
            }
    }
}
</script>
<style lang="scss">
.withdraw-history {
    .detail {
        border-bottom: 1px solid #efefef;
        padding: 10px 30px 10px 30px;
        margin-bottom: 10px;
        overflow: hidden;
        > div {
            overflow: hidden;
        }
        .addr {
            max-width: 250px;
        }
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
}
</style>