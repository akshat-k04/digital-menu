const mongoose = require("mongoose");
const Table_details = require("./../../models/table_register_model.js");
const jwt = require("jsonwebtoken");
const express = require("express");

const Customer_signin = express.Router();

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

Customer_signin.post("/", signin);
Customer_signin.post("/verify", verifyToken, (req, res) => { res.status(200).json({ message: 'Token is valid', user: req.user }); });

// async function

async function signin(req, res) {
  const { table, pincode } = req.body;

  const Table_data = await Table_details.findOne({ table_number: table });
  
  if (Table_data && pincode.toString() == Table_data.pincode) {
    // console.log(Table_data.order_id) ;
    const token = jwt.sign(
      { order_id: Table_data.order_id,table:table },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token: token });
  } else {
    res.status(401).send("Invalid credentials");
  }
}

module.exports = Customer_signin;
