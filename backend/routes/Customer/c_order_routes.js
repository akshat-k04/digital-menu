const express = require('express');
const OrderModel = require('./../../models/Order_model.js');
const jwt = require('jsonwebtoken');
const subOrder_model = require('./../../models/sub_order.js') ;
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
        const updatedItem = updated_order.find((newItem) => newItem.menuItem == prevItem.menuItem._id);

        // Ensure updated item exists and quantity is not reduced
        return updatedItem && updatedItem.quantity >= prevItem.quantity;
    });

    let differenceItems = [];
    for (let i = 0; i < updated_order.length; i++) {
        let found = false;
        for (let pi = 0; pi < prev_order.length; pi++) {
            if (prev_order[pi].menuItem == updated_order[i].menuItem) {
                found = true;
                let tempDiff = { ...updated_order[i] };
                tempDiff.quantity = updated_order[i].quantity - prev_order[pi].quantity;
                // console.log(tempDiff.quantity) ;
                if (tempDiff.quantity > 0) {
                    differenceItems.push(tempDiff);
                }
                break; // Once matched, no need to continue with this updated_order item
            }
        }
        if (!found) {
            let tempDiff = { ...updated_order[i] };
            differenceItems.push(tempDiff);
        }
    }

    return { safe, difference: differenceItems };
}


async function update_order(req, res) {
    try {
        let prev_order = await OrderModel.findOne({ order_id: req.user.order_id }) ;
        let updated_order = req.body.items ;
        let {safe, difference} = checkQuantityReduction(prev_order.items, updated_order);
        // console.log(updated_order) ;
        // console.log(prev_order.items) ;
        console.log(safe) ;
        if(safe){
            await OrderModel.findOneAndUpdate({ order_id: req.user.order_id }, req.body);
            // send the difference to the queue , for table number check req.user.table
            let sub_order ={
                "order_id": req.user.order_id,
                "status": "Order Placed",
                "items": difference
            }
            await subOrder_model.create(sub_order) ;

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
