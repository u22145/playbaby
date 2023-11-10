<template>
    <div class="back" @click="backToPrev">
        <span class="arrow"></span>
    </div>
</template>
<style lang="scss">
.back {
    margin: 0 20px;
    font-size: 20px;
    color:#666;
}
</style>
<script>
export default {
    methods: {
        backToPrev() {
            this.$router.back()
        }
    }   
}
</script>