<template>
  <div class="backg">
    <div class="container">

      <NavigationBar @changecomponent="changeComponent"/>
      <component v-bind:is="component" />
              <!-- <div> count is : {{this.$store.state.count}}</div>
      <div class="flex-container">
        <input class="flex-item search-bar" type="text" placeholder="搜索">
        <div class="flex-item btn btn-submit">發佈</div>
      </div>
        <div @click="increment"> click me</div> -->
    </div> 

  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';
import Nearby from './index/nearby';
import Nearbyaction from './index/nearbyaction';
import Novel from './index/novel';
import Recommend from './index/recommend';
import Care from './index/care';
export default {
  components: {
      Nearby,
     Nearbyaction,
     Novel,
     Recommend,
     Care
  },
  // middleware: 'authenticated',
  data() {
    return {
      component:"Recommend",
    }
  },
  computed: {

  },
  mounted() {
    console.log(process.env.testApiUrl)
  },
  methods: {

    changeComponent(component) {
      this.component = component
    },

  }
}
</script>

<style lang="scss">
.container {
  margin-top: 100px;
  background: #fff;
  // border-radius: 30px 30px 0 0;
}
  .btn {
    display: inline-block;
  }
  .search-bar {
    padding: 5px 10px;
    width: 80%;
    border-radius: 30px;
    border: 1px solid #ccc;
  }
  .flex-container {
    // background:linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
    display: flex;
    justify-content: space-around;
    .flex-item {
      margin: 5px 0;
      width:24%;
      color:#666;
      text-align: center;
    }
  }
  .btn-submit {
    padding: 10px 25px;
    color: white;
    background:  linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
    border-radius: 30px;
    white-space: nowrap;
    font-size: 12px;
  }
  .card {
    padding: 5px 0 30px;
  }
  .backg {
    background:  linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
  }
</style>
