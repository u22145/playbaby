<template>
    <div>
        <div class="post-link" @click="handlePost"><span>發文章</span><i class="icon-photoedit"></i></div>
        <div class="post-link" @click="directPapaPost"><span> 發短片</span><i class="icon-videoedit"></i></div>
        <div class="post-link"><nuxt-link to="/streaming-host"><span>直播</span><i class="icon-liveedit"></i></nuxt-link></div>
        <!-- <div class="post-link" @click="handlePost"><span>發小說</span><i class="icon-pencil"></i></div> -->
    </div>
</template>
<script>
export default {
    methods: {
        handlePost(type) {
            this.$router.push('/post')
        },
        directPapaPost() {
            this.$router.push('/post/papa')
        }
    }
}
</script>
<style lang="scss">
    .post-link {
        position: relative;
        i:before {
            font-size: 40px;
            color: white;
            position: absolute;
            top: 42%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        span {
            position: absolute;;
            bottom: 15%;
            width:100%;
            text-align: center;
            font-size:14px;
            line-height: 14px;
            display: block;
        }
    }
</style>