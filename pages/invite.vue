<template>
    <div class="invite-full">
        <div><Back /><div class="title">推广分享</div></div>
        <div class="frame">
            <div class="invite-code">邀请码: {{uid}}</div>
            <div class="pic"></div>
            <div @click="copyAddress" class="orange-btn link">点我复制链结分享</div>
            <div class="orange-btn save-qr-code">点我保存二维码</div>
            <div class="qr-code"><qrcode-vue :value="qrcodeUrl" :size="size" level="H"></qrcode-vue></div>
        </div>
    </div>
</template>
<style lang="scss">
    .invite-full {
        background: yellow;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .invite-code {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff5200;
            opacity: .7;
            z-index: 2;
            font-size: 12px;
            color: white;
            padding: 3px;
        }
        .qr-code {
            z-index: 3;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, 20px);
        }
        .title {
            display: block;
            text-align: center;
            margin-top: 20px;
        }
        .back {
            position: absolute;
            left: 20px;
            top: 20px;
        }
        .frame {
            background-image: url('/earn@2x.png');
            width: 350px;
            height: 500px;
            margin: 0 auto;
            display: block;
            background-repeat: no-repeat;
            background-size: contain;
            margin-top: 50px;
            position: relative;
        }
        .pic {
            background-image: url('/earn@3x.jpg');
            width: 280px;
            height: 400px;
            display: block;
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            top: 45px;
            left: 25px;
        }
        .orange-btn {
            display: block;
            width: 270px;
            height: 30px;
            border-radius: 20px;
            background: #ff5200;
            color: white;
            text-align: center;
            margin: 0 auto;
            line-height: 30px;
            position: relative;
            top: 390px;
            margin-bottom: 10px;
        }
    }
</style>
<script>

import '@/utils/mixins';
import QrcodeVue from 'qrcode.vue'
export default {
    data() {
        return{
            uid: "",
            qrcodeUrl: "",
            size: 100,
        }
    },
    components: {
      QrcodeVue,
    },
    beforeMount() {
         this.$store.commit("setIsHeaderShow", false)
         this.$store.commit("setIsFooterShow", false)
    },
    mounted() {
        this.getQRcode()
        this.uid = this.$store.getters.getUid
    },
    methods: {
        async getQRcode() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'earn/rank', formData)
                .then((res) => {
                    this.qrcodeUrl = res.data.data.share_url
                    // console.log("賴可",res.data)
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        copyAddress() {
            var inputValue = window.location.href;
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
        }
    },
}
</script>