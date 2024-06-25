const mongoose = require("mongoose");
const Table_details = require("./../../models/table_register_model.js");
const jwt = require("jsonwebtoken");
const express = require("express");

const Customer_signin = express.Router();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("token");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err || user.is_employee) {
        res.send({ message: "error" });
        return res.sendStatus(403); // Forbidden
      }
      console.log("Verified");
      next();
    });
  } else {
    res.send({ message: "error" });
    res.sendStatus(401); // Unauthorized
  }
};

Customer_signin.post("/Signin", signin);

async function signin(req, res) {
  const { table, pincode } = req.body;

  const Table_data = await Table_details.findOne({ table_number: table });
  if (Table_data && pincode == Table_data.pincode) {
    const token = jwt.sign(
      { order_id: Table_details.order_id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token: token });
  } else {
    res.status(401).send("Invalid credentials");
  }
}

module.exports = Customer_signin;
