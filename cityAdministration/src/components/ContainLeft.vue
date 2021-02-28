<template>
  <div class="LLE">
    <div class="light">
      <div class="card-bg">
        <div class="content-text">路灯信息</div>
        <div class="open">今日开灯时间</div>
        <div class="time">
          <div class="Mask">
            <div class="content-text">{{ time.hours[0] }}</div>
          </div>

          <div class="Mask" style>
            <div class="content-text nine">{{ time.hours[1] }}</div>
          </div>
          <div>
            <div class="Rectangle"></div>
            <div class="Rectangle-copy"></div>
          </div>
          <div class="Mask">
            <div class="content-text nine">{{ time.min[0] }}</div>
          </div>
          <div class="Mask">
            <div class="content-text nine">{{ time.min[1] }}</div>
          </div>
          <div>
            <img src="../../static/lightbulb.png" class="lightbulb" alt />
            <div class="content-text lightopen">当前关灯</div>
          </div>
        </div>
        <div class="light-botoom">
          <div class="light-left">
            <div class="opened">昨日亮灯</div>
            <div class="light-time">{{ time.time }}</div>
            <div class="opened">亮灯时长</div>
            <div>
              <div class="light-time ib">{{ datalist.time1 }}</div>
              <div class="opened ib">时</div>
              <div class="light-time ib">{{ datalist.time2 }}</div>
              <div class="opened ib">分</div>
            </div>
            <div class="opened">用电量</div>
            <div class="light-time ib1" ref="countup">{{this.datalist.dayUse}}</div>
            <div class="opened ib1">k · wh</div>
          </div>
          <div class="light-botoom-right">
            <div class="opened">上线率</div>
            <div id="myChart1"></div>

            <div class="opened">节电率</div>
            <div id="myCharts" :style="{ width: '120px', height: '120px', marginTop: '25px' }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="Electricity">
      <div class="card-bg">
        <div class="content-text">用电量</div>
        <div class="elect-contain">
          <div class="content-text">月用电量</div>
          <div>
            <div ref="countup1" class="content-text-blue ib">{{this.datalist.monUse}}</div>
            <div class="content-text ib" style="  font-size: 16px;">k · wh</div>
          </div>
          <div class="content-text">年用电量</div>
          <div>
            <div ref="countup2" class="content-text-blue ib">{{this.datalist.yearUse}}</div>
            <div class="content-text ib2">k · wh</div>
          </div>
        </div>
        <div id="myChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { cFun } from "../mixin/CountFun";

