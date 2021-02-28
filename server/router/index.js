// var dbserver = require("./../dao/dbserver");
var fs = require("fs");
var url = require("url");

module.exports = function(app) {
  app.get(/contain/, (req, res) => {
    fs.readFile("config.json", function(err, data) {
      if (err) {
        return console.error(err);
      }
      var url = req.url.replace(/^\/|\/$/g, "");
      data = JSON.parse(data);
      // console.log(url);
      // console.log(data[url]);
      res.send(data[url]);
    });
  });
};
