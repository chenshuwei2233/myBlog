import { request } from './request.js'
 
 export function addUser(data) {
	 return request({
		 // headers: {'Content-Type':'application/x-www-form-urlencoded'},
		 method: 'post',
		 url: '/users/addUser',
		 data
	 }) 
 }
 
 
 export function getUserData(username,page) {
	 return request({
		 url: '/users/list',
		 params: {
				username,
			 page
		 }
	 })
 }
 
 export function delUser(id) {
	 return request({
		 method: 'post',
		 url: '/users/delUser',
		 params: {
			 id
		 }
	 })
 }
 
 export function userDetail(id) {
	 return request({
		 url: '/users/detail',
		 params: {
			 id
		 }
	 })
 }
 
 export function updateUser(id,data) {
	 return request({
		 method: 'post',
		 url: '/users/update',
		 params: {
			 id
		 },
			data
	 })
 }
 
 export function Login(data) {
	 return request({
		 method: 'post',
		 url: '/users/login',
		 data
	 })
 }
 
 export function getHeader() {
	 return request({
		 url: '/users/header'
	 })
 }