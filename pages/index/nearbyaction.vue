<template>
    <div class="nearby gray">
        <DatingPerson img="a1" age="21" name="芸宝" addr="寧波"/>
        <DatingPerson img="a2" age="27" name="Sandy甜" addr="杭州"/>
        <DatingPerson img="a4" age="24" name="安吉兒" addr="成都"/>
        <DatingPerson img="a6" age="28" name="小蕾" addr="上海"/>
    </div>
</template>
<style lang="scss">
    .dating-type-container {
        background: #fff;
        margin-bottom: 10px;
        padding: 10px;
    }
    .nearby .flex-item img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }

    .date {
        background: white;
    }
    select {
        -webkit-appearance: none;
        border: 0;
        width: 100%;
        height: 30px; 
    }
    // .arrow {
    //     border: solid black;
    //     border-width: 0 3px 3px 0;
    //     display: inline-block;
    //     padding: 3px;
    // }
    .gray {
        .flex-item {
            position: relative;
        }
        .arrow {
            position: absolute;
            right: -25px;
            bottom: 12px;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {

        },
        mounted() {
        },
        methods: {
            toggleFocus(event) {

            }
        }
    }
</script>  