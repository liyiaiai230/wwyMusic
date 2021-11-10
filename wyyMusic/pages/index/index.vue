<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
    <view class="container">
      <scroll-view scroll-y="true">
        <view class="index-search">
          <text class="iconfont icon-sousuo"></text>
          <input type="text" placeholder="搜索歌曲">
        </view>
        <view class="index-list">

          <view class="index-list-item" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.listId)">
            <view class="index-list-img">
              <image :src="item.coverImgUrl"></image>
              <text>{{item.updateFrequency}}</text>
            </view>
            <view class="index-list-text">
              <view v-for="(item,index) in item.tracks" :key="index">{{index + 1}}.{{item.first}} - {{item.second}}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

    </view>
	</view>
</template>

<script>
  import '@/common/iconfont.css'
	import Musichead from "../../components/Musichead/Musichead"
  import {topList} from '../../common/api'

	export default {
    components: {
      Musichead
    },
		data() {
			return {
				topList : []
			}

		},
		onLoad() {
      topList().then((res)=> {
        if (res.length)
          this.topList = res
      })
		},
		methods: {
      handleToList(listId){
        uni.navigateTo({
        	url: '/pages/list/list?listId='+listId,
        });
      }

		}
	}
</script>

<style scoped>
	.index{}
  .index-search {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 35px 15px 15px 15px;
    border-radius: 25px;
    background: #F7F7F7;
  }
  .index-search text {
    font-size: 13px;
    margin-left: 13px;
    margin-right: 13px;
  }
  .index-search input {
    font-size: 14px; flex:1;
  }
  .index-list {margin: 0 15px;}
  .index-list-item{display: flex; margin-bottom: 17px; }
  .index-list-img{width: 106px; height: 106px; position: relative; border-radius:15px; overflow: hidden;
    margin-right: 11px;
  }
  .index-list-img image{width: 100%; height: 100%}
  .index-list-img text {position: absolute; left:6px; color: white; font-size: 10px; bottom: 8px}
  .index-list-text {
    font-size: 12px; line-height:33px ;
  }
</style>
