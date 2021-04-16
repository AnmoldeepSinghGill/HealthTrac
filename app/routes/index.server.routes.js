//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument

//Load the 'index' controller
const index = require("../controllers/index.server.controller");
//
//handle routing for get and post request
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index", {
      info: "see the results in console window",
    });
  });

  app.get("/run", index.trainAndPredict);
  app.post("/run", index.trainAndPredict);
};
