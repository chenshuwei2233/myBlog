<template>
	<div class="blogList">
		<h2>博客列表</h2>
		<div class="fgx"></div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="文章标题">
				<el-input v-model="formInline.title" placeholder="文章标题"></el-input>
			</el-form-item>
		
			<el-form-item>
				<el-button type="primary"  @click="Query">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
		    :data="tableData"
		    style="width: 100%"
				@row-dblclick='getDetail'>
				<el-table-column
					prop="id"
				  label="ID"
				  width="50">
				</el-table-column>
		    <el-table-column
					prop="title"
		      label="标题"
		      width="250"
					
					>
		    </el-table-column>
		    <el-table-column
					prop='author'
		      label="作者"
		      width="100">
		    </el-table-column>
				<el-table-column
					prop='sort'
				  label="分类"
				  width="100">
				</el-table-column>
				<el-table-column
					prop='createDate'
				  label="创建时间"
				  width="200">
				</el-table-column>
				<el-table-column
					prop='updateDate'
				  label="更新时间"
				  width="200">
				</el-table-column>
			
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="Edit(scope.row.id)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="Delete(scope.row.id)">删除</el-button>
		      </template>
		    </el-table-column>
			</el-table>
			
			<div class="btn">
				<el-row>
				  <el-button size="small" @click="deOne" ><i class="el-icon-arrow-left"></i>上一页</el-button>
					<el-button size="small" @click="addOne">下一页<i class="el-icon-arrow-right"></i></el-button>
				</el-row>
			</div>
	</div>
</template>

<script>
	import { getBlogData, delBlog } from '../../network/blog.js'	
	export default {
		name: 'blogList',
		data() {
			return {
				formInline: {
					title: ''
				},
				tableData: [],
				page: 0
			}
		},
		created() {
			this.fetch()
		},
		methods:{
			fetch() {
				getBlogData(this.formInline.title, this.page).then(res => {
					console.log(res)
					this.tableData = res.data.data
				})
			},
			Query() {
				this.page = 0;
				this.fetch()
			},
			addOne() {
				this.page += 5;
				getBlogData(this.formInline.title,this.page).then(res => {
					if(res.data.data.length === 0) {
						this.page -= 5
						return 
					}
					this.tableData = res.data.data
					console.log(this.tableData)
				})
				
			},
			deOne() {
				if(this.page === 0) {
					return 
				}
				this.page -= 5;
				this.fetch()
			},
			getDetail(row) {
				this.$router.push('/blogs/detail/'+row.id)
			},
			Delete(id) {
				console.log(id)
				delBlog(id).then(res => {
					this.$message({
						message: '删除博客成功',
						type: 'success'
					})
					this.fetch();
				})
			},
			Edit(id) {
				this.$router.push('/blogs/edit/'+id)
			}
		}
	}
</script>

<style scoped="scoped">
	.blogList {
		position: relative;
	}
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}
	.btn {
		position: absolute;
		margin-top: 30px;
		left: 50%;
		transform: translateX(-130%);
	}
</style>
