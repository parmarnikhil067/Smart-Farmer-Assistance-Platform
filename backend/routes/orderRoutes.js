const router = require("express").Router;

const oRouter = router();
const oCtrl = require("../controllers/orderController");
oRouter.post("/", oCtrl.create);
oRouter.get("/", oCtrl.getAll);
module.exports = oRouter;