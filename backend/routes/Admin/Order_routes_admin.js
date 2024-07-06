// todo create order route

const express = require('express');
const OrderModel = require('./../../models/Order_model.js');
const jwt = require('jsonwebtoken');
const dishes = require('./../../models/dishes_model.js') ;
const OrderRouter = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err || !('is_employee' in user)) {
                res.send({ 'message': 'error' });
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified");
            next();
        });
    } else {
        res.send({ 'message': 'error' });
        res.sendStatus(401); // Unauthorized
    }
};


OrderRouter.post('/update', authenticateJWT, update_order); // used by owner to complete the order if the user did't tap on complete order
OrderRouter.post('/find',find_order) ;
OrderRouter.get('/', get_orders);


async function update_order(req, res) {
    try {
        // let tep = await dishes.findOne({});
        // req.body.items = [
        //     {
        //         "menuItems":tep._id ,
        //         "quantity":5
        //     }
        // ] ;
        await OrderModel.findOneAndUpdate({ order_id: req.body.order_id }, req.body);
        res.send({ 'message': 'done' });
    } 
    catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}
async function find_order(req, res) {
    try {
        let data =await OrderModel.findOne({ order_id: req.body.order_id });
        console.log(data) ;
        res.send(data);
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function get_orders(req, res) {
    try {
        let data = await OrderModel.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

module.exports = OrderRouter;
