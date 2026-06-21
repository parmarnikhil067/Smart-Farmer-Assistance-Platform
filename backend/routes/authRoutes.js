const router = require("express").Router;

const aRouter = router();
const authCtrl = require("../controllers/authController");
aRouter.post("api/register", authCtrl.register);
aRouter.post("api/login", authCtrl.login);


module.exports = aRouter;