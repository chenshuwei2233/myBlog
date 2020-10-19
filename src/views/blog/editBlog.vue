<template>
	<div class="edit-blog">
		<h2>编辑博客</h2>
		<div class="fgx"></div>
		<el-form ref="form" :model="blog" label-width="80px" label-position='right' @submit.native.prevent="editBlog">
			<el-form-item label="博客标题">
				<el-input v-model="blog.title"></el-input>
			</el-form-item>
			<div class="all">
				<div class="sort">
					<el-form-item label="博客分类">
						<el-input v-model="blog.sort"></el-input>
					</el-form-item>
				</div>
				<div class="label">
					<el-form-item label="博客标签">
						<el-input v-model="blog.label"></el-input>
					</el-form-item>
				</div>
			</div>
			<wangEditor ref='editor' ></wangEditor>
			<div class="btn">
				<el-button type="primary" native-type="submit">编辑博客</el-button>
				<el-button>取消</el-button>
			</div>

		</el-form>
	</div>
</template>

<script>
	import wangEditor from '../../components/editor/wangEditor.vue'
	import { getBlog,updateBlog } from '../../network/blog.js'
	export default {
		name: 'editBlog',
		components: {
			wangEditor
		},
		data() {
			return {
				blog: {
					author: '',
					content: '',
					title: '',
					sort: '',
					label: '',
				},
				blogContent: ''
			}
		},
		created() {
			getBlog(this.$route.params.id).then(res => {
				console.log(res)
				this.blog = res.data.data[0];
				this.blogContent = this.blog.content
				this.$refs.editor.editor.txt.html(this.blogContent)
			})
		},
		methods: {
			editBlog() {
				this.blog.author = this.$store.state.username
				this.blog.content = this.$refs.editor.editor.txt.html()
				updateBlog(this.$route.params.id,this.blog).then(res => {
					this.$message({
						message: '更新博客成功',
						type: 'success'
					})
					this.$router.push('/blogs/list')
				})
			}
		}
	}
</script>

<style>
	.edit-blog {
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
		margin-top: 10px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
