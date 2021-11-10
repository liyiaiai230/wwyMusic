<template>

	<view class="music-head" style="color: white">
    <view v-if="icon" class="music-head-icon">
      <text class="iconfont icon-zuojiantou" @click="handleToBack"></text> |
      <text class="iconfont icon-shouye" @click="handleToHome"></text>
    </view>
    {{title}}
  </view>

 
</template>

<script>
import '@/common/iconfont.css'
	export default {
		name:"Musichead",
		data() {
			return {
				
			};
		},
    props:['title','icon','color' ],
    methods:{
      handleToBack(){
        uni.navigateBack({

        })
      },
      handleToHome(){
        uni.navigateTo({
          url: '/pages/index/index'
        });
      }
    },

	}
</script>

<style scoped>
  .music-head{
    width: 100%;
    height: 75px;
    font-size: 16px;
    line-height: 80px;
    text-align: center;
    color: black;
    position: relative;
  }
  .music-head-icon{
    position: absolute;
    left: 8px  ;
    top: 26px;
    width: 90px;
    height: 31px ;
    background: rgba(0,0,0,0.4);
    color: white;
    line-height: 31px;
    display: flex;
    justify-content: space-evenly;
    border-radius: 18px;

  }
</style>
