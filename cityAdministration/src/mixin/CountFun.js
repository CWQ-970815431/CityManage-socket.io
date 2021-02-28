import { CountUp } from "countup.js";
export const cFun = {
  data() {
    return {
      refList: []
    };
  },
  methods: {
    //countup事件
    restart(Ref, end, option, i) {
      this.refList[i] = new CountUp(Ref, end, option);
      if (!this.refList[i].error) {
        this.refList[i].start();
      }
    },
    //countup定时器事件
    intervar() {
      var rLength = this.refList.length;
      for (var i = 0; i < rLength; i++) {
        this.refList[i].reset();
        this.refList[i].start();
      }
    }
  }
};
