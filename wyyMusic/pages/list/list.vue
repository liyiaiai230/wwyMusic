<template>
  <view class="list">
    <view class="fixbg" :style="{'background-image' : 'url('+playlist.coverImgUrl+')' }"></view>
    <musichead title="歌单" :icon="true" color="white"></musichead>

      <scroll-view scroll-y="true">
        <view class="list-head">
          <view class="list-head-img">
            <image :src="playlist.coverImgUrl"></image>
            <text class="iconfont icon-yousanjiao">{{playlist.playCount |formatCount }} </text>
          </view>
          <view class="list-head-text">
            <view>{{playlist.name}}</view>
            <view>
              <image :src="playlist.creator.avatarUrl" mode=""></image>
              {{ playlist.creator.nickname }}
            </view>
            <view>
              {{playlist.description}}
            </view>
          </view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button class="list-share" open-type="share">
          <text class="iconfont icon-fenxiang"></text>
          分享给微信好友
        </button>
        <!-- #endif -->
        <view class="list-music">
          <view class="list-music-head">
            <text class="iconfont icon-bofang2"></text>
            <text>播放全部</text>
            <text>(共{{playlist.trackCount}}首)</text>
          </view>
          <view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index" @click="handleToDetail(item.id)">
            <view class="list-music-top">{{index + 1}}</view>
            <view class="list-music-song">
              <view>{{item.name}}</view>
              <view>
                <image v-if="privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png"></image>
                <image v-if="privileges[index].maxbr == 999000" src="../../static/download.png"></image>
                {{item.ar[0].name}}} - {{item.name}}
              </view>
            </view>
            <text class="iconfont icon-bofang"></text>
          </view>
        </view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
import Musichead from "../../components/Musichead/Musichead"
import {list} from '../../common/api'

export default {
  components: {
    Musichead,
  },
  data() {
    return {
      playlist: {
        coverImgUrl: '',
        creator: {
          avatarUrl: ''
        },
        trackCount : ''
      },
      privileges : [],
      isLoading : true
    }
  },
  onLoad(options) {
	uni.showLoading({
		title:'加载中...'
	})
    list(options.listId).then((res) => {
      if (res[1].data.code == '200') {
        this.playlist = res[1].data.playlist
        this.privileges = res[1].data.privileges
        this.isLoading = false
		    uni.hideLoading();
      }
      console.log(options.listId)
    });

  },
  methods: {
    handleToDetail(songId){
    uni.navigateTo({
    	url:'/pages/detail/detail?songId=' + songId
    })
    }
  },

}
</script>

<style scoped>
.list-head {
  display: flex;
  margin: 15px
}

.list-head-img {
  width: 132px;
  height: 132px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-right: 21px
}

.list-head-img image {
  width: 100%;
  height: 100%
}

.list-head-img text {
  position: absolute;
  right: 4px;
  top: 4px;
  color: white;
  font-size: 13px;
}

.list-head-text {
  flex: 1;
  color:white;
}

.list-head-text view:nth-child(1) {
  color: white;
  font-size: 17px
}

.list-head-text view:nth-child(2) {
  display: flex;
  margin: 10px 0;
  font-size: 12px;
  align-items: center
}

.list-head-text view:nth-child(2) image {
  width: 27px;
  height: 27px;
  border-radius: 11px;
  margin-right: 7px
}

.list-head-text view:nth-child(3) {
  line-height: 17px;
  font-size: 11px
}

.list-share {
  width: 165px;
  height: 37px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 18px;
  color: white;
  text-align: center;
  line-height: 37px;
  font-size: 14px;
}

.list-share text {
  margin-right: 8px
}

.list-music {
  background: white;
  border-radius: 25px;
  margin-top: 20px;
  overflow: hidden
}

.list-music-head {
  height: 25px;
  margin: 15px 0 35px 11px;
}

.list-music-head text:nth-child(1) {
  height: 25px;
  font-size: 25px
}

.list-music-head text:nth-child(2) {
  font-size: 15px;
  margin: 0 5px 0 13px
}

.list-music-head text:nth-child(3) {
  font-size: 13px;
  color: #b2b2b2
}

.list-music-item {
  display: flex;
  margin: 0 16px 33px 23px;
  align-items: center;
  color: #959595;
}

.list-music-top {
  width: 29px;
  font-size: 15px;
  line-height: 25px
}

.list-music-song {
  flex: 1
}

.list-music-song view:nth-child(1) {
  font-size: 14px;
  color: black;
  width: 70vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

.list-music-song view:nth-child(2) {
  font-size: 10px;
  align-items: center;
  width: 70vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-music-song view:nth-child(2) image {
  width: 16px;
  height: 10px;
  margin-right: 5px;
}

.list-music-item text {
  font-size: 25px;
  color: #c7c7c7
}
</style>
