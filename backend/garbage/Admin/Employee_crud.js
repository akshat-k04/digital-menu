const mongoose = require('mongoose');
const restaurant_detail = require('../../models/restaurant_model.js');
const jwt = require('jsonwebtoken');
const express = require('express');


const Employee_crud_router = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified");
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

Employee_crud_router.post('/add', authenticateJWT, add_employee);
Employee_crud_router.post('/delete', authenticateJWT, delete_employee);
Employee_crud_router.get('/', get_employee);

async function add_employee(req, res) {
    try {
        await restaurant_detail.create(req.body);
        res.send({ 'message': 'Booking added successfully' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function update_booking(req, res) {
    try {
        await restaurant_detail.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.send({ 'message': 'Booking updated successfully' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function delete_employee(req, res) {
    try {
        await restaurant_detail.findOneAndDelete({ _id: req.body.id });
        res.send({ 'message': 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function get_employee(req, res) {
    try {
        let data = await restaurant_detail.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

module.exports = Employee_crud_router;
