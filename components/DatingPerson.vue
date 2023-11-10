<template>
    <div class="dating-person">
        <div class="flex-item"><img :src=" img +'.png'" alt=""> </div>
        <div class="flex-item">
            <div class="name-container"><span class="name">{{name}}</span><Tag :content="age" :color="`red`" :type="`gender`" /></div>
            <div class="tag-container">
                <Tag :content="addr" :color="`pink2`" />
                <Tag :content="`約吃`" :color="`yellow`" />
                <Tag :content="`遊戲開黑`" :color="`blue`"  />
            </div>
            <div class="status-container"><Tag :content="`・在線`" :color="`green-o`" :isRect="true" style="border-radius:5px" /></div>
        </div>
    </div>
</template>
<script>

import '@/utils/mixins';
export default {
    props: ["img","age","name","addr"],
    data() {
        return {

        }
    }
}
</script>
<style lang="scss">
    .dating-person {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        .status-container .tag {
            margin-top: 5px;
        }
        .tag-container {
            margin: 10px 0;
        }
        .name-container {
            overflow: hidden;
            .tag {
                margin-top: 6px;
                margin-left: 5px;
            }
        }
        .flex-item {
            margin: 0 5px;
            .name {
                float: left;
            } 
            img {
                margin-top: 20px;
                width: 50px;
                height: 50px;
                border-radius: 100%;
            }
        }
    }
</style>