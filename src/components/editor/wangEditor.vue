<template>
	<div>
		<div id="myWangEditor" ref="myWangEditor" >
			
		</div>
		<!-- <div>{{this.editorContent}}</div> -->
	</div>

</template>

<script>
	import wangEditor from 'wangeditor'
	export default ({
		name: 'wangEditor',
		props: {
			content: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				editorContent: '', //内容
				editor: null,
				authorization: ''
			}
		},
		created() {
			this.authorization = localStorage.getItem('authorization')
		},
		mounted() {
			var _this = this;
			this.editor = new wangEditor(this.$refs.myWangEditor); //实例化wangEditor
			this.editor.customConfig = {
				onchange: (html) => {
					this.editorContent = html;
				},
				uploadImgMaxSize: 3 * 1024 * 1024, // 将图片大小限制为 3M
				uploadImgMaxLength: 20, // 限制一次最多上传 1 张图片
				uploadFileName: 'myFileName', //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
				// withCredentials: true, //跨域上传中如果需要传递 cookie 需设置 withCredentials
				uploadImgTimeout: 3000, //自定义 timeout 时间，这里是设置的3秒
				uploadImgServer: 'http://localhost:3000/api/blogs/editor', //上传到后台的接口
			};
			this.editor.customConfig.uploadImgHeaders = {
				authorization: this.authorization
			}
			this.toListenUp(this.editor); //监听上传的各个阶段
			this.editor.create();
			
			
		},
		methods: {
			toListenUp: function(editor) { //监听上传图片的几个阶段，和做相应的处理
				var _this = this;
				editor.customConfig.uploadImgHooks = {

					customInsert: function(insertImg, result, editor) {
						// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
						// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
						var url = result.data[0]; //获取后台返回的图片路径
						insertImg(url); //把图片路径展示在编辑器里面
						// result 必须是一个 JSON 格式字符串！！！否则报错
					}
				}
			}
		}
	})
</script>

<style >
	.w-e-text-container{
	    height: 250px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
	}
	
	
	
</style>
