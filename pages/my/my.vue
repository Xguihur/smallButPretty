<template>
	<view class="">
		<u-button type="primary" text="确定"></u-button>
		<u-button type="primary" :plain="true" :hairline="true" text="细边"></u-button>
		<tab-bar current="1"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../component/tabBar.vue'
	export default {
		components:{
			tabBar
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">

</style>
