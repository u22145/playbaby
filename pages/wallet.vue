<template>
    <div class="wallet my-outer">
        <div class="radius-header"><back/><div class="align-center">錢包</div></div>
        <div class="my-container align-center">
            <div class="title">BABY 餘額</div>
            <div class="amount">{{this.amount}}</div>
            <div class="button-container">
                <div class="button flex-item"><nuxt-link to="/deposit">在線充值</nuxt-link></div>
                <div class="button flex-item"><nuxt-link to="/withdraw">提現Baby</nuxt-link></div>
            </div>
            <div class="baby-address align-left">
                <div>
                    <div class="sub-title-container">
                        <div class="sub-title">BABY充幣地址</div>
                        <div class="right"><nuxt-link to="/deposit-history">历史充币记录</nuxt-link></div>
                    </div>
                    <div class="align-center"><qrcode-vue :value="address" :size="size" level="H"></qrcode-vue></div>
                    <div>
                        <input type="text"  v-model="address" disabled>
                        <input id="address" type="text" v-model="address">
                    </div>
                    <div class="align-center">
                        <div class="button" @click="copyAddress('address')">複製錢包地址</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .wallet {
        .title {
            width: 120px;
            display: block;
            margin: 0 auto;
            padding-top: 15px;
        }
        .amount {
            width: 100px;
            display: block;
            margin: 10px auto 0;
        }
        .button-container {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
        }
        .button {
            padding: 15px 30px;
            border-radius: 20px;
            border: 1px solid #ccc;
            color: #efefef;
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
            display: inline-block;
            a {
                color: #efefef;
            }
        }
        .baby-address {
            background: #ddd;
            padding: 10px;
            height: 350px;
            border-radius: 15px;
            margin-top: 30px;
            .button {
                margin-top: 15px;
            }
        }
        input {
            width: 100%;
        }
        .right {
            float: right;
        }
        .sub-title-container {
            overflow: hidden;
            .sub-title {
                float: left;
            }
        }
        #address {
            opacity: 0;
            height: 0;
        }
    }
</style>
<script>
    
    import '@/utils/mixins';
    import QrcodeVue from 'qrcode.vue'
    export default {
        data() {
            return {
                amount: 0,
                address: "",
                size: 150
            }
        },
        components: {
        QrcodeVue,
        },
        methods: {
            async getMyWallet() {
                    let encryptData = await this.encrypt({})
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'my/wallet', formData)
                    .then((res) => {
                            this.amount =  res.data.data.eurc_balance
                            this.$store.commit("setAmount", this.amount)
                        })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
            },
            async getAddress() {
                    let encryptData = await this.encrypt({})
                    let formData = new FormData();
                    formData.append("data", encryptData)
                    this.$axios.post(process.env.BASE_URL+'baby/deposit', formData)
                    .then((res) => {
                            this.address = res.data.data.addr
                        })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
            },
            copyAddress(id) {
                // 
                var inputValue = document.getElementById(id).value;
                var isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
                const textArea = document.createElement('textarea');
                textArea.value = inputValue;

                textArea.style.position = 'absolute';
                textArea.style.left = '-9999px'; // to make it invisible and out of the reach
                textArea.setAttribute('readonly', ''); // without it, the native keyboard will pop up (so we show it is only for reading)

                document.body.appendChild(textArea);
                // if (isiOSDevice) {
                //     const range = document.createRange();
                //     range.selectNodeContents(textArea);

                //     const selection = window.getSelection();
                //     selection.removeAllRanges(); // remove previously selected ranges
                //     selection.addRange(range);
                //     textArea.setSelectionRange(0, inputValue.length); // this line makes the selection in iOS
                // } else {
                    textArea.select(); // this line is for all other browsers except ios
                // }

                try {
                    this.$alert("复制成功")
                    return document.execCommand('copy'); // if copy is successful, function returns true
                } catch (e) {
                    return false; // return false to show that copy unsuccessful
                } finally {
                    document.body.removeChild(textArea); // delete textarea from DOM
                }

            // document.execCommand('copy');
            }
        },
        mounted() {
            this.getMyWallet()
            this.getAddress()
        },
    }
</script>