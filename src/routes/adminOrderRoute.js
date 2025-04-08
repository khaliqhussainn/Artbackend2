const express = require("express")
const router = express.Router()

const orderController = require("../controller/adminOrderController.js");
const authenticate = require("../middleware/authenticate.js");
const adminOnly = require("../middleware/adminOnly");

router.get("/", authenticate, adminOnly, orderController.getAllOrders);
router.put('/:orderId/confirmed', authenticate, adminOnly, orderController.confirmedOrder);
router.put('/:orderId/ship', authenticate, adminOnly, orderController.shipOrder);
router.put('/:orderId/deliver', authenticate, adminOnly, orderController.deliverOrder);
router.put('/:orderId/cancel', authenticate, adminOnly, orderController.cancellOrder);
router.delete('/:orderId', authenticate, adminOnly, orderController.deleteOrder);

module.exports = router;