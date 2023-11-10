<template>
    <li class="like" :class="[isLike==1? 'active': '']"  @click="likeButton(type,likeId)">
       {{likeNum}} <i class="icon-heart"></i>
    </li>
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
    props: ["type", "likeId", 'number', 'status'],
    data() {
        return {
            isLike: this.status,
            likeNum: parseInt(this.number)
        }
    },
    created() {
    },
    mounted() {
        EventBus.$on('dislike'+this.likeId, function (data) {
            if(this.isLike == 1) {
                this.isLike == 0
                this.likeButton(data.type, data.id)
            }
        }.bind(this));
    },
    methods: {
        async likeButton(type,id,index) {
            if(this.$store.state.isLogin) {
                let encryptData = await this.encrypt({"type":1 ,"id":id},1)
                let formData = new FormData();
                formData.append("data", encryptData);
                this.$axios.post(process.env.BASE_URL+'blog/like', formData)
                    .then((res) => {
                        if(this.isLike == 1) {
                            this.isLike = 0
                            this.likeNum = this.likeNum -1
                        }
                        else {
                            let data = {type: this.type, id:this.likeId}
                            EventBus.$emit('like'+this.likeId, data);
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
                    let data = {type: this.type, id:this.likeId}
                    EventBus.$emit('like'+this.likeId, data);
                    this.isLike = 1
                    this.likeNum = this.likeNum +1
                }
            }


        },
    }
}
</script>