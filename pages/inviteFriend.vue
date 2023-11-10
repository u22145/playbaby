<template>
    <div class="invite">
        <div class="card"><Back/> invite to earn money </div>
        <div class="share">
            <div>
                <div>Asset income</div>
                <div>0.00BABY</div>
            </div>
            <div></div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$store.commit("setIsHeaderShow", false)
    }
}
</script>
<style lang="scss">
    .invite {
        padding-top: 60px;
        .card {
            background: yellow;
        }
        .share {    
            padding: 20px 0;
            background: linear-gradient(90deg, #6a3a93 0%, #e83f6f 100%);
        }
    }
</style>