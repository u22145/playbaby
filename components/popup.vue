<template>
    <div class="popup_wrapper">
        <back />
            <div class="flex-item">
                <div><span>POPUP</span></div>
        </div>
        <div class="popup_mask">
        </div>
    </div>
</template>

<style lang="scss">
.popup_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    // @extend .unselect;

    .popup_mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background:  linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        opacity: 0.2;
    }
}
    .flex-item {
      margin: 5px;
      text-align: center;
    }
</style>







