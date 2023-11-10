<template>
    <div class="withdraw my-outer">
        <div class="radius-header"><back/><div class="align-center">提幣</div></div>
        <div class="my-container">
            <div class="title-container">
                <div class="left">BABY</div>
                <div class="right"><nuxt-link to="/withdraw-history">历史提现纪录</nuxt-link></div>
            </div>
            <div class="content-field">
                <label for="address">提币地址</label>
                <input type="text" v-model="coinAddress">
            </div>
            <div class="content-field">
                <div>数量</div>
                <input type="number" v-model="transferAmount">
                <div class="all-btn" @click="transferAll">全額</div>
                <div>可用 : {{this.amountLeft}}</div>
            </div>
            <div class="content-field">
                手續費 <span>{{withdrawPrepareList.fee_rate}} BABY</span>
            </div>
            <div class="content-field">
                到帳數量<span>{{(this.transferAmount - this.fee) > 0 ? (this.transferAmount - this.fee) : 0}}</span>
            </div>
            <div class="submit-btn btn" @click="withdraw">提币</div>
        </div>
    </div>
</template>
<script>
    
    import '@/utils/mixins';
export default {
    data() {
        return {
            coinAddress: "",
            amountLeft: 0,
            transferAmount: 0,
            fee: 10,
            withdrawPrepareList: {
                fee_rate: 0,
                baby_balance: 0
            }
        }
    },
    beforeMount() {
    },
    methods: {
      transferAll() {
          this.transferAmount = this.amountLeft
      },
      async withdraw() {
            let data = {
                coin: 'eurc',
                addr: this.coinAddress,
                amount: this.transferAmount
            }
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            let countryList = this.$axios.post(process.env.BASE_URL+'baby/withdraw', formData)
            .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log("get encrypt error")
            })
      },
      async withdrawPrepare() {
            let data = {}
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            let countryList = this.$axios.post(process.env.BASE_URL+'baby/withdraw_prepare', formData)
            .then((res) => {
                    this.withdrawPrepareList = res.data.data
                    this.coinAddress = this.withdrawPrepareList.default_withdraw_addr
                    this.amountLeft = this.withdrawPrepareList.baby_balance
                })
                .catch((err) => {
                    console.log("get encrypt error")
            })
      }
    },
    mounted() {
        this.withdrawPrepare()
    }
}
</script>
<style lang="scss">
    .withdraw {
       .title-container {
           overflow: hidden;
           .left {
               float: left;
           }
           .right {
               float: right;
           }
       }
       input {
           width: 100%;
           border-width: 0 0 2px 0;
       }
       .my-container {
           padding: 15px;
       }
       .content-field {
           margin-bottom: 15px;
           position: relative;
       }
       .all-btn {
            position: absolute;
            right: 10px;
            bottom: 27px;
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            color: #efefef;
            border-radius: 10px;
            padding: 5px 15px;
            font-size: 10px;
       } 
    }
</style>