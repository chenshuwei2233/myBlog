<template>
	<div class="create-blog">
		<h2>新建博客</h2>
		<div class="fgx"></div>
		
		<el-form ref="form" :model="blog" label-width="80px" label-position='right' @submit.native.prevent="addBlog">
			<el-form-item label="博客标题">
				<el-input v-model="blog.title"></el-input>
			</el-form-item>
			<div class="all">
				<div class="sort">
					<el-form-item label="博客分类">
						<el-select v-model="value" placeholder="请选择" style='width: 100%;' @change='sort'>
							<el-option v-for="item in options" 
							:key="item.value" 
							:label="item.label" 
							:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="label">
					<el-form-item label="博客标签">
						<el-input v-model="blog.label"></el-input>
					</el-form-item>
				</div>
			</div>
			
			<wangEditor ref='editor' class='editor'></wangEditor>
			<div class="btn">
				<el-button type="primary" native-type="submit">创建博客</el-button>
				<el-button>取消</el-button>
			</div>

		</el-form>
		
	</div>
</template>

<script>
	import wangEditor from '../../components/editor/wangEditor.vue'
	import {
		addBlog
	} from '../../network/blog.js'
	import {
		getSortData
	} from '../../network/sort.js'
	export default {
		name: 'createBlog',
		data() {
			return {
				blog: {
					author: '',
					content: '',
					title: '',
					sort: '',
					label: '',
					rotation: ''
				},
				// options: [{
				// 	value: '黄金糕',
				// 	label: '黄金糕'
				// }, {
				// 	value: '双皮奶',
				// 	label: '双皮奶'
				// }, {
				// 	value: '蚵仔煎',
				// 	label: '蚵仔煎'
				// }, {
				// 	value: '龙须面',
				// 	label: '龙须面'
				// }, {
				// 	value: '北京烤鸭',
				// 	label: '北京烤鸭'
				// }],
				value: '',
				sortData: []
			}
		},
		computed: {
			options() {
				var options = [];
				this.sortData.forEach((val, index) => {
					var obj = {}
					obj.value = val.sorts
					obj.lable = val.sorts
					options.push(obj)
				})
				return options
			}
		},
		components: {
			wangEditor
		},
		created() {
			getSortData(0).then(res => {
				this.sortData = res.data.data;
				console.log(this.sortData)
			})
		},
		methods: {
			addBlog() {
				this.blog.author = this.$store.state.username
				this.blog.sort = this.value
				this.blog.content = this.$refs.editor.editorContent
				this.blog.rotation = 0
				console.log(this.blog)
				for (var key in this.blog) {
					if (this.blog[key] === '') {
						alert('请输入对应值')
						return
					}
				}
				addBlog(this.blog).then(res => {
					this.$message({
						message: '添加博客成功',
						type: 'success'
					})
					this.$router.push('/blogs/list')
				})
			},
			sort() {
				console.log(this.value)
			}
		}
	}
</script>

<style>
	.create-blog {
		position: relative;
	}

	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}

	.all {
		display: flex;
	}

	.sort,
	.label {
		flex: 1;
	}

	.btn {
		position: absolute;
		margin-top: 10px;
		left: 50%;
		transform: translateX(-50%)
	}
	.el-select-dropdown {
		z-index: 100000!important;
	}
	
</style>
