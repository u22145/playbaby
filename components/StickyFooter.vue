<template>
    <div>
        <ul class="sticky-header" :class="[hide ? 'is-hide2' : 'not-hide2']" v-show="this.$store.state.isHeaderShow">
                <li style="float:left;width:40%;line-height:50px;padding:0"><img style="float:left;height:40px;margin-top:5px" src="logo.png" alt=""></li>
                <li style="float:right;width:40%;padding:0;border:2px rgba(255,255,255,0.5) solid; border-radius:10px;height:40px;margin-top:5px;line-height:36px;background:rgba(255,255,255,0.1)">點擊下載APP</li>
        </ul>
        <div class="post-btn" :class="[hide ? 'is-hide3' : 'not-hide3']" @click="openPostPopup" v-show="this.$store.state.isHeaderShow">
        +
        </div>

        
        <!-- <ul class="sticky-footer" :class="[hide ? 'is-hide' : 'not-hide']" v-show="this.$store.state.isFooterShow"> -->
        <ul class="sticky-footer" v-show="this.$store.state.isFooterShow">
            <li class="footer-link" :class="{ 'active': isActive('recommend') }" @click="handleMenuCLick('recommend')"><nuxt-link to="/"><span>社區</span><i class="icon-community"></i></nuxt-link></li>
            <li class="footer-link" :class="{ 'active': isActive('papa') }" @click="handleMenuCLick('papa')"><nuxt-link to="/papa"><span>啪啪</span><i class="icon-papa"></i></nuxt-link></li>
            <li class="footer-link" :class="{ 'active': isActive('live') }" @click="handleMenuCLick('live')"> <nuxt-link to="/streamContainer"><span>直播</span><i class="icon-live"></i></nuxt-link></li>
            <li class="footer-link" :class="{ 'active': isActive('my') }" @click="handleMenuCLick('my')"><nuxt-link to="/my"><span>我的</span><i class="icon-mine"></i></nuxt-link></li>
        </ul>
    </div>

</template>
<script>    
import {mapMutations, mapGetters} from 'vuex';
export default {
  data() {
    return {
        current:'',
        hide:false,
        activeMenu: this.route
    }
  },
  computed: {

  },
  created(){
  },
  mounted() {
    window.addEventListener('scroll',this.btn_pos);
    
    // if(!sessionStorage.getItem("activeMenu")) {
    //       sessionStorage.setItem("activeMenu", "recommend")
    //       this.activeMenu = "recommend"
    //   } 
    //   else {
    //       this.activeMenu = sessionStorage.getItem("activeMenu")
    //   }
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.btn_pos);
  },
  methods: {
    openPostPopup() {
      document.body.style.overflow = "hidden"
      this.$store.commit("setPopup", true)
    },
    closePopup() {
      document.body.style.overflow = "visible"
      this.$store.commit("setPopup", false)
      this.component = "PopupTemplate"
    },
    btn_pos(){
      //滚动条的高度
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //   console.log(scrollTop)   
      if (this.current < scrollTop) {
        //   console.log("scrollbar座標",this.current,scrollTop);
          this.hide = true;
      } else {
          this.hide = false;
      };
      //滚动条的高度>可视区的高度
      this.current = scrollTop;
    },
    handleMenuCLick(menu) {
        // sessionStorage.setItem("activeMenu", menu)
        this.activeMenu = menu
    },
    isActive (menuItem) {
        if (process.browser) {
            return this.activeMenu === menuItem
        }
    },

  }
}
</script>
<style lang="scss">
    .sticky-footer {
   position:fixed;
   left:0px;
   bottom:0px;
   width:100%;
   background:white;
   height:60px;
   padding: 5px 0 5px;
   text-align: center;
   display: flex;
   justify-content: space-around;
   border-top: 1px solid #ccc;
   z-index: 2;
    }
    li {
        padding: 10px;
    }
    .is-hide {
        animation-name: hiden1;
        animation-duration: 0.3s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
    }
    .not-hide {
        animation-name: hiden2;
        animation-direction:reverse;
        animation-duration: 0.1s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
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
    .is-hide3 {
        animation-name: hiden5;
        animation-duration: 0.3s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
    }
    .not-hide3 {
        animation-name: hiden6;
        animation-direction:reverse;
        animation-duration: 0.1s;
        animation-fill-mode:forwards;
        animation-timing-function:linear;
    }
    @keyframes hiden1 {
        0%   {transform: translateY(0%);opacity: 1;}
        100%   {transform: translateY(100%);opacity: 0;}
    }
    @keyframes hiden2 {
        0%   {transform: translateY(0%);opacity: 1;}
        100%   {transform: translateY(100%);opacity: 0;}
    }
    @keyframes hiden3 {
        0%   {transform: translateY(0%);}
        100%   {transform: translateY(-100%);}
    }
    @keyframes hiden4 {
        0%   {transform: translateY(0%);}
        100%   {transform: translateY(-100%);}
    }
    @keyframes hiden5 {
        0%   {transform: translateY(0%);opacity: 1;}
        100%   {transform: translateX(-100%);opacity: 0;}
    }
    @keyframes hiden6 {
        0%   {transform: translateY(0%);opacity: 1;}
        100%   {transform: translateX(-100%);opacity: 0;;}
    }
    .sticky-header {
        position:fixed;
        left:0px;
        top:0px;
        width:100%;
        height:50px;
        color:#fff;
        background:linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        // padding: 10px;
        // margin:0;
        padding-bottom: 50px;
        text-align: center;
        display: flex;
        z-index: 50;
        justify-content: space-around;
//      border-top: 1px solid #ccc;   
        li {
        //    padding: 10px;
        }
    }
    .row {
        width:100%;
    }
    .row::before {
        display:table;
    }
    .row::after {
        clear: both;
    }
    .footer-link {
        border-radius: 10px;
        position: relative;
        padding: 0;
        width:24%;
        font-size: 8px;
        text-align: center;
        span {
            display: block;
            margin-top: 34px;
            color:#666;
        }
        i {
            position: absolute;
            top: 0px;
            left: calc(50% - 17px);
            width: 34px;
            height: 34px;
            font-size:24px;
            line-height: 34px;
            border-radius: 12px;
        }
        i:before {
            display: block;
            color: #ddd;
        }
        &.active {
            span {
                color: purple;
            }
            i {
                background: linear-gradient(90deg, #6A3A93 0.01%, #E83F6F 100%);
                &:before {
                    color: white;
                }
            }
            
        }
    }
    .post-btn {
        position: fixed;
        left: 4%;
        bottom: 10%;
        height: 60px;
        width: 60px;
        line-height: 45px;
        border-radius: 30px;
        z-index: 50;
        font-size: 50px;
        text-align: center;
        background: linear-gradient(90deg, #6A3A93 0%, #E83F6F 100%);
        opacity: 0.7;
        border:#fff 6px solid;
        color: #F7F8F8;
        /* padding: 10px; */
    }
</style>
