import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ac379300 = () => interopDefault(import('../pages/deleted.vue' /* webpackChunkName: "pages/deleted" */))
const _46df5af6 = () => interopDefault(import('../pages/deposit.vue' /* webpackChunkName: "pages/deposit" */))
const _f22cbc68 = () => interopDefault(import('../pages/deposit-history.vue' /* webpackChunkName: "pages/deposit-history" */))
const _92c046fe = () => interopDefault(import('../pages/earn.vue' /* webpackChunkName: "pages/earn" */))
const _152e130f = () => interopDefault(import('../pages/earnmoney.vue' /* webpackChunkName: "pages/earnmoney" */))
const _48b83a01 = () => interopDefault(import('../pages/editInfo.vue' /* webpackChunkName: "pages/editInfo" */))
const _3bec7832 = () => interopDefault(import('../pages/fans-list.vue' /* webpackChunkName: "pages/fans-list" */))
const _6292ce7a = () => interopDefault(import('../pages/following-list.vue' /* webpackChunkName: "pages/following-list" */))
const _5115c214 = () => interopDefault(import('../pages/forget_password.vue' /* webpackChunkName: "pages/forget_password" */))
const _c72f06b6 = () => interopDefault(import('../pages/host-verify.vue' /* webpackChunkName: "pages/host-verify" */))
const _17b9321c = () => interopDefault(import('../pages/invite.vue' /* webpackChunkName: "pages/invite" */))
const _42983c89 = () => interopDefault(import('../pages/invite-friend.vue' /* webpackChunkName: "pages/invite-friend" */))
const _43b2a330 = () => interopDefault(import('../pages/inviteFriend.vue' /* webpackChunkName: "pages/inviteFriend" */))
const _e2f8d4e0 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _126a6150 = () => interopDefault(import('../pages/my/index.vue' /* webpackChunkName: "pages/my/index" */))
const _5758266e = () => interopDefault(import('../pages/myWallet.vue' /* webpackChunkName: "pages/myWallet" */))
const _292be74b = () => interopDefault(import('../pages/papa.vue' /* webpackChunkName: "pages/papa" */))
const _4249cde8 = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _54fa995c = () => interopDefault(import('../pages/post-list.vue' /* webpackChunkName: "pages/post-list" */))
const _5eb17c1d = () => interopDefault(import('../pages/ranking.vue' /* webpackChunkName: "pages/ranking" */))
const _40ead94c = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _a7f2b11e = () => interopDefault(import('../pages/register-2.vue' /* webpackChunkName: "pages/register-2" */))
const _144fdda5 = () => interopDefault(import('../pages/rule.vue' /* webpackChunkName: "pages/rule" */))
const _42643048 = () => interopDefault(import('../pages/streamContainer.vue' /* webpackChunkName: "pages/streamContainer" */))
const _5a6834e8 = () => interopDefault(import('../pages/streamHome.vue' /* webpackChunkName: "pages/streamHome" */))
const _87bb6882 = () => interopDefault(import('../pages/streaming-client.vue' /* webpackChunkName: "pages/streaming-client" */))
const _247d1e1c = () => interopDefault(import('../pages/streaming-host.vue' /* webpackChunkName: "pages/streaming-host" */))
const _2d0405da = () => interopDefault(import('../pages/submitVerify.vue' /* webpackChunkName: "pages/submitVerify" */))
const _3fcf93e2 = () => interopDefault(import('../pages/wallet.vue' /* webpackChunkName: "pages/wallet" */))
const _07e12a33 = () => interopDefault(import('../pages/withdraw.vue' /* webpackChunkName: "pages/withdraw" */))
const _bc12290c = () => interopDefault(import('../pages/withdraw-history.vue' /* webpackChunkName: "pages/withdraw-history" */))
const _adced032 = () => interopDefault(import('../pages/popup/popup-template.vue' /* webpackChunkName: "pages/popup/popup-template" */))
const _97c22aa0 = () => interopDefault(import('../pages/post/article.vue' /* webpackChunkName: "pages/post/article" */))
const _1f97bb50 = () => interopDefault(import('../pages/post/papa.vue' /* webpackChunkName: "pages/post/papa" */))
const _74f01faf = () => interopDefault(import('../pages/post/story.vue' /* webpackChunkName: "pages/post/story" */))
const _5e700835 = () => interopDefault(import('../pages/post/video.vue' /* webpackChunkName: "pages/post/video" */))
const _f92750f0 = () => interopDefault(import('../pages/share/agoraFunction.js' /* webpackChunkName: "pages/share/agoraFunction" */))
const _1940170b = () => interopDefault(import('../pages/share/event-bus.js' /* webpackChunkName: "pages/share/event-bus" */))
const _191dbbee = () => interopDefault(import('../pages/share/social.js' /* webpackChunkName: "pages/share/social" */))
const _17669ddc = () => interopDefault(import('../pages/host-verify-page/_id.vue' /* webpackChunkName: "pages/host-verify-page/_id" */))
const _30f4c7c0 = () => interopDefault(import('../pages/my/_id.vue' /* webpackChunkName: "pages/my/_id" */))
const _789eaafc = () => interopDefault(import('../pages/pagecomment/_id.vue' /* webpackChunkName: "pages/pagecomment/_id" */))
const _6550bfde = () => interopDefault(import('../pages/pageinfo/_id.vue' /* webpackChunkName: "pages/pageinfo/_id" */))
const _76481b0e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _b0a7b9d2 = () => interopDefault(import('../pages/index/care.vue' /* webpackChunkName: "pages/index/care" */))
const _5feca805 = () => interopDefault(import('../pages/index/nearby.vue' /* webpackChunkName: "pages/index/nearby" */))
const _91bcd50a = () => interopDefault(import('../pages/index/nearbyaction.vue' /* webpackChunkName: "pages/index/nearbyaction" */))
const _31fb62a6 = () => interopDefault(import('../pages/index/novel.vue' /* webpackChunkName: "pages/index/novel" */))
const _a9ccb7b4 = () => interopDefault(import('../pages/index/recommend.vue' /* webpackChunkName: "pages/index/recommend" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/deleted",
    component: _ac379300,
    name: "deleted"
  }, {
    path: "/deposit",
    component: _46df5af6,
    name: "deposit"
  }, {
    path: "/deposit-history",
    component: _f22cbc68,
    name: "deposit-history"
  }, {
    path: "/earn",
    component: _92c046fe,
    name: "earn"
  }, {
    path: "/earnmoney",
    component: _152e130f,
    name: "earnmoney"
  }, {
    path: "/editInfo",
    component: _48b83a01,
    name: "editInfo"
  }, {
    path: "/fans-list",
    component: _3bec7832,
    name: "fans-list"
  }, {
    path: "/following-list",
    component: _6292ce7a,
    name: "following-list"
  }, {
    path: "/forget_password",
    component: _5115c214,
    name: "forget_password"
  }, {
    path: "/host-verify",
    component: _c72f06b6,
    name: "host-verify"
  }, {
    path: "/invite",
    component: _17b9321c,
    name: "invite"
  }, {
    path: "/invite-friend",
    component: _42983c89,
    name: "invite-friend"
  }, {
    path: "/inviteFriend",
    component: _43b2a330,
    name: "inviteFriend"
  }, {
    path: "/login",
    component: _e2f8d4e0,
    name: "login"
  }, {
    path: "/my",
    component: _126a6150,
    name: "my"
  }, {
    path: "/myWallet",
    component: _5758266e,
    name: "myWallet"
  }, {
    path: "/papa",
    component: _292be74b,
    name: "papa"
  }, {
    path: "/post",
    component: _4249cde8,
    name: "post"
  }, {
    path: "/post-list",
    component: _54fa995c,
    name: "post-list"
  }, {
    path: "/ranking",
    component: _5eb17c1d,
    name: "ranking"
  }, {
    path: "/register",
    component: _40ead94c,
    name: "register"
  }, {
    path: "/register-2",
    component: _a7f2b11e,
    name: "register-2"
  }, {
    path: "/rule",
    component: _144fdda5,
    name: "rule"
  }, {
    path: "/streamContainer",
    component: _42643048,
    name: "streamContainer"
  }, {
    path: "/streamHome",
    component: _5a6834e8,
    name: "streamHome"
  }, {
    path: "/streaming-client",
    component: _87bb6882,
    name: "streaming-client"
  }, {
    path: "/streaming-host",
    component: _247d1e1c,
    name: "streaming-host"
  }, {
    path: "/submitVerify",
    component: _2d0405da,
    name: "submitVerify"
  }, {
    path: "/wallet",
    component: _3fcf93e2,
    name: "wallet"
  }, {
    path: "/withdraw",
    component: _07e12a33,
    name: "withdraw"
  }, {
    path: "/withdraw-history",
    component: _bc12290c,
    name: "withdraw-history"
  }, {
    path: "/popup/popup-template",
    component: _adced032,
    name: "popup-popup-template"
  }, {
    path: "/post/article",
    component: _97c22aa0,
    name: "post-article"
  }, {
    path: "/post/papa",
    component: _1f97bb50,
    name: "post-papa"
  }, {
    path: "/post/story",
    component: _74f01faf,
    name: "post-story"
  }, {
    path: "/post/video",
    component: _5e700835,
    name: "post-video"
  }, {
    path: "/share/agoraFunction",
    component: _f92750f0,
    name: "share-agoraFunction"
  }, {
    path: "/share/event-bus",
    component: _1940170b,
    name: "share-event-bus"
  }, {
    path: "/share/social",
    component: _191dbbee,
    name: "share-social"
  }, {
    path: "/host-verify-page/:id?",
    component: _17669ddc,
    name: "host-verify-page-id"
  }, {
    path: "/my/:id",
    component: _30f4c7c0,
    name: "my-id"
  }, {
    path: "/pagecomment/:id?",
    component: _789eaafc,
    name: "pagecomment-id"
  }, {
    path: "/pageinfo/:id?",
    component: _6550bfde,
    name: "pageinfo-id"
  }, {
    path: "/",
    component: _76481b0e,
    name: "index",
    children: [{
      path: "care",
      component: _b0a7b9d2,
      name: "index-care"
    }, {
      path: "nearby",
      component: _5feca805,
      name: "index-nearby"
    }, {
      path: "nearbyaction",
      component: _91bcd50a,
      name: "index-nearbyaction"
    }, {
      path: "novel",
      component: _31fb62a6,
      name: "index-novel"
    }, {
      path: "recommend",
      component: _a9ccb7b4,
      name: "index-recommend"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
