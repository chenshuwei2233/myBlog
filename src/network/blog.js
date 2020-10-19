import { request } from './request.js'

export function getBlogData(title,page) {
	return request({
		url: '/blogs/list',
		params: {
			title,
			page
		}
	})
}

export function addBlog(data) {
	 return request({
		 // headers: {'Content-Type':'application/x-www-form-urlencoded'},
		 method: 'post',
		 url: '/blogs/addBlog',
		 data
	 }) 
 }
 
 export function getBlog(id) {
	 return request({
		 url: '/blogs/detail',
		 params: {
			 id
		 }
	 })
 }
 
 export function delBlog(id) {
 	 return request({
 		 method: 'post',
 		 url: '/blogs/delBlog',
 		 params: {
 			 id
 		 }
 	 })
 }
 
 export function updateBlog(id,data) {
 	 return request({
 		 method: 'post',
 		 url: '/blogs/update',
 		 params: {
 			 id
 		 },
 			data
 	 })
 }