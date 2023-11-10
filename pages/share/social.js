
import '@/utils/mixins';
export default {
    async likeButton(type,id) {
        let encryptData = await this.encrypt({"type":1 ,"id":id})
        let formData = new FormData();
        formData.append("data", encryptData);
        this.$axios.post(process.env.BASE_URL+'blog/like', formData)
            .then((res) => {
                console.log("賴可",res.data,"ID",id,"type",1)
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    async dislikeButton(type,id) {
        let encryptData = await this.encrypt({"type":1 ,"id":id})
        let formData = new FormData();
        formData.append("data", encryptData);
        let countryList = this.$axios.post(process.env.BASE_URL+'blog/dislike', formData)
            .then((res) => {
                console.log("抵斯賴可",res.data)
            })
            .catch((err) => {
                console.log("get encrypt error")
            })
    },
    goDetail(num) {
        // this.$router.push({name:'pageinfo',params: {id: num}})
        this.$router.push({ path: `/pageinfo/${num}` })
    },
}