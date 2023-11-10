// utils/mixins.js
import CryptoJS from "crypto-js";
import Vue from 'vue';

// 全站共用的 function，會注入每個 component 當中

Vue.mixin({
  methods: {
     encrypt(data, needLogin = 1) {
       if(sessionStorage.getItem('pbUid')) {
         data.uid = sessionStorage.getItem('pbUid')
       } 
       if(sessionStorage.getItem('pbUserCode')) {
        data.usercode = sessionStorage.getItem('pbUserCode')
       }
        var sort_data = this.ksort(data);
        var usercode = sessionStorage.getItem('pbUserCode');
        var accesskey = CryptoJS.HmacSHA256(usercode, process.env.APP_SECRET).toString();
        var input = JSON.stringify(sort_data);
        var signature = CryptoJS.HmacSHA256(input, accesskey).toString();
        var post_obj = {
          signature: signature,
          input: input,
          appkey: process.env.APP_KEY,
          usercode: usercode
      };
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(post_obj)));
    },
    ksort(jsonData) {
        try {
          let tempJsonObj = {};
          let sdic = Object.keys(jsonData).sort();
          sdic.map((item, index) => {
              tempJsonObj[item] = jsonData[sdic[index]]
          });
          return tempJsonObj;
      } catch (e) {
          return jsonData;
      }     
    },

    checkIsLoginInSession() {
      if(sessionStorage.getItem("pbUid") && sessionStorage.getItem("pbUserCode")) {
        this.$store.commit('setUid', sessionStorage.getItem('pbUid'))
        this.$store.commit('setUserCode', sessionStorage.getItem('pbUserCode'))
      }
    },
  }
})