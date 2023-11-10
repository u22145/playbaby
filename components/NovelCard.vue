<template>
    <div class="novel-card">
        <div class="novel-owner">
            <div class="flex-item"><img src="https://via.placeholder.com/300" alt=""> </div>
            <div class="flex-item">
                <div><span>admin</span></div>
                <div><Tag :content="25" :color="`blue`" :type="`gender`" /></div>
            </div>
        </div>
                <div>novel title</div>
        <div> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
    </div>
</template>

<style lang="scss">
    .novel-owner {
        display: flex;
        padding: 10px 0;

        .flex-item {
            margin: 0 5px;

        }
    }
</style>