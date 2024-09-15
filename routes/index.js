const express = require("express");
const path = require("path");
const admin = require("./admin");
module.exports = function (app) {
  app.use("/api/files", express.static(path.join("src/storage/files")));
  app.use("/api/admin", admin);
};
