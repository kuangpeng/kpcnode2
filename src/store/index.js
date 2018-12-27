export default{
    state: {
        loginUser: null,
        access_token: ''
    },
    getters: {
        getLoginUser: function(state) {
            return state.loginUser?state.loginUser:(localStorage.getItem('loginUser')?JSON.parse(localStorage.getItem('loginUser')):null);
        },
        getToken: function(state){
            return state.access_token?state.access_token:(localStorage.getItem('accesstoken')||'');
        }
    },
    mutations: {
        updateLoginUser: function(state, user) {
            state.LoginUser = user;
            localStorage.setItem('loginUser', JSON.stringify(user));  
        },
        updateToken: function(state, token) {
            state.access_token = token;
            localStorage.setItem('accesstoken', token);
        }
    },
    actions: {

    }
}