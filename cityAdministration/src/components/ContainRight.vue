<template>
  <div class="rstop">
    <div class="car-stop">
      <div class="card-bg">
        <div class="content-text">停车场总览</div>
        <div class="main-contain">
          <div class="left">
            <div class="text-contain">停车场泊位总数</div>
            <div class="content-text" ref="sTotal">{{this.datalist.sTotalEnd}}</div>
            <div class="text-contain">封闭停车场泊位数</div>
            <div class="content-text" ref="closeNumber">{{this.datalist.closeEnd}}</div>
            <div class="text-contain">道路停车场泊位数</div>
            <div class="content-text" ref="roadNumber">{{this.datalist.roadEnd}}</div>
            <div class="text-contain">实时监测泊位数</div>
            <div class="content-text" ref="realNumber">{{this.datalist.realEnd}}</div>
          </div>
          <div class="right">
            <div class="text-contain">今日停车车流量</div>
            <div class="content-text" ref="todayStop">{{this.datalist.todayEnd}}</div>
            <div class="text-contain">剩余泊位数</div>
            <div class="content-text" ref="remainNumber">{{this.datalist.remainEnd}}</div>
            <img src="../../static/car.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="stop-echarts">
      <div class="card-bg">
        <div class="content-text">停车场数据</div>
        <div id="myChart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { cFun } from "../mixin/CountFun";
