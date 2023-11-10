<template>
    <div class="deposit my-outer">
        <div class="radius-header"><back/><div class="align-center">入金</div></div>
        <div class="my-container">
            <div class="type">
                <div class="payment-type align-center" v-for="(item, index) in payData" :class="{ 'active': selectMethodIndex == index }" :key="index" @click="chooseMethod(item, index)">
                    {{item.pay_name}}
                </div>
            </div>
            <div class="amount">
                <div>充值金额 </div>
                <div></div>
                <div class="payment-money align-center" v-for="(item, index) in moneyList" :class="{ 'active': selectedMoneyIndex == index }" :key="index" @click="chooseMoney(item.money, index)">
                    {{item.money}}
                </div>
            </div>
            <div class="submit-btn btn" @click="submitDeposit($event)">立即充值</div>
        </div>
        <div class="hint">
            <h6>溫馨提示*:</h6>
            <p>1. 所用到的付款碼不能重複使用,如再需充值,請重新照步驟充值</p>
            <p>2. 若充值不成功, 請多試幾次或使用其他支付方式</p>
            <p>3. 除平台客服外, 其他任何主動詢問您是否充值的用戶均為騙子,可向客服舉爆,謹防受騙</p>
        </div>
    </div>
</template>

<script>
// money
// appid
// type
// is recommend
    
    import '@/utils/mixins';
export default {
    data() {
        return{
            payData: null,
            chosenMethod: null,
            chosenMoney: 0,
            moneyList: null,
            selectedMethodIndex: 0,
            selectedMoneyIndex: 0,
            type: 1
        }
    },
    methods: {
        async getRechargeData() {
                let encryptData = await this.encrypt({})
                let formData = new FormData();
                formData.append("data", encryptData)
                this.$axios.post(process.env.BASE_URL+'pay/get_recharge_data', formData)
                    .then((res) => {
                            this.payData = res.data.data
                        })
                        .catch((err) => {
                            console.log("get encrypt error")
                    })
        },
        chooseMethod(item, index) {
            this.chosenMethod = item.route
            this.moneyList = item.money_data
            this.selectMethodIndex = index
            this.type = item.type
        },
        chooseMoney(money, index) {
            this.selectedMoneyIndex = index
            this.chosenMoney = money
        },
        async submitDeposit(e) {
            e.target.innerHTML = "<i class='icon-spinner2'></i>"
            let url = process.env.BASE_URL+'pay/' + this.chosenMethod
            let data = {money: this.chosenMoney, appid: 1,type: this.type }
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            let countryList = this.$axios.post(url, formData)
                .then((res) => {
                        e.target.innerHTML = "立即充值"
                        if(res.data.status != 1) {
                            this.$alert(res.data.msg)
                        }
                        else {
                            let payUrl = res.data.data.pay_url
                            if(payUrl) {
                                window.open(payUrl)
                            }
                        }

                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        }
    },
    mounted() {
        this.getRechargeData()
    }
}
</script>
<style lang="scss">
    .deposit {
        .hint {
            background: white;
        }
        .icon-spinner2 {
            position: absolute;
            top: 38%;
            left: 47%;
            transform: translate(-50%, -50%);
            animation: spin 1.4s infinite linear;
        }
        .type {
            overflow: hidden;
            margin:0 15px 10px;
            .payment-type {
                width: 30%;
                float: left; 
                padding: 10px;
                margin: 5px;
                border: 1px solid #ccc;
                border-radius: 10px;
                height: 80px;
            }
        }
        .payment-money {
            width: 23%;
            float: left; 
            padding: 10px;
            margin: 5px;
            border: 1px solid #ccc;
            height: 40px;
        }
        .active {
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            color: white;
        }
        .amount {
            overflow: hidden;
            padding:0 15px;
        }
        .submit-btn {
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            border-radius: 30px;
            margin:20px 0;
            line-height: 40px;
            position: relative;
            min-height: 60px;
            position: relative;
        }
        .hint {
            padding: 15px;
            h6 {
                font-size: 16px;
            }
        }
    }
</style>