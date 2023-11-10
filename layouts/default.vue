<template>
  <div style="background:linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%)" >
    <Nuxt :class="[this.$store.state.showPostPopup ? 'blurrr' : '']" />
    <!-- <div class="post-btn" @click="openPostPopup" v-show="this.$store.state.isHeaderShow">
      +
    </div> -->
    <StickyFooter  v-show="!this.$store.state.isVideoShow" ref="footer" />
    <div class="post-overlay" v-show="this.$store.state.showPostPopup" @click="closePopup"></div>
    <div class="post-popup" v-show="this.$store.state.showPostPopup">
         <PopupTemplate></PopupTemplate>
    </div>
  </div> 
</template>
<script>
// handle disable zoom in safari
if (process.browser) {
    window.onload = () => {
    document.addEventListener('touchstart', (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import PopupTemplate from '../pages/popup/popup-template'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
export default {
  data() {
    return {
      activeMenu: ""
    }
  },
  components: {
    PopupTemplate
  },
  watch: {
    $route (current, old) {
      if(current.path == '/' ) {
        this.activeMenu = "recommend"
      }
      if(current.path == '/papa') {
        this.activeMenu = 'papa'
      }
      if(current.path == '/my' || current.path == '/login') {
        this.activeMenu = 'my'
      }
      if(current.path == '/streamContainer' ) {
        this.activeMenu = 'live'
      }
      this.$refs.footer.handleMenuCLick(this.activeMenu)
    }
  },
  beforeMount() {
      if(sessionStorage.getItem('pbIsLogin') == "true") {
        this.$store.commit('setLogin', true)
      }
  },
  mounted() {
      if(this.$route.path == '/' ) {
        this.activeMenu = "recommend"
      }
      if(this.$route.path == '/papa') {
        this.activeMenu = 'papa'
      }
      if(this.$route.path == '/my' || this.$route.path == '/login') {
        this.activeMenu = 'my'
      }
      if(this.$route.path == '/streamContainer' ) {
        this.activeMenu = 'live'
      }
      this.$refs.footer.handleMenuCLick(this.activeMenu)
      this.$axios.get('https://raw.githubusercontent.com/playbaby/maintenance/master/maintain_status.json')
      .then((res) => {
        console.log(res)
      })
      
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
    changeComponent(component) {
      this.component = component
    },
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot?6q47w1');
  src:  url('../assets/fonts/icomoon.eot?6q47w1#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf?6q47w1') format('truetype'),
    url('../assets/fonts/icomoon.woff?6q47w1') format('woff'),
    url('../assets/fonts/icomoon.svg?6q47w1#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-like2:before {
  content: "\e908";
  color: #fff;
}
.icon-videoedit:before {
  content: "\e904";
  color: #fff;
}
.icon-photoedit:before {
  content: "\e905";
  color: #fff;
}
.icon-liveedit:before {
  content: "\e906";
  color: #fff;
}
.icon-community:before {
  content: "\e900";
  color: #fff;
}
.icon-live:before {
  content: "\e901";
  color: #fff;
}
.icon-mine:before {
  content: "\e902";
  color: #fff;
}
.icon-papa:before {
  content: "\e903";
  color: #fff;
}
.icon-coin-dollar:before {
  content: "\e93b";
}
.icon-credit-card:before {
  content: "\e93f";
}
.icon-download:before {
  content: "\e960";
}
.icon-forward:before {
  content: "\e969";
}
.icon-user-plus:before {
  content: "\e973";
}
.icon-user-check:before {
  content: "\e975";
}
.icon-list2:before {
  content: "\e9bb";
}
.icon-coin-dollar1:before {
  content: "\e93c";
}
.icon-bubbles:before {
  content: "\e96c";
}
.icon-gift:before {
  content: "\e99f";
}
.icon-heart:before {
  content: "\e9da";
}
.icon-sad2:before {
  content: "\e9e6";
}
.icon-share2:before {
  content: "\ea82";
}
.icon-spinner2:before {
  content: "\e97b";
}
.icon-pencil:before {
  content: "\e907";
}
.icon-clock:before {
  content: "\e94e";
}
.icon-user:before {
  content: "\e971";
}
.icon-users:before {
  content: "\e972";
}
.icon-user-plus1:before {
  content: "\e974";
}
.icon-fire:before {
  content: "\e9a9";
}
.icon-heart1:before {
  content: "\e9db";
}
.icon-volume-medium:before {
  content: "\ea27";
}






html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
  ul {
      list-style-type: none;
      padding: 0;
  }
  li {
      display: inline-block;
  }
  a{
    color: black;
    text-decoration: none;
  }
  .templogout {
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 9;
    background: #fff;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    color:purple;
    opacity: 0.7;
  }
  .btn {
    background: linear-gradient(90deg, #6A3A93 0%, #E83F6F 100%);
    color: white;
    display: inline-block;
    margin: 0 auto;
    padding: 10px 20px;
    width: 300px;
    text-align: center;
  }
  .submit-btn {
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
  }
  .post-overlay {
   position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, rgba(100, 57, 134, 0.75) 0%, rgba(232, 63, 111, 0.75) 100%);
    z-index: 100;
  }
  .post-popup {
    width: 300px;
    z-index: 101;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .post-link {
      border: 1px solid #fff;
      border-radius: 100%;
      width: 120px;
      height: 120px;
      text-align: center;
      display: inline-block;
      margin: 0 10px 10px;
      line-height: 120px;
      color: white;
      a {
        color: white;
      }
    }
  }
      .arrow {
        border-color: black;
        border-width: 2px 0 0 2px;
        display: inline-block;
        border-style: solid;
        width: 10px;
        height: 10px;
        transform: rotate(-45deg);
        &.up {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        &.down {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        }
        &.left {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
        &.right {
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
        }
    }
    .my-container {
        background: white;
    }
    .blurrr{
      filter: blur(0.5rem);
    }
    .radius-header {
      border-radius: 30px 30px 0 0;
      background: white;
      border-bottom: 2px solid #efefef;
      height: 50px;
      line-height: 50px;
      .back {
        position: absolute;
        // left: 10px;
        // top: 65px;
      }
    }
    .my-outer {
      padding-top: 5px;
      margin-top: 50px;
    }
    .align-center {
      text-align: center;
    }
    .align-left {
      text-align: left;
    }
            @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
            }
            @keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
</style>
