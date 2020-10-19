<template>
	<div>
		<div class="h-t" :class="{'is_fixed': isFixed, 'tc': isFixed}">
			<h2>{{this.blog.title}}</h2>
			<div class="fgx"></div>
		</div>
		<div class="contnet"></div>
	</div>
</template>

<script>
	import { getBlog } from '../../network/blog.js'
	
	export default {
		name: 'blogDetail',
		data() {
			return {
				blog: {},
				content: null,
				isFixed: false
			}
		},
		created() {
			getBlog(this.$route.params.id).then(res => {
				this.blog = res.data.data[0]
				console.log(this.blog)
				this.content.innerHTML = this.blog.content
				
			}) 
		},
		mounted() {
			this.content = document.querySelector('.contnet')
			window.addEventListener('scroll', this.handleScroll)
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let offsetTop = document.querySelector('.h-t').offsetTop
				this.isFixed = scrollTop > 60 ? true : false;
			}
		}
	}
</script>

<style >
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}
	 .contnet table {
	  border-top: 1px solid #ccc;
	  border-left: 1px solid #ccc;
	}
	.contnet table td
	 {
	  border-bottom: 1px solid #ccc;
	  border-right: 1px solid #ccc;
	  padding: 3px 5px;
	}
	.contnet table th {
		  border-right: 1px solid #ccc;
	  border-bottom: 2px solid #ccc;
	  text-align: center;
	}
	
	/* blockquote 样式 */
	blockquote {
	  display: block;
	  border-left: 8px solid #d0e5f2;
	  padding: 5px 10px;
	  margin: 10px 0;
	  line-height: 1.4;
	  font-size: 100%;
	  background-color: #f1f1f1;
	}
	
	/* code 样式 */
	code {
	  display: inline-block;
	  *display: inline;
	  *zoom: 1;
	  background-color: #f1f1f1;
	  border-radius: 3px;
	  padding: 3px 5px;
	  margin: 0 3px;
	}
	pre code {
	  display: block;
	}
	
	/* ul ol 样式 */
	ul, ol {
	  margin: 10px 0 10px 20px;
	}
	.tc {
		width: calc(100% - 200px);
		background-color: white
	}
</style>
