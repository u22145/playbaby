import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        uid: "",
        usercode: "",
        nickname: "",
        avatar: "",
        active: "",
        isLogin: false,
        isVideoShow: false,
        amount: 0,
        pageId:'',
        userInfo: {},
        setReview:{},
        showPostPopup: false,
        isHeaderShow: true,
        isFooterShow: true
    },
    mutations: {
        setUid(state, uid) {
            state.uid = uid
        },
        setUserCode(state, usercode) {
            state.usercode = usercode
        },
        setNickName(state, nickname) {
            state.nickname = nickname
        },
        setLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        setIsHeaderShow(state, isHeaderShow) {
            state.isHeaderShow = isHeaderShow
        },
        setIsFooterShow(state, isFooterShow) {
            state.isFooterShow = isFooterShow
        },
        setAmount(state, amount) {
            state.amount = amount
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setPopup(state, showPostPopup) {
            state.showPostPopup = showPostPopup
        },
        setReview(state, setReview) {
            state.setReview = setReview
        }
    },
    getters: {
        getUid: state => {
            return state.uid
        },
        getUserCode: state => {
            return state.usercode
        },
        getNickName: state => {
            return state.nickname
        },
        getIsLogin: state => {
            return state.isLogin
        },
        getAmount: state => {
            return state.amount
        },
        getUserInfo: state => {
            return state.userInfo
        },
        getShowPostPopup: state => {
            return state.showPostPopup
        }
    }
})

export default store;
