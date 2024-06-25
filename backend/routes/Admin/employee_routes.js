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
            if (err|| user.is_employee) {
                res.send({"message":"error"}) ;
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

Employee_crud_router.post('/Signin',signin) ;
Employee_crud_router.post('/add', authenticateJWT, add_employee);
Employee_crud_router.post('/delete', authenticateJWT, delete_employee);
Employee_crud_router.get('/', authenticateJWT, get_employee);



async function signin(req, res) {
    const { username, password } = req.body;

    const restaurant_data = await restaurant_detail.findOne({ username });
    if (restaurant_data && await bcrypt.compare(password, restaurant_data.password)) {
        const token = jwt.sign({ username: restaurant_data.username, is_employee: restaurant_data.is_employee }, process.env.JWT_SECRET_KEY, { expiresIn: '23h' });
        res.json({ 'token': token, Total_tables: restaurant_data.Total_tables });
    } else {
        res.status(401).send('Invalid credentials');
    }
}
async function add_employee(req, res) {
    try {
        req.body.is_employee = false ;
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await restaurant_detail.create(req.body);
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}
async function delete_employee(req, res) {
    try {
        await restaurant_detail.findOneAndDelete({ _id: req.body.id });
        res.send({ 'message': 'done' });
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
