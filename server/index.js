const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
var server = app.listen(8082);
var io = require("socket.io").listen(server);
var aaa;
var bbb;
var ccc;
io.on("connection", socket => {
  socket.on("sendMsg", data => {
    var res = data[0];
    var url = data[1];

    fs.readFile("config.json", function(err, data) {
      if (err) {
        return console.error(err);
      }

      data = JSON.parse(data);

      if (url == "contain/left") {
        clearInterval(aaa);
        aaa = setInterval(function() {
          if (data[url]["dayUse"] == "82781") {
            data[url]["dayUse"] = "83999";
            data[url]["monUse"] = 66666.66;
            data[url]["yearUse"] = 1113596.24;
            res = data[url];
            io.emit("left", res);
          } else {
            data[url]["dayUse"] = "82781";
            data[url]["monUse"] = 77777.77;
            data[url]["yearUse"] = 3115792.54;
            res = data[url];
            io.emit("left", res);
          }
        }, 3000);
      } else if (url == "contain/right") {
        clearInterval(bbb);
        bbb = setInterval(function() {
          if (data[url]["sTotalEnd"] == 212817) {
            for (item in data[url]) {
              data[url][item] += 50;
            }
            res = data[url];
            io.emit("right", res);
          } else {
            for (item in data[url]) {
              data[url][item] -= 50;
            }
            res = data[url];
            io.emit("right", res);
          }
        }, 3000);
      } else if (url == "contain/center") {
        clearInterval(ccc);
        ccc = setInterval(function() {
          if (data[url]["RedEnd"] < 50) {
            for (item in data[url]) {
              if (item != "data") {
                data[url][item]++;
              }
          
            }
            res = data[url];

           
            io.emit("center", res);
          } else {
            for (item in data[url]) {
              if (item != "data") {
                data[url][item] -= 10;
              }
            }
            res = data[url];
            io.emit("center", res);
          }
        }, 3000);
      }
    });

    // console.log(res);
  });
  //list请求和center在同一组件 无法在同一组件内发同名事件
  socket.on("listt", data => {
    var res = data[0];
    var url = data[1];
    // console.log(res, url);

    fs.readFile("config.json", function(err, data) {
      if (err) {
        return console.error(err);
      }

      if (res != data) {
        data = JSON.parse(data);
        res = data[url];
      }

      io.emit("list", res);
    });
  });
});

app.use(express.json());



//404页面
app.use(function(req, res, next) {
  let err = new Error("Not Found 404");
  err.status = 404;
  next(err);
});

//出现错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
