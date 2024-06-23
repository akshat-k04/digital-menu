const express = require('express');
const OrderModel = require('./../../models/Order_model.js');
const jwt = require('jsonwebtoken');

const OrderRouter = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
            temp = await OrderModel.findOne({ order_id: req.body.order_id });
            
            if (err || temp.order_id != req.body.order_id|| temp.completed) {
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified");
            next() ;
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};


OrderRouter.post('/update',authenticateJWT, update_order); // used by owner to complete the order if the user did't tap on complete order
OrderRouter.post('find', find_order);


async function update_order(req, res) {
    try {
        await OrderModel.findOneAndUpdate({ order_id: req.body.id }, req.body);
        res.send({ 'message': 'done' });
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
