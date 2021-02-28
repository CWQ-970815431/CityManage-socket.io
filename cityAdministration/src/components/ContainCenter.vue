<template>
  <div class="center">
    <div class="icon-map">
      <div v-if="Ashow.showAnimationall">
        <div
          :class="[
            Ashow.hideAnimation
              ? show
                ? 'mchdiv'
                : 'mchdiv2'
              : show
              ? 'mcdiv'
              : 'mcdiv2',
            'mdiv'
          ]"
        >
          <img class="bigimg" :src="list.jinggai.bigurl" v-show="show" alt />
          <div class="showRight showRight1" v-show="show">
            <div class="showleft">
              <img class="icon" :src="list.jinggai.imgurl" alt />
              <span class="icon-msg">{{ list.jinggai.iconmsg }}</span>
            </div>
            <div>
              <div class="ilist" v-for="(item, index) in list.jinggai.iconlist" :key="item + index">
                <img :src="item.icon" alt />
                <div class="item-title">{{ item.title }}</div>
                <div>{{ item.msg }}</div>
              </div>
            </div>
          </div>
          <img class="bigimg" :src="list.flag.bigurl" v-show="!show" alt />
          <div class="showRight" v-show="!show">
            <div class="showleft">
              <img class="icon" :src="list.flag.imgurl" alt />
              <span class="icon-msg">{{ list.flag.iconmsg }}</span>
            </div>
            <div>
              <div
                class="ilist"
                v-for="(item, index) in list.flag.iconlist"
                :key="item + index + 1"
              >
                <img :src="item.icon" alt />
                <div>{{ item.title }}</div>
                <div>{{ item.msg }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Ashow.showAnimationall">
        <div>
          <img
            v-show="show"
            @click="mchClick"
            :class="Ashow.hideAnimation ? 'warningw' : 'warning'"
            :src="waringIMG"
            alt
          />
          <img
            v-show="!show"
            @click="mchClick"
            :class="Ashow.hideAnimation ? 'warningw2' : 'warning2'"
            :src="waringIMG2"
            alt
          />

          <div :class="[show ? 'wave1' : 'wave2', 'wave']" v-show="!Ashow.hideAnimation">
            <div class="center-circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
      <div v-if="!Ashow.showAnimationall">
        <img :src="mapUrl" />
        <img @click="mcClick" class="MC" src="../../static/MC.png" alt />
        <img @click="flagClick" class="flag" src="../../static/ic.png" alt />
      </div>
    </div>
    <div class="card-botoom">
      <div class="card-botoom-left">
        <div class="botoom-first">
          <div class="ib">红色报警</div>
          <div class="ib">正常状态</div>
          <div class="ib">井盖总数</div>
        </div>
        <div class="botoom-sec">
          <img src="../../static/red-waring.png" alt />
          <div ref="coutupred">{{this.datalist.RedEnd}}</div>
          <div ref="normal" class="b-c-w">{{this.datalist.Normalend}}</div>
          <div ref="total" class="b-c-w">{{this.datalist.TotalEnd}}</div>
        </div>
        <div class="botoom-thr">
          <div class="ib ib-t">橙色</div>
          <div class="ib ib-t">掉线报警</div>
        </div>
        <div class="botoom-last">
          <img src="../../static/orange-waring.png" alt />
          <div ref="orange">{{this.datalist.OrangeEnd}}</div>
          <div class="b-c-w" ref="waring">{{this.datalist.zeroEnd}}</div>
        </div>
      </div>
      <div class="card-botoom-right">
        <div class="right-one">
          <div class="ib">时间</div>
          <div class="ib">道路名称</div>
          <div class="ib">编号</div>
          <div class="ib">报警类型</div>
        </div>
        <dv-scroll-board :config="config" ref="scrollBoard" class="botoom-list" />
      </div>
    </div>
  </div>
</template>

<script>
import { cFun } from "../mixin/CountFun";
export default {
  name: "center",
  mixins: [cFun],
  inject: ["Ashow"],
  data() {
    return {
      off: true,
      //datav配置项
      config: {
        data: [
          [
            "05-09 10:48:40",
            "荷城路",
            "174800400354",
            "<span style='color: #fe6323;margin-left:6px;'>橙色警报</span>"
          ],
          [
            "05-09 09:29:33",
            "迎宾大道",
            "174800600128",
            "<span style='color: #fe6323;margin-left:6px;'>橙色警报</span>"
          ],

          [],
          [],
          [],
          []
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>'],
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>'],
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>'],
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>'],
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>'],
          // ['<span style="color: #fe6323;margin-left:6px;">橙色警报</span>']
        ],
        oddRowBGC: "rgba(11, 50, 121, 0)", // 奇数行背景色
        evenRowBGC: "rgba(11, 50, 121, 0)", // 偶数行背景色
        waitTime: 2000 // 轮播时间间隔(ms)
      },
      options: {
        startVal: 0
      },
      options2: {
        startVal: 100
      },
      mapUrl: require("../../static/icon-map.png"),
      datalist: {
        RedEnd: 37,
        Normalend: 283,
        TotalEnd: 460,
        OrangeEnd: 140,
        zeroEnd: 0
      },

      //控制显示按钮
      show: 1,
      waringIMG: require("../../static/two/waring-jingai.png"),
      waringIMG2: require("../../static/two/ic-red.png"),

      //列表渲染数据
      list: {}
    };
  },
  sockets: {
    connect() {
      this.$socket.emit("sendMsg", [this.datalist, "contain/center"]); //监听connect事件
      this.$socket.emit("listt", [this.list, "contain/list"]); //监听connect事件
    },
    center(data) {
      this.datalist = data;
      this.res++;
      var a = this.datalist.data.length;
      for (var i = 0; i < a; i++) {
        this.config.data[i] = [];
        for (var j = 0; j < 4; j++) {
          // this.$set(this.config.data, i, this.datalist.data[i][2 - j]);

          this.config.data[i].unshift(this.datalist.data[i][3 - j]);
          console.log(this.config);
        }
      }
      if (this.off) {
        this.off = !this.off;
        this.config = { ...this.config };
      }

      // this.initCountUp();
    },
    list(data) {
      this.list = data;
    }
  },
  created() {},
  mounted() {
    //请求数据
    // this.axios
    //   .get(this.serverUrl + "/contain/center")
    //   .then(res => {
    //     this.datalist = res.data;
    //     for (var i = 0; i < 6; i++) {
    //       for (var j = 0; j < 3; j++) {
    //         // this.$set(this.config.data, i, this.datalist.data[i][2 - j]);
    //         this.config.data[i].unshift(this.datalist.data[i][2 - j]);
    //       }
    //       this.off = true;
    //     }
    //     // console.log(this.config.data);
    //     this.initCountUp();
    //   })
    //   .catch(res => {
    //     console.log("error");
    //   });
    //请求渲染列表数据
    //   this.axios
    //     .get(this.serverUrl + "/contain/list")
    //     .then(res => {
    //       this.list = res.data;
    //     })
    //     .catch(res => {
    //       console.log("error");
    //     });
  },

  methods: {
    //井盖按钮事件
    mcClick() {
      this.Ashow.hideAnimation = false;
      this.Ashow.showAnimation = !this.Ashow.showAnimation;
      this.Ashow.showAnimation2 = false;
      this.Ashow.showAnimationall = !this.Ashow.showAnimationall;

      this.show = 1;
    },
    //栏杆按钮事件
    flagClick() {
      this.Ashow.hideAnimation = false;
      this.Ashow.showAnimation2 = !this.Ashow.showAnimation;
      this.Ashow.showAnimationall = !this.Ashow.showAnimationall;
      this.show = 0;
    },
    close() {
      this.Ashow.showAnimation = false;
      this.Ashow.showAnimation2 = false;
      this.Ashow.showAnimationall = false;
    },
    //隐藏清单事件
    mchClick() {
      this.Ashow.hideAnimation = true;

      // console.log("test");
      clearTimeout(test);

      var test = setTimeout(this.close, 900);
    },
    //定时关闭

    //初始化countup
    initCountUp() {
      this.restart(this.$refs.coutupred, this.datalist.RedEnd, this.options, 0);
      this.restart(this.$refs.normal, this.datalist.Normalend, this.options, 1);
      this.restart(this.$refs.total, this.datalist.TotalEnd, this.options, 2);
      this.restart(this.$refs.orange, this.datalist.OrangeEnd, this.options, 3);
      this.restart(this.$refs.waring, this.datalist.zeroEnd, this.options2, 4);
      // setInterval(this.intervar, 7000);
    }
  }
};
</script>
<style scoped lang="scss">
.center {
  display: grid;
  grid-template-rows: 587px 1fr;
}
.ib {
  margin-top: 20px;
  margin-left: 40px;
  opacity: 0.7;
  font-family: SourceHanSansCN;
  font-size: 18px;
  color: #ffffff;
}
.ib-t {
  margin-top: 5px;
}
.wave2 {
  position: relative;
  left: -143px;
  top: 213px;
}
.wave1 {
  left: -172px;
  top: 250px;
}
.wave {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 100px auto;
  opacity: 0;
  animation: show-wave 3s forwards;
  .center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
}
@keyframes show-wave {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.wave .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  padding: 33px;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation-delay: 0.4s;
  animation: light 2s infinite linear;
}
@keyframes light {
  0% {
    background-image: radial-gradient(
      circle at 50% 50%,
      #c5245a,
      rgba(255, 171, 143, 0) 0%
    );
  }
  100% {
    background-image: radial-gradient(
      circle at 50% 50%,
      #c5245a,
      rgba(255, 171, 143, 0) 91%
    );
  }
}
/* 波纹效果 */

.wave .circle:first-child {
  animation-delay: 0.4s;
  animation: big 2s linear infinite;
}
.wave .circle:nth-child(2) {
  width: 150px;
  height: 150px;
  padding: 70px;
  border: solid 2px rgba(239, 63, 64, 0.3);
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(255, 171, 143, 0),
    #c5245a 74%
  );
  animation-delay: 0.8s;
  animation: big2 2s linear infinite;
}
.wave .circle:nth-child(3) {
  width: 200px;
  height: 200px;
  margin: 0 98px 0 0;
  padding: 90px;
  opacity: 0.4;
  border: solid 1.9px rgba(239, 63, 64, 0.3);
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(255, 171, 143, 0),
    #c5245a 74%
  );
  animation-delay: 1.2s;
  animation: big3 2s linear infinite;
}
@keyframes big {
  0% {
    width: 0;
    height: 0;
  }
  70% {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
  100% {
    width: 80px;
    height: 80px;
    opacity: 0;
  }
}
@keyframes big2 {
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 80px;
    height: 80px;
    opacity: 1;
  }
  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
@keyframes big3 {
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 150px;
    height: 150px;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}
.icon-map {
  margin-top: 40px;
  margin-left: 80px;
  margin-right: 60px;
  position: relative;

  .warning {
    opacity: 1;
    position: absolute;
    top: 330px;
    left: 209px;
    width: 64px;
    object-fit: contain;
    z-index: 3;
    cursor: pointer;
    height: 76px;
    padding: 28px;
    animation: showw 1s forwards;
  }
  .warning2 {
    opacity: 1;
    position: absolute;
    top: 300px;
    left: 239px;
    width: 64px;
    object-fit: contain;
    z-index: 3;
    cursor: pointer;
    height: 76px;
    padding: 28px;
    animation: showw 1s forwards;
  }
  @keyframes showw {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .warningw {
    opacity: 1;
    position: absolute;
    top: 330px;
    left: 209px;
    width: 64px;
    object-fit: contain;
    z-index: 3;
    cursor: pointer;
    height: 76px;
    padding: 28px;
    animation: showw1 1s forwards;
  }
  .warningw2 {
    opacity: 1;
    position: absolute;
    top: 300px;
    left: 239px;
    width: 64px;
    object-fit: contain;
    z-index: 3;
    cursor: pointer;
    height: 76px;
    padding: 28px;
    animation: showw1 1s forwards;
  }
  @keyframes showw1 {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  .mdiv {
    width: 787px;
    height: 0px;
    margin: 50px 79px 94px 80px;
    opacity: 0.9;
    border-radius: 1px;
    background-color: #862020;
    text-align: center;
    display: grid;
    grid-template-columns: 250px 497px;
    overflow: hidden;
    position: absolute;
    .bigimg {
      margin-left: 40px;
      margin-top: 30px;
    }

    .showRight {
      display: grid;
      grid-template-rows: 100px 190px;
      margin-left: 27px;
      margin-top: -15px;
      .showleft {
        display: grid;
        grid-template-columns: 96px 1fr;
        .icon {
          display: inline-block;
          margin-left: 40px;
          margin-top: 45px;
        }
        .icon-msg {
          width: 220px;
          height: 26px;
          margin: 10px 0px 0px -55px;
          font-family: SourceHanSansCN;
          font-size: 26px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 110px;
          letter-spacing: normal;
          color: #ffffff;
          // float: left;
        }
      }

      .ilist {
        display: grid;
        grid-template-columns: 16px 98px 1fr;
        margin-left: 40px;
        margin-top: 4px;

        img:nth-of-type(1) {
          margin: 0;
          margin-top: 7px;
          display: inline-block;
        }
        div:nth-of-type(1) {
          width: 82px;
          height: 16px;
          margin-top: 7px;
          font-family: SourceHanSansCN;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 16px;
          letter-spacing: normal;
          color: rgba(255, 255, 255, 0.8);

          display: inline-block;
        }
        div:nth-of-type(2) {
          margin-top: 7px;
          display: inline-block;
          width: 350px;
          height: 19px;
          font-family: DINAlternate;
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 16px;
          text-align: start;
          letter-spacing: normal;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    .showRight1 {
      margin-left: 0px;
    }
  }
  .mcdiv {
    animation: showHeight 1.5s;
    animation-fill-mode: forwards;
  }
  @keyframes showHeight {
    0% {
      height: 0px;
    }
    25% {
      height: 0px;
    }
    50% {
      height: 0px;
    }
    100% {
      height: 270px;
    }
  }
  .mcdiv2 {
    animation: showHeight2 1.5s;
    animation-fill-mode: forwards;
  }
  @keyframes showHeight2 {
    0% {
      height: 0px;
    }
    25% {
      height: 0px;
    }
    50% {
      height: 0px;
    }
    100% {
      height: 295px;
    }
  }

  .mchdiv {
    animation: hideHeight 1s forwards;
  }
  @keyframes hideHeight {
    from {
      height: 270px;
    }
    to {
      height: 0px;
    }
  }
  .mchdiv2 {
    animation: hideHeight2 1s forwards;
  }
  @keyframes hideHeight2 {
    from {
      height: 295px;
    }
    to {
      height: 0px;
    }
  }
  .flag {
    position: absolute;
    bottom: 160px;
    left: 287px;
  }
  .flag:hover {
    cursor: pointer;
  }
  .MC {
    position: absolute;
    bottom: 137px;
    left: 250px;
  }
  .MC:hover {
    cursor: pointer;
  }
}
.card-botoom {
  width: 960px;
  height: 200px;
  background-image: url("../../static/card-bottom.png");
  margin-top: 90px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 370px 1fr;
  .card-botoom-left {
    margin-left: 20px;
    margin-top: 17px;
    display: grid;
    grid-template-rows: 48px 43px 18px 71px;
    .botoom-first {
      display: grid;
      grid-template-columns: 130px 115px 119px;
    }
    .botoom-sec {
      display: grid;
      grid-template-columns: 72px 31px 111px 149px;
      img {
        margin-left: 40px;
        margin-top: 3px;
      }
      div {
        width: 31px;
        height: 37px;
        margin-top: -3px;
        font-family: DINAlternate;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #d0021b;
      }
      .b-c-w {
        width: 70px;
        height: 37px;
        margin: -5px 2px 0 0;
        opacity: 0.9;
        font-family: DINAlternate;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #ffffff;
        margin-left: 69px;
      }
    }
    .botoom-thr {
      display: grid;
      grid-template-columns: 130px 120px;
    }
    .botoom-last {
      margin-top: 15px;
      display: grid;
      grid-template-columns: 72px 47px 116px;
      img {
        margin-left: 40px;
        margin-top: 3px;
      }
      div {
        width: 47px;
        height: 37px;
        margin-top: -3px;
        font-family: DINAlternate;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fe6323;
      }
      .b-c-w {
        width: 70px;
        height: 37px;
        margin: -5px 2px 0 0;
        opacity: 0.9;
        font-family: DINAlternate;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #ffffff;
        margin-left: 55px;
      }
    }
  }
  .card-botoom-right {
    margin-top: 20px;
    margin-left: 45px;
    display: grid;
    grid-template-rows: 66px 100px;
    .right-one {
      display: grid;
      grid-template-columns: 120px 136px 120px 120px;
      .ib:nth-of-type(3) {
        margin-left: 33px;
      }
    }
    .botoom-list {
      color: #00c1ff;
      width: 500px;
      margin-top: -10px;
      margin-left: 27px;
    }
  }
}
</style>
