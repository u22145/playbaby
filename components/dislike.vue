<template>
    <li class="like" :class="[isLike==1? 'active': '']"  @click="disLikeButton(type,dislikeId)">
       {{likeNum}} <i class="icon-sad2"></i>
    </li>
</template>
<style lang="scss">
    .like {
        &.active {
            color: red;
        }
    }
</style>
<script>

import '@/utils/mixins';
import EventBus from '../pages/share/event-bus';
export default {
    props: ["type", "dislikeId", 'number', 'status'],
    data() {
        return {
            isLike: this.status,
            likeNum: parseInt(this.number)
        }
    },
    created() {
    },
    mounted() {
        EventBus.$on('like'+this.dislikeId, function (data) {
            if(this.isLike == 1) {
                this.isLike == 0
                this.disLikeButton(data.type, data.id)
            }
        }.bind(this));
    },
    methods: {
        async disLikeButton(type,id,index) {

        if(this.$store.state.isLogin) {
            let encryptData = await this.encrypt({"type":1 ,"id":id},1)
            let formData = new FormData();
            formData.append("data", encryptData);
            let countryList = this.$axios.post(process.env.BASE_URL+'blog/dislike', formData)
                .then((res) => {
                    console.log("抵斯賴可",res.data,"index",index)
                    // this.hotTopics ={},
                    // this.getHotList();
                    if(this.isLike == 1) {
                        this.isLike = 0
                        this.likeNum = this.likeNum -1
                    }
                    else {
                        let data = {type: this.type, id:this.dislikeId}
                        EventBus.$emit('dislike'+this.dislikeId, data);
                        this.isLike = 1
                        this.likeNum = this.likeNum +1
                    }
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })

        } else {
                    if(this.isLike == 1) {
                        this.isLike = 0
                        this.likeNum = this.likeNum -1
                    }
                    else {
                        let data = {type: this.type, id:this.dislikeId}
                        EventBus.$emit('dislike'+this.dislikeId, data);
                        this.isLike = 1
                        this.likeNum = this.likeNum +1
                    }
        }
        },
    }
}
</script>