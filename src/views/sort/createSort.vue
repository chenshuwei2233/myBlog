<template>
	<div>
		<h2>添加分类</h2>
		<div class="fgx"></div>
		<div class="add">
			<el-form @submit.native.prevent="saveSort" ref="form" :model="sort" label-width="80px">
				<el-form-item label="分类">
					<el-input v-model="sort.sorts"></el-input>
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
	import {addSort} from '../../network/sort.js'
	
	export default {
		name: 'createSort',
		data() {
			return {
				sort: {
					sorts: ''
				}
			}
		},
		methods: {
			saveSort() {
				if (!this.sort.sorts) {
					this.$message({
						message: '请输入分类！',
						type: 'error'
					})
					return
				}
				addSort(this.sort).then(res => {
					this.$message({
						message: '添加分类成功',
						type: 'success'
					})
					this.sort = {}
					this.$router.push('/sort/list')
				})
			},
			back() {
				this.$router.push('/sort/list')
			}
		}
	}
</script>

<style>
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}
	.add {
		width: 400px;
	}
</style>
