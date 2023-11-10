<template>
    <div class="verify my-outer">
        <div class="radius-header"><back/><div class="align-center">主播認證</div></div>
        <div class="my-container">
            <div class="verify-block" @click="goNormalVerify">個人主播認證 <span v-if="isVerify">已認證</span><span v-if="!isVerify">未認證</span><i class="arrow right"></i></div>
            <div class="verify-block" @click="goGuildVerify">公會主播認證 <span v-if="isGuildVerify">已認證</span><span v-if="!isGuildVerify">未認證</span><i class="arrow right"></i></div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            isVerify: false,
            isGuildVerify: false
        }
    },
    mounted() {
        this.checkHost()
    },
    methods: {
        async checkHost() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'my/check_anchor', formData)
                .then((res) => {
                    // console.log("賴可",res.data,"ID",id,"type",1)
                    if(res.data.data.cert == 1) {
                        this.isVerify = true
                    }
                    if(res.data.data.soc_id != 0) {
                        this.isGuildVerify= true
                    } 
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        goNormalVerify() {
            if(!this.isVerify) {
                this.$router.push('/host-verify-page/normal')
            }
        },
        goGuildVerify() {
            if(!this.isGuildVerify) {
                this.$router.push('/host-verify-page/guild')
            }
        }
    }
}
</script>
<style lang="scss">
    .verify-block {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        .arrow {
            float: right;
            margin-top: 7px;
        }
    }
</style>