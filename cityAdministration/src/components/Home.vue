<template>
  <div class="home">
    <div class="top-bar">
      <img class="tittle_bg" src="../../static/tittle-bg.png" alt />
      <div class="content-text">城市基础设施管理</div>
    </div>
    <img
      :class="[
      Ashow.showAnimation ? 'bgAnimaiton' : 'bg',
       Ashow.showAnimation2 ? 'bgAnimaiton2' : 'bg',
      Ashow.hideAnimation ? 'rAnimaiton' : 'bg'
    ]"
      src="../../static/map-bg.png"
      alt
    />
    <!-- 撑开绝对定位所脱离的高度 -->
    <div class="fo"></div>
    <contain />
  </div>
</template>

<script>
import contain from "../components/contain";
export default {
  name: "Home",
  components: {
    contain
  },
  data() {
    return {
      Ashow: {
        showAnimation: false, //控制显示地图
        hideAnimation: false, //控制显示列表内容
        showAnimation2: false, //控制显示第二个按钮
        showAnimationall: false //控制显示中间信息
      }
    };
  },
  mounted() {
    if (this.Ashow.showAnimation && !this.Ashow.hideAnimation) {
      this.animation = "";
    }
  },
  provide() {
    return {
      Ashow: this.Ashow
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  width: 1920px;
  height: 139px;
  opacity: 0.58;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
}

.bg {
  position: absolute;
  z-index: -1;
  width: 1920px;
  height: 1080px;
  opacity: 1;
}
.bgAnimaiton {
  width: 1920px;
  height: 1080px;
  position: absolute;
  z-index: -1;
  animation: bgaf 1s forwards;
}
@keyframes bgaf {
  0% {
    transform: scale(1, 1);
    transform-origin: 850px 550px;
  }
  100% {
    transform: scale(1.35, 1.4);
    transform-origin: 850px 550px;
  }
}
.bgAnimaiton2 {
  width: 1920px;
  height: 1080px;
  position: absolute;
  z-index: -1;
  animation: bgaf2 1s forwards;
}
@keyframes bgaf2 {
  0% {
    transform: scale(1, 1);
    transform-origin: 800px 550px;
  }
  100% {
    transform: scale(1.35, 1.4);
    transform-origin: 800px 550px;
  }
}

.rAnimaiton {
  width: 1920px;
  height: 1080px;
  position: absolute;
  z-index: -1;
  animation: bgat 1s;
}
@keyframes bgat {
  0% {
    transform: scale(1.35, 1.4);
    transform-origin: 850px 550px;
  }
  100% {
    transform: scale(1, 1);
    transform-origin: 850px 558px;
  }
}
.tittle_bg {
  width: 1920px;
  height: 153px;
  position: relative;
}
.content-text {
  display: inline-block;
  text-align: center;
  width: 816px;
  height: 40px;
  text-shadow: 0 4px 8px rgba(2, 10, 50, 0.2), 0 2px 4px rgba(2, 10, 50, 0.2),
    0 2px 4px rgba(2, 10, 50, 0.2);
  font-family: SourceHanSansCN;
  font-size: 40px;
  color: rgba(170, 231, 255, 1);
  line-height: 40px;
  position: absolute;
  top: 49px;
  left: 552px;
}
.home {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
}
.fo {
  width: 1920px;
  height: 139px;
  opacity: 0;
}
</style>
