<template>
	<div class="createUser">
		<h2>编辑用户页面</h2>
		<div class="fgx"></div>
		<div class="user-avatar">
			<el-upload 
			action=''
			class="avatar-uploader" 
			:show-file-list="false" 
			:http-request='uploadAvatar' 
			:before-upload='beforeAvatarUpload'
			>
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		<div class="add">
			<el-form @submit.native.prevent="saveUser" ref="form":model="user" label-width="80px">
			  <el-form-item label="用户名">
			    <el-input v-model="user.username"></el-input>
			  </el-form-item>
				
				  <el-form-item label="密码">
				    <el-input v-model="user.password"></el-input>
				  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" native-type="submit">立即修改</el-button>
			    <el-button @click='back'>取消</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
		
	</div>
</template>

<script>
	import {
		userDetail,
		updateUser
		} from '../../network/users.js'
	
	
	export default {
		name: 'editUser',
		data() {
		      return {
		        user: {
		         username: '',
						 password: ''
		        },
						id: 0,
						imageUrl: '',
						avatar: '',
						file: null,
						fileName: '',
						fileType: ''
		      }
		    },
				created() {
					this.id = this.$route.params.id
					userDetail(this.$route.params.id).then(res => {
						console.log(res)
						this.user.username = res.data.data[0].username;
						this.user.password = res.data.data[0].password;
					})
				},
				methods: {
					saveUser() {
						this.$store.commit('changeUsername',this.user.username)
						updateUser(this.id,this.user).then(res => {
							this.$message({
								message: '更新用户成功',
								type: 'success'
							})
							this.$router.push('/users/list')
						})
					},
					back() {
						this.$router.push('/users/list')
					},
					beforeAvatarUpload(file) {
						this.file = file
						this.fileName = file.name
						this.fileType = file.type
						const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
						|| file.type === 'image/gif'
						const isLt2M = file.size / 1024 / 1024 < 2;
						if(!isImage) {
							this.$message.error('上传图片只能是 JPG| PNG | GIF格式')
						}
						if(!isLt2M) {
							this.$message.error('上传图片大小不能超过2MB')
						}
						return isImage && isLt2M
					},
					uploadAvatar() {
						let formData = new FormData()
						formData.append('fileName',this.fileName)//文件名字
						formData.append('file',this.file)//当前文件
						formData.append('name',this.user.username)//当前登录的用户名，用于数据库查找
						formData.append('host',`\\${window.location.hostname}:8080`)//把当前主机名放进去，后端利于拼接并存放在数据库
						
						let url = 'http://localhost:3000/api/users/upload'
						   let xhr = new XMLHttpRequest()
						   xhr.onreadystatechange = () => {
						     if (xhr.readyState === 4 && xhr.status === 200) {
						       let res = JSON.parse(xhr.responseText)
									 console.log(res)
						       this.$message.success(`${res.data.msg}`)
						       let dominName = window.location.hostname
						       this.avatar = `//${dominName}:3000${res.data.fileUrl}` // 这一步的目的是把vuex里存放的avatar的值也改变
						       if(this.user.username === this.$store.state.username) {
										 this.$store.commit('changeAvatar', this.avatar) 
									 }// 更新vuex
									 console.log(this.$store.state.avatar)
						       setTimeout(() => {
						         location.reload() // 300ms之后，刷新页面。否则上传图像之后它不会自动改变
						       }, 300)
						     }
						   }
						   xhr.open('post', url)
						   xhr.setRequestHeader('authorization',localStorage.getItem('authorization')) // 由于后端使用了jwt验证。所以这里要设置一下请求头
						   xhr.send(formData)
						
					}
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
	.user-avatar {
		width: 178px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		margin-left: 140px;
		margin-bottom: 20px;
	}
	.avatar-uploader .el-upload {
		position: relative;
		overflow: hidden;
	}
	
	.user-avatar:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
