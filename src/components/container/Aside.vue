<template>
	<div class="aside">
		<el-aside width="200px" height='100%'>
			<el-menu :default-openeds="['1','2','3','4']" background-color="#545c64" active-text-color="none" text-color="#fff"
			 router class="el-menu">
				<el-submenu index="1">
					<template slot="title" class="slot"><i class="el-icon-user"></i>用户管理</template>
		
					<el-menu-item index="/users/list"><span class="text">用户列表</span></el-menu-item>
					<el-menu-item index="/users/create"><span class="text">添加用户</span></el-menu-item>
		
				</el-submenu>
				<el-submenu index="2">
					<template slot="title" class="slot"><i class="el-icon-tickets"></i>文章管理</template>
		
					<el-menu-item index="/blogs/list"><span class="text">博客列表</span></el-menu-item>
					<el-menu-item index="/blogs/create"><span class="text">添加博客</span></el-menu-item>
					
				</el-submenu>
				<el-submenu index="3">
					<template slot="title" class="slot"><i class="el-icon-picture"></i>预览图管理</template>
					<el-menu-item index="/preview/list"><span class="text">预览图列表</span></el-menu-item>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title"><i class="el-icon-collection-tag"></i>分类管理</template>
		
					<el-menu-item index="/sort/list"><span class="text">分类列表</span></el-menu-item>
					<el-menu-item index="/sort/create"><span class="text">添加分类</span></el-menu-item>
		
				</el-submenu>
			</el-menu>
			
		</el-aside>
	</div>
	
</template>

<script>
	export default {
		name: 'Aside'
	}
</script>

<style>
	.el-menu {
		border-right-width: 0 !important;
	}
	.aside {
		height: 580px;
	}
	
	
	.text {
		font-size: 12px !important;
	}
	
</style>
