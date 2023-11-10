<template>
    <div class="stream-container">
        <div></div>
            <client-only placeholder="Loading...">
      <!-- this component will only be rendered on client-side -->
                <component v-bind:is="component" @openLiveStream="showLiveStreaming" :data="streamDatas"/>
            </client-only>
    </div>
</template>

<style lang="scss">
    .stream-container {
        margin-top: 50px;
        background: white;
        .banner img {
            width: 100%;
        }
    }
</style>
<script>

import '@/utils/mixins';
import streaming from './streaming-client';
import streamHome from './streamHome';
export default {
    components: {
        streamHome,
        streaming
    },
    data() {
        return {
            streamDatas: null,
            component:"streamHome",
            rankingList: null
        }
    },
    methods: {
        showLiveStreaming(data) {
            this.streamDatas = data;
            this.component = "streaming";
            this.$store.commit("setIsHeaderShow", false)
            this.$store.commit("setIsFooterShow", false)
            // this.$store.commit("setIsVudeoShow", true)
        },
    },
    mounted() {
    },
    computed: {
        
    }
}
</script>