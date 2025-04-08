// src/routes/ourProductRoute.js
const express = require("express")
const router = express.Router()

const productController = require("../controller/productController.js")

// No authentication for public product endpoints
router.get("/getOurProduct", productController.getAllProducts)

module.exports = router