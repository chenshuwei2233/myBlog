<template>
	<div>	
		<h2>上传预览图</h2>
		<div class="fgx"></div>
		<div class="upload">
			<el-upload 
			action=''
			class="uploader" 
			:show-file-list="false" 
			:http-request='upload' 
			:before-upload='beforeUpload'
			>
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		<el-switch
		  v-model="value2"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  active-text="是否为轮播图"
			@change='change'
		  >
		</el-switch>
		
		<el-row>
			<el-button type="primary" @click='sure'>确认修改</el-button>
			<el-button @click='back'>返回</el-button>
		</el-row>
	</div>
</template>

<script>
	import { updateRotation } from '../../network/preview.js'
	
	
	export default {
		name: 'editPreView',
		data() {
			return {
				id: 0,
				imageUrl: '',
				avatar: '',
				file: null,
				fileName: '',
				fileType: '',
				value2: false,
				blogs: {
					rotation: 0
				}
			}
		},
		created() {
			this.blogs.rotation = this.$route.params.rotation
			if(this.blogs.rotation != 0) {
				this.value2 = true
			} else {
				this.value2 = false
			}
		},
		methods: {
			beforeUpload(file) {
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
			upload() {
				let formData = new FormData()
				formData.append('fileName',this.fileName)//文件名字
				formData.append('file',this.file)//当前文件
				formData.append('id',this.$route.params.id)//当前登录的用户名，用于数据库查找
				formData.append('host',`\\${window.location.hostname}:8090`)//把当前主机名放进去，后端利于拼接并存放在数据库
				
					let url = 'http://localhost:3000/api/previews/upload'
				   let xhr = new XMLHttpRequest()
				   xhr.onreadystatechange = () => {
				     if (xhr.readyState === 4 && xhr.status === 200) {
				       let res = JSON.parse(xhr.responseText)
							 console.log(res)
				       this.$message.success(`${res.data.msg}`)
				     }
				   }
				   xhr.open('post', url)
				   xhr.setRequestHeader('authorization',localStorage.getItem('authorization')) // 由于后端使用了jwt验证。所以这里要设置一下请求头
				   xhr.send(formData)
			},
			change() {
				if(this.value2 === true) {
					this.blogs.rotation = 1
					
					return 
				}
				this.blogs.rotation = 0
				
			},
			sure() {
				updateRotation(this.$route.params.id,this.blogs).then(res => {
					this.$message({
						message: '更新轮播图成功',
						type: 'success'
					})
					this.$router.push('/preview/list')
				})
			},
			back() {
				this.$router.push('/preview/list')
			}
		}
	}
</script>

<style scoped="scoped">
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}
	.upload {
		width: 178px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
	
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
	.el-row {
		margin-top: 15px;
	}
</style>
