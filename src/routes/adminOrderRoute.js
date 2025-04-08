const express = require("express")
const router = express.Router()

const orderController = require("../controller/adminOrderController.js");
const authenticate = require("../middleware/authenticate.js");
const adminOnly = require("../middleware/adminOnly");

router.get("/", authenticate, orderController.getAllOrders);
router.put('/:orderId/confirmed', authenticate, orderController.confirmedOrder);
router.put('/:orderId/ship', authenticate, orderController.shipOrder);
router.put('/:orderId/deliver', authenticate, orderController.deliverOrder);
router.put('/:orderId/cancel', authenticate, orderController.cancelOrder);
router.put('/:orderId/delete', authenticate, orderController.deleteOrder);
router.post("/", authenticate, adminOnly, productController.createProduct)

module.exports = router;
