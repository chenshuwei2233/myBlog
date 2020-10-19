import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//存储token
		authorization: localStorage.getItem('authorization') ? localStorage.getItem('authorization') : '',
		username: '',
		avatar: ''
	},
	mutations: {
		//修改token,并将token存入localStorage
		changeLogin(state, user) {
			state.authorization = user.authorization;
			localStorage.setItem('authorization', user.authorization)
		},
		changeUsername(state, username) {
			state.username = username
		},
		changeAvatar(state, avatar) {
			state.avatar = avatar
		}
	}
})

export default store