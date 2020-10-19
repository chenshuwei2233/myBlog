<template>
	<div id="app">
		<login v-if="!isTrue"></login>
		<Header v-if='isTrue' class='header'></Header>
		<container v-if="isTrue">
			
				
					<Aside ref='aside'  :class="{'is_fixed': isFixed}"></Aside>
					
					<el-main class='main' :class="{'left': isFixed}" >
						<keep-alive exclude="blogDetail">
							<router-view></router-view>
						</keep-alive>
							
						
					</el-main>
				
			
		</container>
	</div>
</template>

<script>
	import Container from './components/container/Container.vue'
	import Header from './components/container/Header.vue'
	import Aside from './components/container/Aside.vue'
	import login from './views/login/Login.vue'
	export default {
		name: 'app',
		components: {
			Container,
			Header,
			Aside,
			login
		},
		data() {
			return {
				isTrue: true,
				isFixed: false
			
			}
		},
		watch: {
			'$route.path':function(newVal,oldVal) {
				console.log(newVal)
				if(newVal === '/login') {
					this.isTrue = false
					window.removeEventListener('scroll', this.handleScroll)
				} else {
					this.isTrue = true
				}
			}
		},
		mounted(){
				　window.addEventListener('scroll',this.handleScroll)
		},
		
		methods:  {
			handleScroll() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
				let offsetTop = this.$refs.aside.$el.offsetTop
				if(this.$route.path == '/blogs/detail/' + this.$route.params.id  ) {
					this.isFixed = scrollTop > offsetTop ? true : false;
				}
				
			}
		}
	}
</script>

<style>
	html,
	body {
		padding: 0;
		margin: 0;
	}
	.is_fixed {
		top: 0;
		position: fixed;
		z-index: 8;
	}
	.left {
		margin-left: 200px;
	}
	
</style>
