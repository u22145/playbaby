<template>
    <div class="my-wallet">
        <component v-bind:is="component" /> 
    </div>
</template>
<style lang="scss">
</style>
<script>
    
    import '@/utils/mixins';
    import Deposit from './deposit'
    import Withdraw from './withdraw'
    import withdrawHistory from './withdraw-history'
    import depositHistory from './deposit-history'
    import Wallet from './wallet'
    export default {
        components: {
            Deposit,
            Withdraw,
            depositHistory,
            withdrawHistory,
            Wallet
        },
        data() {
            return {
                component:"Wallet"
            }
        },

    }
</script>