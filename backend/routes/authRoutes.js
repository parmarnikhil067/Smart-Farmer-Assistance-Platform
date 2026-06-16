const router = require("express").Router;

const aRouter = router();
const authCtrl = require("../controllers/authController");
aRouter.post("/register", authCtrl.register);
aRouter.post("/login", authCtrl.login);


module.exports = aRouter;