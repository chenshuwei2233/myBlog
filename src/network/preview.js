import { request } from './request.js'

export function getPreViewData(title,pre,page) {
	return request({
		url: '/previews/list',
		params: {
			title,
			pre,
			page
		}
	})
}

 export function delPreView(id) {
 	 return request({
 		 method: 'post',
 		 url: '/previews/delPreView',
 		 params: {
 			 id
 		 }
 	 })
 }
 
 export function updateRotation(id,data) {
 	 return request({
 		 method: 'post',
 		 url: '/previews/update',
 		 params: {
 			 id
 		 },
 			data
 	 })
 }