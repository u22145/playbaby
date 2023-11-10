<template>
    <ul class="nav-bar" :class="[hide ? 'is-hide2' : 'not-hide2']">
        <div class="white">
            <li @click="handleMenuSelect('recommend')" :class="{ 'active': isActive('recommend') }">推薦</li>
            <li @click="handleMenuSelect('care')" :class="{ 'active': isActive('care') }">關注</li>
            <li @click="handleMenuSelect('nearbyaction')" :class="{ 'active': isActive('nearbyaction') }">附近動態</li>
            <li @click="handleMenuSelect('nearby')" :class="{ 'active': isActive('nearby') }">附近的人</li>
            <li @click="handleMenuSelect('novel')" :class="{ 'active': isActive('novel') }">小說</li>
        </div>
    </ul>
</template>
<script>

import {mapMutations, mapGetters} from 'vuex';
export default {
  data() {
    return {
        activeMenu: "recommend",
        hide:false,
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
      this.$emit('changecomponent', menu)
    },
    isActive (menuItem) {
        return this.activeMenu === menuItem
    },
  }
}
</script>
<style lang="scss">
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
    .white {
        margin-top: 3px;
        background:white;
        width:100%;
        border-radius: 30px 30px 0 0;

    }
    .nav-bar {
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
            font-size: 0.875rem;
            margin: 6px 0px;
            color:#666;
            width:18%;
            padding: 8px 2px;
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