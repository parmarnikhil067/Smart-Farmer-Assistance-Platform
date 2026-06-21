const router = require("express").Router;

const aRouter = router();
const authCtrl = require("../controllers/authController");
aRouter.post("https://smart-farmer-assistance-platform-tx.vercel.app/register", authCtrl.register);
aRouter.post("https://smart-farmer-assistance-platform-tx.vercel.app/login", authCtrl.login);


module.exports = aRouter;