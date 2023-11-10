<template>
    <div class="following-list my-outer">
        <div class="radius-header"><back/><div class="align-center">关注</div></div>
        <div class="my-container">
            <div class="following" v-for="(item, index) in followingList" :key="index">
                <div><img :src="item.avatar" alt="" @error="handleAvatarError($event,item.gender)"></div>
                <div>
                    <div>{{item.nickname}}</div>
                    <div>粉丝: {{item.follower_num}}</div>
                </div>
                <follow :data="item.following" :id="item.uid" />   
            </div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            followingList: null
        }
    },
    mounted() {
        this.getFollower()
    },
    methods: {
        async getFollower() {
            let encryptData = await this.encrypt({})
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'user/following', formData)
                .then((res) => {
                    this.followingList = res.data.data
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
        handleAvatarError(e,f) {
            e.target.setAttribute("src", f+".png")
            // e.target.setAttribute("src", "avatar.jpg")
        },
    }
}
</script>
<style lang="scss">
    .following-list {
        .following {
            padding: 10px;
            display: flex;
            border-bottom: 1px solid #ccc;
            overflow: hidden;
            img {
                width: 30px;
                height: 30px;
                border-radius: 100%;
                margin-right: 10px;
            }
            .follow {
                margin-left: auto;
            }
        }
    }
</style>