export default {
  name: "Left",
  mixins: [cFun],
  data() {
    return {
      time: {
        hours: "",
        min: ""
      },
      datalist: {
        dayUse: "83999",
        time1: "10",
        time2: "54",
        percent1: "95.91",
        percent2: "51.94",
        monUse: 66666.66,
        yearUse: 1113596.24
      },
      options: {
        startVal: 0
      },
      optionsdecimal: {
        startVal: 0,
        decimalPlaces: 2
      }
    };
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
      // console.log(this.id);

      this.$socket.emit("sendMsg", [this.datalist, "contain/left"]); //监听connect事件
    },
    left(data) {
      this.datalist = data;

      // this.initCountUp();
    }
  },
  created() {},
  mounted() {
    this.drawLine();
    // this.axios
    //   .get(this.serverUrl + "/contain/left")
    //   .then(res => {
    //     this.datalist = res.data;

    //     this.initCountUp();
    //     this.drawLine();
    //   })
    //   .catch(res => {
    //     console.log("error");
    //   });
    this.getTime();
  },
  methods: {
    //获取当前时间
    getTime() {
      var hours =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      this.time.hours = String(hours).split("");

      var min =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      this.time.min = String(min).split("");
      this.time.time = String(hours) + ":" + min;
    },
    //绘制图表
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myCharts"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart"));

      //绘制95.91%图表
      myChart1.setOption({
        //  提示框组件
        tooltip: {
          //是否显示提示框组件，包括提示框浮层和 axisPointe
          show: false,
          // 触发类型: item:数据项触发，axis：坐标轴触发
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
          {
            clockwise: false,
            startAngle: 250,
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            name: "任务进度",
            type: "pie",
            // 饼图的半径，数组的第一项是内半径，第二项是外半径
            radius: ["60%", "70%"],
            // 是否启用防止标签重叠策略，默认开启
            avoidLabelOverlap: false,
            hoverAnimation: false,
            // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                // 数据值
                value: 4,
                // 数据项名称
                name: this.datalist.percent1,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                itemStyle: {
                  color: "#235849",
                  opacity: 1
                },
                label: {
                  normal: {
                    // 是显示标签
                    show: true,
                    position: "center",
                    fontSize: 24,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: "{b}\n",
                    color: "#50e3c2",
                    fontFamily: "DINAlternate",
                    padding: [19, 0, 0, 0]
                  }
                }
              },
              {
                value: 96,

                label: {
                  normal: {
                    show: true,
                    position: "center",
                    fontSize: 16,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: "\n%",
                    color: "#50e3c2",
                    fontFamily: "DINAlternate",
                    padding: [18, 0, 0, 0]
                  }
                },
                itemStyle: {
                  color: "#34BC8B"
                }
              }
            ]
          },
          {
            type: "pie",
            radius: ["0%", "60%"],
            itemStyle: {
              normal: {
                color: "#6a5acd"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            animationEasing: "cubicOut",
            data: [
              {
                value: this.value,
                itemStyle: {
                  emphasis: {
                    color: "#6a5acd"
                  }
                }
              },
              {
                value: 100 - 2,
                itemStyle: {
                  normal: {
                    color: "#235849",
                    opacity: 0.6
                  }
                }
              }
            ]
          }
        ]
      });
      //绘制51.94%图表
      myChart2.setOption({
        //  提示框组件
        tooltip: {
          //是否显示提示框组件，包括提示框浮层和 axisPointe
          show: false,
          // 触发类型: item:数据项触发，axis：坐标轴触发
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
          {
            startAngle: 267,
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            name: "任务进度",
            type: "pie",
            // 饼图的半径，数组的第一项是内半径，第二项是外半径
            radius: ["60%", "70%"],
            // 是否启用防止标签重叠策略，默认开启
            avoidLabelOverlap: false,
            hoverAnimation: false,
            // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                // 数据值
                value: 48,
                // 数据项名称
                name: this.datalist.percent2,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                itemStyle: {
                  color: "#235849",
                  opacity: 1
                },
                label: {
                  normal: {
                    // 是显示标签
                    show: true,
                    position: "center",
                    fontSize: 24,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: "{b}\n",
                    color: "#50e3c2",
                    fontFamily: "DINAlternate",
                    padding: [19, 0, 0, 0]
                  }
                }
              },
              {
                value: 52,
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    fontSize: 16,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                    formatter: "\n%",
                    color: "#50e3c2",
                    fontFamily: "DINAlternate",
                    padding: [18, 0, 0, 0]
                  }
                },
                itemStyle: {
                  color: "#34BC8B"
                }
              }
            ]
          },
          {
            type: "pie",
            radius: ["0%", "60%"],
            itemStyle: {
              normal: {
                color: "#6a5acd"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            animationEasing: "cubicOut",
            data: [
              {
                value: this.value,
                itemStyle: {
                  emphasis: {
                    color: "#6a5acd"
                  }
                }
              },
              {
                value: 100 - 2,
                itemStyle: {
                  normal: {
                    color: "#235849",
                    opacity: 0.6
                  }
                }
              }
            ]
          }
        ]
      });
      //绘制左下角折线图
      myChart3.setOption({
        tooltip: {},
        xAxis: [
          {
            type: "category",
            data: [
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun",
              "8day",
              "9day"
            ],
            max: 8,
            boundaryGap: false,
            axisLine: {
              show: true,
              symbol: "circle",
              symbolColor: "#00c1ff",
              symbolSize: [5, 15],
              lineStyle: {
                color: "#00c1ff",
                opacity: 0.4
              }
            },
            axisTick: {
              show: true,
              inside: true,
              length: 200,
              lineStyle: {
                color: "#808080",
                opacity: 0.15
              }
            },
            axisLabel: {
              show: false
            }
          }
        ],
        grid: {
          left: "15%",
          top: "50%",
          botoom: "30%"
        },

        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            symbolSize: 10,
            xAxisIndex: 0,
            data: [
              {
                value: 85,
                symbolSize: 0
              },
              90,
              105,
              100,
              95,
              110,
              105,
              110,
              {
                value: 85,
                symbolSize: 0
              }
            ],
            type: "line",
            // color: "rgba(0, 193, 255,0.4)"
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(0, 193, 255,0.4)" },
                { offset: 1, color: "rgba(0, 193, 255,0.1)" }
              ])
            },

            lineStyle: {
              color: "#00C1FF",
              width: 5
            },

            symbol: "circle",
            itemStyle: {
              color: "#00C1FF",
              shadowColor: "#5cfbff",
              shadowBlur: 20
            },
            smooth: true
          }
        ]
      });
    },
    //初始化Countup
    initCountUp() {
      // console.log(this.datalist);

      this.restart(this.$refs.countup, this.datalist.dayUse, this.options, 0);

      this.restart(
        this.$refs.countup1,
        this.datalist.monUse,
        this.optionsdecimal,
        1
      );

      this.restart(
        this.$refs.countup2,
        this.datalist.yearUse,
        this.optionsdecimal,
        2
      );
      // setInterval(this.intervar, 7000);
    }
  }
};
</script>
<style scoped lang="scss">
.LLE {
  display: grid;
  grid-template-rows: 457px 470px;
}
#myChart {
  width: 420px;
  height: 400px;
  margin-top: -90px;
  margin-left: -27px;
}
.card-bg {
  width: 420px;
  height: 420px;
  margin: 12px 13px 30px;
  padding: 16px 24px 19px 30px;
  object-fit: contain;
  background-image: url("../../static/card-bg.png");
  background-repeat: no-repeat;
}
.light {
  #myChart1 {
    width: 120px;
    height: 120px;
    margin-top: -13px;
  }

  .content-text {
    width: 96px;
    height: 24px;
    margin-bottom: 24px;
    margin-left: 150px;
    text-shadow: 0 0 24px rgba(0, 193, 255, 0.6);
    font-family: SourceHanSansCN;
    font-size: 24px;
    color: #00c1ff;
    text-align: center;
  }
  .open {
    width: 108px;
    height: 18px;
    margin: 0 186px 12px 15px;
    opacity: 0.7;
    font-family: SourceHanSansCN;
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }
  .time {
    width: 420px;
    height: 74px;
    display: grid;
    margin-left: 15px;
    grid-template-columns: 50px 58px 24px 50px 58px 150px;
    .Mask:nth-of-type(2) {
      margin-left: 8px;
    }
    .Mask:nth-of-type(4) {
      margin-left: 8px;
    }
    .Mask:nth-of-type(5) {
      margin-left: 15px;
    }
    .Mask {
      width: 50px;
      height: 84px;
      margin: 0 8px 0 0;
      padding: 0 0 5px;
      border-radius: 8px;
      box-shadow: 0 8px 16px 0 rgba(48, 22, 0, 0.1),
        0 2px 4px 0 rgba(48, 22, 0, 0.2);
      border: solid 1px #3a4860;
      background-color: #111035;
      .content-text {
        width: 39px;
        height: 74px;
        margin: 0px 5px 0 6px;
        text-shadow: 0 4px 8px rgba(60, 20, 0, 0.2),
          0 2px 4px rgba(60, 20, 0, 0.4);
        font-family: DINAlternate;
        font-size: 72px;
        font-weight: bold;
        text-align: center;
        color: #50e3c2;
      }
    }
    .Rectangle {
      width: 8px;
      height: 8px;
      margin-top: 35px;
      margin-left: 11px;
      background-color: #50e3c2;
    }
    .Rectangle-copy {
      width: 8px;
      height: 8px;
      margin: 10px 8px 10px 11px;
      background-color: #50e3c2;
    }
    .lightbulb {
      width: 33px;
      height: 48px;
      margin: 13px 19px 13px 74px;
      object-fit: contain;
    }
    .lightopen {
      width: 72px;
      height: 18px;
      margin: -10px 0 12px 54px;
      opacity: 0.7;
      font-family: SourceHanSansCN;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
    }
  }
  .light-botoom {
    width: 420px;
    height: 238px;
    display: grid;
    margin-left: 15px;
    grid-template-columns: 200px 170px;
    .light-left {
      .opened {
        width: 72px;
        height: 18px;
        margin: 29px 0px 0 2px;
        opacity: 0.7;
        font-family: SourceHanSansCN;
        font-size: 18px;
        letter-spacing: normal;
        color: #ffffff;
      }
      .opened:nth-child(3) {
        margin-top: 5px;
      }

      div:nth-child(4) {
        margin-top: 10px;
        font-size: 16px;
      }
      .opened:nth-child(5) {
        margin-top: 10px;
      }
      .opened:nth-child(7) {
        margin-top: 10px;
        margin-left: 10px;
        font-size: 16px;
      }

      .light-time:nth-child(6) {
        margin-left: 1px;
      }

      .light-time {
        width: 71px;
        height: 45px;
        margin: 7px 2px 0 2px;
        font-family: DINAlternate;
        font-size: 32px;
        font-weight: 450;
        color: #00c1ff;
      }
    }

    .light-botoom-right {
      margin-top: 35px;
      display: grid;
      grid-template-columns: 54px 138px;
      grid-template-rows: 74px 138px;
      .nine-five:nth-child(2) {
        margin-left: 15px;
      }
      .opened:nth-child(3) {
        margin-top: 70px;
      }
      .nine-five {
        width: 74px;
        height: 74px;
        margin-top: -12px;
        padding: 20px 11px 9px;
        object-fit: contain;
        background-image: url("../../static/95-91-bg.png");
        .nine-five-text {
          display: inline-block;
          text-align: center;
          width: 52px;
          height: 28px;
          margin-left: 20px;
          font-family: DINAlternate;
          font-size: 20px;
          font-weight: bold;

          line-height: 69px;
          color: #50e3c2;
        }
      }
      .bg2 {
        background-image: url("../../static/51-94-bg.png");
        margin-left: 30px;
        margin-top: 30px;
      }
    }
  }
  .ib {
    display: inline;
  }
  .ib1 {
    display: inline-block;
  }
  .opened {
    width: 72px;
    height: 18px;
    margin: 29px 0px 0 2px;
    opacity: 0.7;
    font-family: SourceHanSansCN;
    font-size: 18px;

    color: #ffffff;
  }
}
.Electricity {
  .content-text {
    width: 96px;
    height: 24px;
    margin: 0 58px 24px 8px;
    margin-left: 157px;
    text-shadow: 0 0 24px rgba(0, 193, 255, 0.6);
    font-family: SourceHanSansCN;
    font-size: 24px;

    color: #00c1ff;
  }
  .elect-contain {
    width: 460px;
    height: 88px;
    display: grid;
    grid-template-rows: 51px 37px;
    grid-template-columns: 112px 278px;
    .content-text {
      width: 72px;
      height: 18px;
      margin: 29px 0px 0 15px;
      opacity: 0.7;
      font-family: SourceHanSansCN;
      font-size: 18px;

      line-height: 18px;
      text-align: center;
      color: #ffffff;
    }
    .ib {
      display: inline-block;
      margin-left: 30px;
    }
    .ib2 {
      display: inline-block;
      margin-left: 60px;
      font-size: 16px;
    }
    .content-text-blue {
      width: 96px;
      height: 24px;
      margin-top: 13px;
      margin-left: 19px;
      text-shadow: 0 0 24px rgba(0, 193, 255, 0.6);
      font-family: DINAlternate;
      font-size: 32px;
      font-weight: bold;
      color: #00c1ff;
    }
  }
}
</style>
