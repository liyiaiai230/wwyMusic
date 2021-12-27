<template>
  <view class="detail">
    <view class="fixbg" :style="{'background-image' : 'url('+songDetail.al.picUrl +')' }"></view>
    <musichead :title="songDetail.name" :icon="true" color="white"></musichead>
    <view class="container">
      <scroll-view scroll-y="true">
        <view class="detail-play" @click="handleToPlay">
          <image :src="songDetail.al.picUrl" :class="{'detail-play-run': isPlayRotate}" ></image>
          <text class="iconfont" :class="iconPlay"></text>
          <view></view>
        </view>
        <view class="detail-lyric">
          <view class="detail-lyric-wrap">
            <view class="detail-lyric-item" :class="{active : lyricIndex == index}" v-for="(item,index) in songlyric" :key="index">{{item.lyric}}</view>
            <view class="detail-lyric-item active">测试</view>
            <view class="detail-lyric-item">测试</view>
          </view>
        </view>
        <view class="detail-like">
          <view class="detail-like-head">喜欢这首歌的人也听</view>
          <view class="detail-like-item" v-for="(item,index) in songSimi" :key="index">
            <view class="detail-like-img">
              <image :src="item.album.picUrl" mode=""></image>
            </view>
            <view class="detail-like-song">
              <view>{{ item.name }}</view>
              <view>
                <image v-if="item.privilege.flag > 60 && item.privilege.flag < 70"
                       src="../../static/dujia.png"></image>
                <image v-if="item.privilege.maxbr == 999000" src="../../static/download.png"></image>
                {{ item.album.artists[0].name }} - {{ item.name }}
              </view>
            </view>
            <text class="iconfont icon-bofang2"></text>
          </view>
        </view>
        <view class="detail-comment">
          <view class="detail-comment-head">精彩评论</view>
          <view class="detail-comment-item"  v-for="(item,index) in songComment" :key="index">
            <view class="detail-comment-img">
              <image :src="item.user.avatarUrl"></image>
            </view>
            <view class="detail-comment-content">
              <view class="detail-comment-title">
                <view class="detail-comment-mame">
                  <view>{{ item.user.nickname }}</view>
                  <view>{{ item.time|formatTime }}</view>
                </view>
                <view class="detail-comment-like">{{ item.likedCount | formatCount }}
                  <text class="iconfont icon-dianzan"></text>
                </view>
              </view>
              <view class="detail-comment-text">{{ item.content }}</view>
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
import {songDetail, songSimi, songlyric, songComment, songUrl} from '../../common/api'

export default {
  data() {
    return {
        songDetail: {
        al: {
			picUrl : ''
		}
      },
      songSimi: [],
      songComment: [],
      songlyric: [],
	  lyricIndex: 0,
	  iconPlay: 'icon-zanting', 
	  isPlayRotate: true,
    }
  },
  onLoad(options) {
    this.getMusic(options.songId)
  },
  methods: {
    getMusic(songId) {
      Promise.all([songDetail(songId), songSimi(songId), songComment(songId), songlyric(songId),songUrl(songId)]).then((res) => {
        if (res[0][1].data.code == '200') {
          this.songDetail = res[0][1].data.songs[0];
        }
        if (res[1][1].data.code == '200') {
			this.songSimi = res[1][1].data.songs;
        }
        if (res[2][1].data.code == '200') {
          this.songComment = res[2][1].data.hotComments;
        }
        if (res[3][1].data.code == '200') {
          let lyric = res[3][1].data.lrc.lyric;
          let re = /\[([^\]]+)\]([^\[]+)/g;
          let result = [];
          lyric.replace(re,($0,$1,$2,)=>{
            result.push({"time": this.formatTimeToSec($1) , "lyric": $2});
          });
            this.songlyric = result;
        }
		if(res[4][1].data.code == '200') {
			this.bgAudioMannager = uni.getBackgroundAudioManager();
			this.bgAudioMannager.title = this.songDetail.name;
			this.bgAudioMannager.src = res[4][1].data.data[0].url || '';
			this.bgAudioMannager.onPlay(()=>{
				this.iconPlay = 'icon-zanting';
				this.isPlayRotate = true;
			});
			this.bgAudioMannager.onPause(()=>{
				this.iconPlay = 'icon-bofang'; 
				this.isPlayRotate = false;
			});
		}
      });
    },
      formatTimeToSec(val){
        let arr = val.split(":");
		parseFloat(arr[0]*60)
        return (Number(arr[0]*60)+ Number(arr[1])).toFixed(1);
  },
	  handleToPlay(){
		if(this.bgAudioMannager.paused ) {
			this.bgAudioMannager.play();
		}
		else{
		this.bgAudioMannager.pause()		
		}
	},
},
components: {
    Musichead,
  }
}
</script>

<style scoped>					
.detail-play {
  width: 290px;
  height: 290px;
  background: url("~@/static/disc.png");
  margin: 107px auto 0 auto;
  position: relative;
}

.detail-play image {
  width: 185px;
  height: 185px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation:10s linear move infinite;
  animation-play-state: paused;
}
 .detail-play .detail-play-run {animation-play-state: running;}
	@keyframes move{
		from{transform: rotate(0deg);}
		to{transform:rotate(360deg);}
	}
.detail-play text {
  width: 100px;
  height: 50px;
  font-size: 50px;
  color: white;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.detail-play view {
  width: 115px;
  height: 180px;
  background-size: cover;
  background: url("~@/static/needle.png");
  position: absolute;
  left: 50px;
  right: 0;
  top: -100px;
  margin: auto;
  background-size: cover;
}

.detail-lyric {
  font-size: 16px;
  line-height: 41px;
  height: 123px;
  text-align: center;
  overflow: hidden;
  color: #6f6e73;
}

.detail-lyric-wrap {

}

.detail-lyric-item {
  height: 41px
}

.detail-lyric-item.active {
  color: white
}

.detail-like {
  margin: 0 25px;

}

.detail-like-head {
  font-size: 18px;
  color: white;
  margin: 25px 0;

}

.detail-like-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.detail-like-img {
  width: 41px;
  height: 41px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px
}

.detail-like-img image {
  width: 100%;
  height: 100%
}

.detail-like-song {
  flex: 1;
  color: #c6c2bf;
}

.detail-like-song view:nth-child(1) {
  font-size: 14px;
  color: white;
  margin-bottom: 6px
}

.detail-like-song view:nth-child(2) {
  font-size: 11px
}

.detail-like-song image {
  width: 13px;
  height: 10px;
  margin-right: 5px
}

.detail-like-item text {
  font-size: 25px;
  color: #c6c2bf
}

.detail-comment {
  margin: 0 15px
}

.detail-comment-head {
  font-size: 36px;
  color: white;
  margin: 25px 0;
}

.detail-comment-item {
  margin-bottom: 14px;
  display: flex
}

.detail-comment-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 9px
}

.detail-comment-img image {
  width: 100%;
  height: 100%
}

.detail-comment-content {
  flex: 1;
  color: #cbcacf;
}

.detail-comment-title {
  display: flex;
  justify-content: space-between;

}

.detail-comment-mame {


}

.detail-comment-mame view:nth-child(1) {
  font-size: 13px;
}

.detail-comment-mame view:nth-child(2) {
  font-size: 10px;
}

.detail-comment-like {
  font-size: 14px;

}

.detail-comment-text {
  font-size: 14px;
  line-height: 20px;
  color: white;
  margin-top: 10px;
  border-bottom: 1px #e0e0e0 solid;
  padding-bottom: 20px;
}
</style>
