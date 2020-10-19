<template>
	<div class="createUser">
		<h2>创建用户页面</h2>
		<div class="fgx"></div>
		
		<div class="add">
			<el-form @submit.native.prevent="saveUser" ref="form" :model="user" label-width="80px">
				<el-form-item label="用户名">
					<el-input v-model="user.username"></el-input>
				</el-form-item>

				<el-form-item label="密码">
					<el-input v-model="user.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">立即添加</el-button>
					<el-button @click='back'>取消</el-button>
				</el-form-item>
			</el-form>
		</div>


	</div>
</template>

<script>
	import {
		addUser
	} from '../../network/users.js'

	export default {
		name: 'createUser',
		data() {
			return {
				user: {
				}
			
			}
		},
		methods: {
			saveUser() {
				if (!this.user.username || !this.user.password) {
					this.$message({
						message: '请输入账号或密码！',
						type: 'error'
					})
					return
				}
				addUser(this.user).then(res => {
					this.$message({
						message: '添加用户成功',
						type: 'success'
					})
					this.user = {}
					this.$router.push('/users/list')
				})
				console.log(this.user)
			},
			back() {
				this.$router.push('/users/list')
			},
			
			
		}
	}
</script>

<style scoped="scoped">
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}

	.add {

		width: 400px;
	}

	
</style>
