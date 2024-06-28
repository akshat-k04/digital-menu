const mongoose = require('mongoose');
const restaurant_detail = require('../../models/restaurant_model.js');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt') ;

const Employee_crud_router = express.Router();



const verifyToken = (req, res, next) => {
    const token = req.headers['token']?.split(' ')[1];
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


Employee_crud_router.post('/Signin',signin) ;
Employee_crud_router.post('/add', verifyToken, add_employee);
Employee_crud_router.post('/delete', verifyToken, delete_employee);
Employee_crud_router.get('/', verifyToken, get_employee);
Employee_crud_router.post('/verifyToken', verifyToken, (req, res) => { res.status(200).json({ message: 'Token is valid', user: req.user }) ;});

async function signin(req, res) {
    const { username, password } = req.body;
    try {
        const restaurant_data = await restaurant_detail.findOne({ username });
        if (restaurant_data && await bcrypt.compare(password, restaurant_data.password)) {
            const token = jwt.sign(
                { username: restaurant_data.username, is_employee: restaurant_data.is_employee },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '23h' }
            );
            res.json({ 'token': token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
}
async function add_employee(req, res) {
    try {
        req.body.is_employee = true ;
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
        if(!req.body.is_employee){
            res.send({ 'message': 'he is the owner. Unable to delete' });
        }
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
