<template>
    <div class="card">
        <div class="user">
            <img class="thumbnail flex-item" src="https://via.placeholder.com/300" alt="">
            <div class="flex-item">
                <div>
                    <span class="name">Baby官方君</span>
                    <Tag :content="25" :color="`red`" :type="`gender`" />
                    <Tag :content="`VIP`" :color="`yellow`"  />
                </div>
                <div>
                    <div class="time">2020-07-12</div>
                </div>
            </div>
            
        </div>
        <div class="content">
            平台招募主播
        </div>
        <div class="sub-card">
            <div><i></i>約吃</div>
            <div><i></i>2020-11-01</div>
            <div><i></i>成都市 <Tag :content="`四川省`" type="`location`"  /></div>
            <div><i></i>風趣幽默/看感覺/大方</div>
        </div>
    </div>
</template>

<style lang="scss">
    
    .user {
        display: flex;
        // margin: 10px;
              margin:8px 0;
    } 
    .thumbnail {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin-right: 25px;
    }
    .content {
        margin-bottom: 5px;
    }
    .sub-card {
        background: #eee;
        padding: 20px;
        > div {
            margin-bottom: 10px;
        }
    }
</style>