<template>
    
    <div class="tag" :class="[
    tagColor,
    tagIsRect ? 'rect' : ''
    ]">
        <span v-if="tagType=='gender'"></span>
        <span v-if="tagType=='location'"></span>
        <span v-if="tagType=='hash'"># </span>
        {{this.tagContent}}
    </div>
</template>
<script>
export default {
props: ['content', 'color', 'type', 'isRect'],
  data() {
    return {
      tagContent: this.content ? this.content : "",
      tagColor: this.color ? this.color : "white",
      tagType: this.type ? this.type : null,
      tagIsRect: this.isRect 
    }
  },
  computed: {
      
  },
  mounted() {
  }
}
</script>  
<style lang="scss">
    .tag {
    color: white;
    float: left;
    border-radius: 30px;
    display: inline-block;
    padding: 1px 10px;
    margin: 0 5px 0 0 ;
    font-size: 12px;
        &.rect {
            border-radius: 0;
        }
    }
    .red {
        background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
    }
    .pink2 {
        background: rgb(214, 84, 84);
    }
    .yellow {
        background: rgb(224, 195, 29);
    }
    .blue {
        background: rgb(25, 140, 207)
    }
    .light-blue {
        background: lightblue;
    }
    .green-o {
        background: rgb(96, 173, 96);
    }
</style>