<template>
	<div>
		<h2>分类列表</h2>
		<div class="fgx"></div>
		<div class="sortTable">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="ID" width="100">
				</el-table-column>
				<el-table-column prop="sorts" label="分类" width="100">
				</el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">

						<el-button size="mini" @click="Edit(scope.row.id)">编辑</el-button>
						<el-button size="mini" type="danger" @click="Delete(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
	</div>
</template>

<script>
	import {
		getSortData,
		delSort,
		updateSort
	} from '../../network/sort.js'

	export default {
		name: 'sortList',
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			this.fetch()
		},
		methods: {
			fetch() {
				getSortData().then(res => {
					console.log(res)
					this.tableData = res.data.data
				})
			},
			Delete(id) {
				console.log(id)
				delSort(id).then(res => {

					this.$message({
						message: '删除用户成功',
						type: 'success'
					})
					this.fetch();
				})
			},
			Edit(id) {
				console.log(id)
				this.$prompt('请输入你需要更改的内容', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定'
				}).then(({
					value
				}) => {
						this.tableData[id].sorts = value
						updateSort(id, this.tableData[id]).then(val => {
							this.$message({
								type: 'success',
								message: '修改分类成功'
							})
						})
						location.reload();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			}
		}
	}
</script>

<style>
	.fgx {
		border-bottom: 1px solid #DCDFE6;
		margin-bottom: 20px;
	}

	.sortTable {
		width: 400px;
	}
</style>
