export default function ({ store, redirect }) {
    // If the user is not authenticated
    // if (!store.state.authenticated) {
    //   return redirect('/login')
    // }
    if (!process.server) {
    //   debugger
    if(sessionStorage.getItem("pbUid") && sessionStorage.getItem("pbUserCode")) {
        store.commit('setUid', sessionStorage.getItem('pbUid'))
        store.commit('setUserCode', sessionStorage.getItem('pbUserCode'))
        store.commit('setLogin', true)
      }
    console.log(store.state.isLogin)
       if(!store.state.isLogin) {
        console.log(store.state)
        return redirect('/login')
      }
    }
  }