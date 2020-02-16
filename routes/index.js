const $get = require("../controllers/mentor/get");
const $create = require("../controllers/mentor/create").create;
const $update = require("../controllers/mentor/update").update;
const $delete = require("../controllers/mentor/delete").delete;
const $createTask = require("../controllers/mentor/task/create").create;
const $deleteTask = require("../controllers/mentor/task/delete").delete;

exports.routes = function(router) {
  router.put("/api/mentor/", $update);
  router.get("/api/mentor/", $get.get);
  router.get("/api/mentor/all/", $get.getAll);
  router.post("/api/mentor/", $create);
  router.delete("/api/mentor/", $delete);
  router.post("/api/task/", $createTask);
  router.delete("/api/task/", $deleteTask);
};
