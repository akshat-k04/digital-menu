const express = require('express');
const TableBookingModel = require('./../../models/Table_booking_model.js');
const jwt = require('jsonwebtoken');
const Table_registration_model = require('./../../models/table_register_model.js');
const TableBookingRouter = express.Router();
const OrderModel = require('./../../models/Order_model.js');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err || !('is_employee' in user)) {
                if (!res.headersSent) {
                    res.status(403).send({ 'message': 'error' }); // Forbidden
                }
                return;
            }
            console.log("Verified");
            next();
        });
    } else {
        if (!res.headersSent) {
            res.status(401).send({ 'message': 'error' }); // Unauthorized
        }
    }
};

TableBookingRouter.post('/add', authenticateJWT, add_booking);
TableBookingRouter.post('/delete', authenticateJWT, delete_booking);
TableBookingRouter.post('/update', authenticateJWT, update_booking);
TableBookingRouter.get('/', authenticateJWT, get_bookings);

async function add_booking(req, res) {
    try {
        await TableBookingModel.create(req.body);
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function update_booking(req, res) {
    try {
        let data = await TableBookingModel.findOne({ _id: req.body._id });
        if (!data.pincode || data.pincode == "") {
            try {
                let info = {
                    "order_id": req.body.order_id,
                    "customer_name": req.body.customer_name,
                    "customer_contact": req.body.customer_contact
                };

                let temp = await OrderModel.create(info);

                let data2 = {
                    "table_number": req.body.table_number,
                    "pincode": req.body.pincode,
                    "order_id": req.body.order_id,
                };
                await Table_registration_model.findOneAndUpdate({ table_number: req.body.table_number }, data2);
                await TableBookingModel.findOneAndUpdate({ _id: req.body._id }, req.body);
                res.send({ 'message': 'done' });
            } catch (err) {
                res.status(500).send({ 'message': `${err}` });
            }
        } else {
            res.status(500).send({ 'message': `not possible` });
        }
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function delete_booking(req, res) {
    try {
        await TableBookingModel.findOneAndDelete({ _id: req.body.id });
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function get_bookings(req, res) {
    try {
        let data = await TableBookingModel.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

module.exports = TableBookingRouter;
