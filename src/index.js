const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');

const app = express()


app.use(bodyParser.json());
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=> {
    return res.status(200).send({message: "helo ji", status: true})
})

const authRouters = require("./routes/authRoute")
app.use('/auth',authRouters)

const userRouters = require("./routes/userRoute")
app.use('/api/users',userRouters)

const productRouter = require("./routes/productRoute")
app.use('/api/products', productRouter)

const adminProductRouter = require("./routes/adminProductsRoute")
app.use('/api/admin/products', adminProductRouter)

const cartRouter = require("./routes/cartRoute")
app.use('/api/cart', cartRouter)

const cartItemRouter = require("./routes/cartItemsRoute")
app.use('/api/cart_items', cartItemRouter)

const orderRouter = require("./routes/orderRoute")
app.use('/api/orders', orderRouter)

const adminOrderRouter = require("./routes/adminOrderRoute")
app.use('/api/admin/orders', adminOrderRouter)

const reviewRouter = require("./routes/reviewRoute")
app.use('/api/reviews', reviewRouter)

const ratingRouter = require("./routes/ratingRoute")
app.use('/api/ratings', ratingRouter)

module.exports = app;
