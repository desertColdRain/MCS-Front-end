import cookie from 'js-cookie'
export default{
    state: {
        token: '',
        username: '',
        pubKey: '',
        address: ''
       
    },
    mutations: {
        setUsername(state,username){
            state.username = username
            cookie.set('username',username)
        },
        setPubKey(state,pubKey){
            state.pubKey = pubKey
            cookie.set('pubKey',pubKey)
        },
        setAddress(state,address){
            state.address = address
            cookie.set('address',address)
        },
        setToken(state,val){
            state.token = val
            cookie.set('token',val)
        },
        clearToken(state){
            state.token = ''
            cookie.remove('token')
        },
        clearPubKey(state){
            state.pubKey = ''
            cookie.remove('pubKey')
        },
        clearAddress(state){
            state.address = ''
            cookie.remove('address')
        },
        clearUsername(state){
            state.username = ''
            cookie.remove('username')
        },
        getToken(state){
            state.token = state.token || cookie.get('token')
        },
        getUsername(state){
            state.username = state.username || cookie.get('username')
        },
        getAddress(state){
            state.address = state.address || cookie.get('address')
        },
        getPubKey(state){
            state.pubKey = state.pubKey || cookie.get('pubKey')
        },
        
    }
}