<template>
		<el-header style="text-align: right; font-size: 12px">
		<div class="name"><span>{{this.$store.state.username}} </span ><span @click="logout">|  退出</span></div>
		<div class="block"><el-avatar shape="square" :size="50" :src="this.$store.state.avatar"></el-avatar></div>
		
		</el-header>
</template>

<script>
	import {getHeader} from '../../network/users.js'
	
	export default {
		name: 'Header',
		data() {
			return {
				
			}
		},
		data(){
			return {
				squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
			}
		},
		methods: {
			logout() {
				window.localStorage.clear()
				this.$router.push('/login')
			}
		},
		created() {
		
		
		},
		mounted() {
			setTimeout(() => {
				if(this.$route.path != '/login') {
					console.log(111)
					getHeader().then(res => {
						console.log(res)
						this.$store.commit('changeUsername',res.data.username)
						this.$store.commit('changeAvatar',res.data.avatar)
					})
				}
			},500)
		},
		watch: {
			// '$route.path': {
			// 	handler: function(newVal, oldVal) {
			// 		if(newVal != '/login') {
			// 			getHeader().then(res => {
			// 				console.log(res)
			// 				this.$store.commit('changeUsername',res.data.username)
			// 				this.$store.commit('changeAvatar',res.data.avatar)
			// 			})
			// 		}
			// 	}
			// }
		}
		
	}
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		
	}
	.name {
		display: inline-block;
		height: 50px;
		margin-right: 10px;
	}
	.name span:first-child {
		font-weight: bold;
	}
	
	.block {
		display: inline-block;
		padding-top: 5px;
	}
</style>
