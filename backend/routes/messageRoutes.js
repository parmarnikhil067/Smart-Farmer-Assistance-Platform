const router = require("express").Router;

const mRouter = router();
const mCtrl = require("../controllers/messageController");
mRouter.post("/", mCtrl.send);
mRouter.get("/:id", mCtrl.get);
module.exports = mRouter;