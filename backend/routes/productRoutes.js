const router = require("express").Router;

const pRouter = router();
const pCtrl = require("../controllers/productController");
const auth = require("../middleware/auth");
pRouter.post("/", auth, pCtrl.create);
pRouter.get("/", pCtrl.getAll);


// in productRoutes.js
pRouter.get("/:id", async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// 🔍 Search route
pRouter.get("/search", pCtrl.search);

module.exports = pRouter;

module.exports = pRouter;