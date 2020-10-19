<template>
	<div class="userList"> 
		<h2>用户列表</h2>
		<div class="fgx"></div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="用户名">
				<el-input v-model="formInline.user" placeholder="用户名"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary"  @click="Query">查询</el-button>
			</el-form-item>
		</el-form>
		
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column
					prop="id"
		      label="ID"
		      width="50">
		    </el-table-column>
		    <el-table-column
					prop='username'
		      label="用户名"
		      width="140">
		    </el-table-column>
				<el-table-column
					prop='password'
				  label="密码"
				  width="180">
				</el-table-column>
				<el-table-column
					prop='avatar'
				  label="头像地址"
				  width="350">
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
	import { 
		getUserData,
		delUser
		} from '../../network/users.js'
	
	export default {
		name: "userList",
		data() {
			return {
				formInline: {
					user: ''
				},
				 tableData: [],
					page: 0
			}
		},
		created() {
			this.fetch()
		},
		methods: {
			fetch() {
				getUserData(this.formInline.user,this.page).then(res => {
					console.log(res)
					this.tableData = res.data.data
					if(res.status === 401) {
						this.$route.push('/login')
					}
				})
			},
			addOne() {
				this.page += 5;
				getUserData(this.formInline.user,this.page).then(res => {
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
			Query() {
				this.page = 0
				this.fetch();
			},
			Delete(id) {
				console.log(id)
				delUser(id).then(res => {
				
					this.$message({
						message: '删除用户成功',
						type: 'success'
					})
					this.fetch();
				})
			},
			Edit(id) {
				this.$router.push('/users/edit/'+id)
			}
		} 
	
	}
</script>

<style scoped="scoped">
	.userList {
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
