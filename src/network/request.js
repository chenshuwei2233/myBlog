const axios = require('axios')

export function request(config) {
	const instance = axios.create({
		baseURL: 'http://localhost:3000/api',
	})
	
	instance.interceptors.request.use(config => {
		if(localStorage.getItem('authorization')) {
			config.headers.authorization = localStorage.getItem('authorization')
		}
		return config
	}, err => {
		console.log(err)
	})
	
	instance.interceptors.response.use(res => {
		return res;
	}, err => {
		console.log(err)
	})
	return instance(config)
}