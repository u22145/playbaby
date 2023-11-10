<template>
        <!-- <div class="radius-header"><back style="float:left;display:inline"/><div class="align-center">{{title}}</div></div> -->
        <div class="my-container align-center post-page">
            <div class="title">發小說</div>
            <input type="text" placeholder="标题"  v-model="novelTitle">
            <textarea name="" id="" cols="30" rows="10" :placeholder="placeholder" v-model="content" style="padding:10px"></textarea>
             <div v-if="type!='novel'" id="cover-img-upload"></div>
             <div>
                 <div>Baby幣收費</div>
                 <input class="charge" type="number" placeholder="收費" v-model="fee">
             </div>
            <div class="btn" @click="submitPost">发布</div>
        </div>
</template>
<script>

import '@/utils/mixins';
export default {
    data() {
        return {
            type: this.$route.params.id,
            content: "",
            pic: "",
            blog_id: "",
            video_pic: "",
            apiSlug: "blog/write_new",
            ffmpegType: 0,
            placeholder: "记录这一刻,晒给懂你的人",
            fee: 0,
            disabledBtn: true,
            novelTitle: "",
            key: '128bitslength*@#',
            encryptFile: null,
            qiniuName: ""
        }
    },
    methods: {

        async submitPost() {
            if((this.content == "") || this.title =='') {
                this.$alert("请填写内容或标题")
                return false
            }
            this.disabledBtn = true
            let data = {
                    title: this.novelTitle,
                    content: this.content,
                    fee: this.fee,
                    tag: ''
                }
            
            let encryptData = await this.encrypt(data)
            let formData = new FormData();
            formData.append("data", encryptData)
            this.$axios.post(process.env.BASE_URL+'blog/write_new', formData)
                .then((res) => {
                        if(res.data.status ==1) {
                            this.$alert("上传成功 请静待管理员审核")
                            .then(() => {
                                this.$router.push('/')
                            })
                        }
                        else {
                            this.$alert(res.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log("get encrypt error")
                })
        },
        headerChange() {},
    },
    mounted() {
    }
}
</script>