import Highcharts from "highcharts/highstock";
import variablepie from "highcharts/modules/variable-pie.js";
variablepie(Highcharts);
export default {
  name: "rstop",

  mixins: [cFun],
  data() {
    return {
      datalist: {
        sTotalEnd: 212817,
        closeEnd: 206086,
        roadEnd: 6981,
        realEnd: 9972,
        todayEnd: 3290,
        remainEnd: 5826
      },
      options: {
        startVal: 0
      }
    };
  },
  created() {},
  sockets: {
    connect() {
      this.$socket.emit("sendMsg", [this.datalist, "contain/right"]); //监听connect事件
    },
    right(data) {
      this.datalist = data;
      // this.initCountUp();
    }
  },
  mounted() {
    this.drawLine();
    // this.axios
    //   .get(this.serverUrl + "/contain/right")
    //   .then(res => {
    //     this.datalist = res.data;
    //     this.initCountUp();
    //     this.drawLine();
    //   })
    //   .catch(res => {
    //     console.log("error");
    //   });
  },
  methods: {
    //绘制右下角兰丁格尔饼图
    drawLine() {
      var options = {
        chart: {
          type: "variablepie",
          backgroundColor: "rgba(0,0,0,0)"
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false
          }
        },
        series: [
          {
            dataLabels: {
              style: {
                color: "#FFFFFF",
                textOutline: "none"
              },
              color: "#ffffff"
            },
            zIndex: 1,

            innerSize: "50%",
            zMin: 0,
            name: "countries",
            borderColor: "rgba(0,0,0,0)",
            data: [
              {
                name: "专用停车场",
                y: 10,
                z: 92.9,
                color: "#FAC661"
              },
              {
                name: "路边停车场",
                y: 20,
                z: 118.7,
                color: "#FF974F"
              },
              {
                name: "客货停车场",
                y: 30,
                z: 124.6,
                color: "#33D3B2"
              },
              {
                name: "开放停车场",
                y: 30,
                z: 137.5,
                color: "#798afa"
              },
              {
                name: "公共停车场",
                y: 200,
                z: 201.8,
                color: "#007eff",
                value: "@!21",
                data: "123213",
                label: "123"
              }
            ]
          },
          {
            dataLabels: {
              color: "#ffffff",
              enabled: true,
              color: "#000"
            },
            center: [161.5, 152],
            innerSize: "80%",
            zMin: 0,
            name: "countries",
            borderColor: "#808080",

            size: "25%",
            data: [
              {
                name: "3%",
                y: 10,
                z: 92.9,
                color: "#e0b157",
                connectorColor: "rgba(0,0,0,0)",
                dataLabels: {
                  style: {
                    color: "#FFFFFF",
                    textOutline: "none"
                  },
                  fontFamily: "DINAlternate",
                  enabled: true,
                  color: "#FFFFFF",
                  x: -25,
                  y: 11
                }
              },
              {
                name: "7%",
                y: 20,
                z: 118.7,
                color: "#e58746",
                dataLabels: {
                  connectorColor: "rgba(0,0,0,0)",
                  style: {
                    color: "#FFFFFF",
                    textOutline: "none"
                  },
                  fillColor: "red",
                  enabled: true,
                  color: "#FFFFFF",
                  x: -60,
                  y: -9
                }
              },
              {
                name: "9%",
                y: 30,
                z: 124.6,
                color: "#2dbd9f",
                dataLabels: {
                  connectorColor: "rgba(0,0,0,0)",
                  style: {
                    color: "#FFFFFF",
                    textOutline: "none"
                  },
                  fillColor: "red",
                  enabled: true,
                  color: "#FFFFFF",
                  x: -49,
                  y: -10
                }
              },
              {
                name: "9%",
                y: 30,
                z: 137.5,
                color: "#6c7be0",
                dataLabels: {
                  connectorColor: "rgba(0,0,0,0)",
                  style: {
                    color: "#FFFFFF",
                    textOutline: "none"
                  },
                  fillColor: "red",
                  enabled: true,
                  color: "#FFFFFF",
                  x: -40,
                  y: -2
                }
              },
              {
                name: "72%",
                y: 200,
                z: 201.8,
                color: "#0071e5",
                dataLabels: {
                  connectorColor: "rgba(0,0,0,0)",
                  style: {
                    color: "#FFFFFF",
                    textOutline: "none"
                  },
                  fillColor: "red",
                  enabled: true,
                  color: "#FFFFFF",
                  x: 35,
                  y: -10
                }
              }
            ]
          }
        ]
      };

      var chart = Highcharts.chart("myChart2", options);
    },

    //初始化COUNTUP
    initCountUp() {
      this.restart(this.$refs.sTotal, this.datalist.sTotalEnd, this.options, 0);
      this.restart(
        this.$refs.closeNumber,
        this.datalist.closeEnd,
        this.options,
        1
      );
      this.restart(
        this.$refs.roadNumber,
        this.datalist.roadEnd,
        this.options,
        2
      );
      this.restart(
        this.$refs.realNumber,
        this.datalist.realEnd,
        this.options,
        3
      );

      this.restart(
        this.$refs.todayStop,
        this.datalist.todayEnd,
        this.options,
        4
      );

      this.restart(
        this.$refs.remainNumber,
        this.datalist.remainEnd,
        this.options,
        5
      );
      // setInterval(this.intervar, 7000);
    }
  }
};
</script>
<style scoped lang="scss">
#myChart2 {
  width: 400px;
  height: 400px;
}
.rstop {
  display: grid;
  grid-template-rows: 457px 470px;
}
.card-bg {
  width: 403px;
  height: 420px;
  margin: 12px 13px 30px;
  padding: 16px 24px 19px 30px;
  object-fit: contain;
  background-image: url("../../static/card-bg.png");
  background-repeat: no-repeat;
  margin-left: -20px;
}
.car-stop {
  .content-text {
    width: 120px;
    height: 50px;
    margin-top: 2px;
    margin-left: 137px;
    text-shadow: 0 0 24px rgba(0, 193, 255, 0.6);
    font-family: SourceHanSansCN;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #00c1ff;
    text-align: center;
  }
  .main-contain {
    height: 350px;
    display: grid;
    grid-template-columns: 258px 162px;
  }
  .left {
    margin-left: 16px;
    .content-text:nth-child(6) {
      margin-left: -9px;
    }
    .content-text:nth-child(6) {
      margin-left: -9px;
    }
    .content-text:nth-child(8) {
      margin-left: -9px;
    }
    .text-contain {
      width: 150px;
      height: 18px;
      margin: 15px 0 4px 2px;
      opacity: 0.7;
      font-family: SourceHanSansCN;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #ffffff;
    }
    .content-text {
      width: 100px;
      height: 37px;
      margin: 10px 38px 0 5px;
      font-family: DINAlternate;
      font-size: 32px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #00c1ff;
    }
  }
  .right {
    margin-left: -15px;
    .text-contain {
      width: 150px;
      height: 18px;
      margin: 15px 0 4px 2px;
      opacity: 0.7;
      font-family: SourceHanSansCN;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #ffffff;
    }
    .content-text {
      width: 100px;
      height: 37px;
      margin: 10px 38px 0 5px;
      font-family: DINAlternate;
      font-size: 32px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #00c1ff;
    }
    img {
      margin-left: -10px;
      margin-top: 50px;
    }
  }
}
.stop-echarts {
  .content-text {
    width: 120px;
    height: 24px;
    margin-top: 3px;
    margin-left: 137px;
    text-shadow: 0 0 24px rgba(0, 193, 255, 0.6);
    font-family: SourceHanSansCN;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #00c1ff;
  }
}
</style>
