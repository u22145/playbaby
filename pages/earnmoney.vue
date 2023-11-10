<template>
    <div class="earn-money" >
        <Back />
        <img src="mine_pho@2x.png" alt="">
    </div>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("setIsHeaderShow", false)
        this.$store.commit("setIsFooterShow", false)
    }
}
</script>
<style lang="scss">
    .earn-money {
        img {
            max-width: 100%;
            height: auto;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    }
</style>