const express = require('express');
const TableBookingModel = require('./../../models/Table_booking_model.js');
const jwt = require('jsonwebtoken');

const TableBookingRouter = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err || user.is_employee) {
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified");
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

TableBookingRouter.post('/add', authenticateJWT, add_booking);
TableBookingRouter.post('/delete', authenticateJWT, delete_booking);
TableBookingRouter.post('/update', authenticateJWT, update_booking);
TableBookingRouter.get('/', authenticateJWT, get_bookings);
TableBookingRouter.use('/order',Order) ;

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
        await TableBookingModel.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.send({ 'message': 'done' });
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
