const mongoose = require('mongoose');
const Table_registration_model = require('./../../models/table_register_model.js') ;
const jwt = require('jsonwebtoken');
const express = require('express');


const Table_registration_Route = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err || user.is_employee) {
                res.send({ "message": "error" });
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified");
            next();
        });
    } else {
        res.send({ "message": "error" });
        res.sendStatus(401); // Unauthorized
    }
};

Table_registration_Route.post('/add', authenticateJWT, add_table);
Table_registration_Route.post('/delete', authenticateJWT, delete_table);
Table_registration_Route.get('/', get_table);




async function add_table(req, res) {
    try {
        await Table_registration_model.create(req.body);
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}
async function delete_table(req, res) {
    try {
        await Table_registration_model.findOneAndDelete({ id: req.body.id });
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}
async function get_table(req, res) {
    try {
        let data = await Table_registration_model.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

module.exports = Table_registration_model;
