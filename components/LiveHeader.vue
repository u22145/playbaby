<template>
  <div>
    <ul class="nav-bar3" :class="[hide ? 'is-hide2' : 'not-hide2']">
        <div class="white-b">
          <!-- <back style="float:left;display:inline"/> -->
            <li @click="handleMenuSelect('hot')" :class="{ 'active': isActive('hot') }">推薦</li>
            <li @click="handleMenuSelect('follow')" :class="{ 'active': isActive('follow') }">關注</li>
    <!-- {{this.$route.params.id}} -->

          <!-- <span style="color:white;padding:20px">3</span> -->
        </div>
    </ul>

  </div>
</template>
<script>

import '@/utils/mixins';
import {mapMutations, mapGetters} from 'vuex';
export default {
  data() {
    return {
        activeMenu: "hot",
        hide:false,
        review:'',
    }
  },
  computed: {

  },
  mounted() {
    window.addEventListener('scroll',this.btn_pos); 
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.btn_pos);
  },
  methods: {
    btn_pos(){
      //滚动条的高度

      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //   console.log(scrollTop)   
      if (this.current < scrollTop) {
        //   console.log("下",this.current,scrollTop)
          this.hide = true;
      } else {
          this.hide = false;
      };
      //滚动条的高度>可视区的高度
      this.current = scrollTop;
    },
    handleMenuSelect(menu) {
      this.activeMenu = menu;
      this.$emit('changeStreamList', menu)
    },
    isActive (menuItem) {
        return this.activeMenu === menuItem
    },
  }
}
</script>
<style lang="scss">
  .submit-btn2 {
    background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
    color: white;
    display: inline-block;
    margin: 0 auto;
    padding: 10px 20px;
    width: 20%;
    float:right;
    text-align: center;
    position: absolute;
    border-radius:30px;
    border:none;
    left: 75%;
    // transform: translatex(-50%);
  }
  .reply {
    background: #eee;
    color: #666;
    display: inline-block;
    margin: 0 auto;
    padding: 10px 20px;
    width: 66%;
    line-height:16px;
    float:left;
    text-align: left;
    position: absolute;
    border-radius:30px;
    border: 1px #ddd solid;
    left: 5%;
    // transform: translatex(-50%);
  }
    @keyframes hiden3 {
          0%   {transform: translateY(0%);}
          100%   {transform: translateY(-50px);}
    }
    @keyframes hiden4 {
          0%   {transform: translateY(0%);}
          100%   {transform: translateY(-50px);}
    }
    .is-hide2 {
        animation-name: hiden3;
        animation-duration: 0.3s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
    }
    .not-hide2 {
        animation-name: hiden4;
        animation-direction:reverse;
        animation-duration: 0.1s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
    }
    .white-b {
        margin-top: 3px;
        background:white;
        width:100%;
        border-radius: 30px 30px 0 0;
        line-height: 40px;

    }
    .sticky-footer2 {
   position:fixed;
   left:0px;
   bottom:0px;
   width:100%;
   background:white;
   height:60px;
   padding: 12px 0 5px;
   text-align: center;
   display: flex;
   justify-content: space-around;
   border-top: 1px solid #ccc;
   z-index: 2;
    }
    .nav-bar3 {
        position:fixed;
        left:0px;
        top:50px;
        width:100%;
        background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        // padding: 10px;
        height:50px;
        text-align: center;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        border-bottom: 2px solid #efefef;
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 6px 0;
            display: inline-block;
            font-size: 12px;
            margin: 6px 10px;
            color:#666;
            width:14%;
            padding: 8px 0;
            border-radius: 30px;
            line-height:14px;

            &.active {
                // font-size: 14px;
                // font-weight: bold;
                color:#efefef;
                // border-bottom: 2px solid #000;
                background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
 

            }
        }

    }
</style>