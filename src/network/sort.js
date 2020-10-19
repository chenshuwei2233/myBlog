import { request } from './request.js'

export function getSortData(page) {
	 return request({
		 url: '/sorts/list',
		 params: {
			 page
		 }
	 })
 }
 
 export function addSort(data) {
 	 return request({
 		 // headers: {'Content-Type':'application/x-www-form-urlencoded'},
 		 method: 'post',
 		 url: '/sorts/addSort',
 		 data
 	 }) 
 }
 
 export function delSort(id) {
 	 return request({
 		 method: 'post',
 		 url: '/sorts/delSort',
 		 params: {
 			 id
 		 }
 	 })
 }
 
 export function updateSort(id,data) {
 	 return request({
 		 method: 'post',
 		 url: '/sorts/update',
 		 params: {
 			 id
 		 },
 			data
 	 })
 }
 