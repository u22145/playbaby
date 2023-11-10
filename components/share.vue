<template>
    <li><i class="icon-share2"></i>{{num}}</li>
</template>
<style lang="scss">
    .like {
        &.active {
            color: purple;
        }
    }
</style>
<script>

import '@/utils/mixins';
import EventBus from '../pages/share/event-bus';
export default {
    props: ["num"],
    data() {
        return {
            isLike: this.status,
            likeNum: parseInt(this.number)
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {

    }
}
</script>