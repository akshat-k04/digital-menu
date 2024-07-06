const express = require('express');
const OrderModel = require('./../../models/Order_model.js');
const jwt = require('jsonwebtoken');

const OrderRouter = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers['c_token']?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

OrderRouter.post('/update', verifyToken, update_order); // used by owner to complete the order if the user did't tap on complete order
OrderRouter.post('/find', find_order);

function checkQuantityReduction(prev_order, updated_order) {
    const safe = prev_order.every((prevItem) => {
        const updatedItem = updated_order.find((newItem) => newItem.menuItem === prevItem.menuItem);

        // Ensure updated item exists and quantity is not reduced
        return updatedItem && updatedItem.quantity >= prevItem.quantity;
    });

    const difference = prev_order.filter((prevItem) => {
        const updatedItem = updated_order.find((newItem) => newItem.menuItem === prevItem.menuItem);

        // Check for quantity reduction and item existence
        return updatedItem ? updatedItem.quantity < prevItem.quantity : true;
    });

    return { safe, difference };
}

async function update_order(req, res) {
    try {
        let prev_order = await OrderModel.findOne({ order_id: req.user.order_id }) ;
        let updated_order = req.body.items ;
        console.log(prev_order.items);
        let {safe, difference} = checkQuantityReduction(prev_order.items, updated_order);

        if(safe){
            await OrderModel.findOneAndUpdate({ order_id: req.user.order_id }, req.body);
            // send the difference to the queue , for table number check req.user.table
            res.send({ 'message': 'done' });
        }
        else{
            res.send({ 'message': prev_order }) ;
        }
        
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}
async function find_order(req, res) {
    try {
        await OrderModel.findOne({ order_id: req.body.order_id }, req.body);
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}


module.exports = OrderRouter;
