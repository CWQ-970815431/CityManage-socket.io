var mongoose = require("mongoose");

//创建
var db = mongoose.createConnection(
  "mongodb://localhost:27017/Message from staff",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.info("数据库 staff 打开成功");
});

module.exports = db;
