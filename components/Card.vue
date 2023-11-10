<template>
    <div class="card">
        <div class="user">
            <img class="thumbnail" src="https://via.placeholder.com/300" alt="">
            <div>
                <div class="name">Baby官方君</div>
                <div>
                    <Tag :content="25" :color="`red`" :type="`gender`" />
                    <span class="region"><img src="https://via.placeholder.com/300" alt=""></span>
                </div>
            </div>
        </div>
        <div class="media">
            <img src="https://via.placeholder.com/300" alt="">
            <div class="content">
                平台招募主播
            </div>
        </div>
        <div class="social">

        </div>
    </div>
</template>

<style lang="scss">
    
    .user {
        display: flex;
              margin:8px 0;
        // margin-bottom: 20px;
    } 
    .thumbnail {
        width: 50px;
        height: 50px;
        
        border-radius: 100%;
        margin: 0 10px;
    }
    .region img{
        width: 20px;
        height: 20px;
        border-radius: 100%;
        float:left;
    }
    .name {
        margin:3px 0 5px;
        color:#333333;
    }
    .content {
        margin: 5px 15px;
    }
    .media img {
        width:100%;
    }
</style>