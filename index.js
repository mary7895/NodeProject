const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
let usersRoutes=require('./routes/users')
let productRoutes=require('./routes/products')
let sellerRoutes=require('./routes/seller')
let ordersRoutes=require('./routes/orders')


const app = express();

app.use(express.static('./static'))
app.use(express.json());

app.use('/users',usersRoutes)
app.use('/products',productRoutes)
app.use('/seller',sellerRoutes)
app.use('/orders',ordersRoutes)

//
app.use('*',(req,res,next)=>{
  res.status(404).json({ message: `Cannot access ${req.originalUrl}` });
})
app.use(cors({
  origin: '*',
}));
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/NodeProject")
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.listen(4444, () => {
    console.log("Server started listening successfully on port 4444");
  });
