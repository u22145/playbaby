<template>
    <span class="follow" :class="[isfollowing==1? 'active': '']"  @click="followButton(0,id)">
        {{isfollowing == 0 ? "關注" : "取消"}}
    </span>
</template>
<style lang="scss">
    .follow {
        color:#999;
        border:1px #ccc solid;
        padding:10px 14px;
        border-radius:15px;
        &.active {
            color: purple;
            border-color: purple;
        }
    }
</style>
<script>

import '@/utils/mixins';
export default {
    props: ["data", "id"],
    data() {
        return {
            isfollowing: this.data
        }
    },
    created() {
    },
    methods: {
        async followButton(type,id) {
            if(this.isfollowing==0) {
                this.isfollowing = 1
            }
            else {
                this.isfollowing = 0
            }
            let encryptData = await this.encrypt({"type":type ,"op_uid":id ,"room_id":''},1)
            let formData = new FormData();
            formData.append("data", encryptData);
            this.$axios.post(process.env.BASE_URL+'my/follow', formData)
                .then((res) => {
                    console.log("發漏",res.data)
                })
                .catch((err) => {
                    console.log("get encrypt error")
                })
        },
    }
}
</script>