<template>
	<div class="preList">
		<h2>预览图列表</h2>
		<div class="fgx"></div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="文章标题">
				<el-input v-model="formInline.title" placeholder="文章标题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="Query">查询</el-button>
			</el-form-item>
			
			<el-switch  v-model="value2" active-color="#13ce66" inactive-color="#ff4949" active-text="有预览图"
			 inactive-text="全部" @change='change'>
			</el-switch>
		</el-form>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="ID" width="50">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="250">
			</el-table-column>

			<el-table-column prop="preview" label="预览图地址" width="250">
			</el-table-column>
			<el-table-column prop="rotation" label="是否为轮播图" width="150">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="Edit(scope.row.id)">编辑</el-button>
					<el-button size="mini" type="danger" @click="Delete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="btn">
			<el-row>
				<el-button size="small" @click="deOne"><i class="el-icon-arrow-left"></i>上一页</el-button>
				<el-button size="small" @click="addOne">下一页<i class="el-icon-arrow-right"></i></el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		getPreViewData,
		delPreView
	} from '../../network/preview.js'

	export default {
		name: 'preViewList',
		data() {
			return {
				formInline: {
					title: '',
				},
				tableData: [],
				page: 0,
				value2: false,
				rotation: 0
			}
		},
		created() {
				this.fetch();
		},
		methods: {
			fetch() {
				getPreViewData(this.formInline.title,0, this.page).then(res => {
					
					this.tableData = res.data.data
				})
			},
			Query() {
				this.page=0;
				if(this.value2 === false) {
					this.fetch()
					return 
				}
				getPreViewData(this.formInline.title,1,this.page).then(res => {
					this.tableData = res.data.data
				}) 
			},
			Edit(id) {
				this.rotation = this.tableData[id%5].rotation
				this.$router.push('/preview/edit/' + id +'/'+ this.rotation);
			},
			Delete(id) {
				delPreView(id).then(res => {
					this.$message({
						message: '删除图片成功',
						type: 'success'
					})
					this.fetch();
				})
			},
			addOne() {
				this.page += 5;
				if(this.value2 || this.formInline.title) {
					getPreViewData(this.formInline.title, 1, this.page).then(res => {
						if (res.data.data.length === 0) {
							this.page -= 5
							return
						}
						this.tableData = res.data.data
					})
					
				}
				else {
					getPreViewData(this.formInline.user,0, this.page).then(res => {
						if (res.data.data.length === 0) {
							this.page -= 5
							return
						}
						this.tableData = res.data.data
						
					})
				}

			},
			deOne() {
				if (this.page === 0) {
					return
				}
				this.page -= 5;
				if(this.value2) {
					getPreViewData(this.formInline.title, 1, this.page).then(res => {
						this.tableData = res.data.data
					})
					return 
				}
				this.fetch()
			},
			change() {
				if(this.value2) {
					this.page=0
					getPreViewData(this.formInline.title, 1, this.page).then(res => {
						
						this.tableData = res.data.data
					})
				}
				else {
					this.page=0
					this.fetch()
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.preList {
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
