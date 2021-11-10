<template>
	<view class="list">
    <view class="fixbg"></view>
    <musichead title="歌单" :icon="true" color="white"></musichead>
    <view class="container">
    <scroll-view scroll-y="true">

    </scroll-view>
    </view>
  </view>
</template>

<script>
import Musichead from "../../components/Musichead/Musichead"
	export default {
		data() {
			return {
				
			}
		},
    onLoad(options){
      console.log(options.listId)

     },
		methods: {

		},
    components:{
      Musichead,
    }
	}
</script>

<style scoped>

</style>
