const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const OrderModel = require("./../../models/Order_model.js");
const DishesModel = require("./../../models/dishes_model.js"); // Import the Dishes model
const subOrder_model = require("./../../models/sub_order.js");
const OrderRouter = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["c_token"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

OrderRouter.post("/update", verifyToken, update_order); // used by owner to complete the order if the user did't tap on complete order
OrderRouter.post("/find", find_order);

// function checkQuantityReduction(prev_items, updated_items) {
//   const safe = prev_items.every((prevItem) => {
//     const updatedItem = updated_items.find(
//       (newItem) => newItem.menuItem === prevItem.menuItem._id.toString()
//     );
//     return updatedItem && updatedItem.quantity >= prevItem.quantity;
//   });

//   const differenceItems = updated_items.map((updatedItem) => {
//     const prevItem = prev_items.find(
//       (item) => item.menuItem._id.toString() === updatedItem.menuItem
//     );
//     return prevItem ? {
//       ...updatedItem,
//       quantity: updatedItem.quantity - prevItem.quantity,
//     } : updatedItem;
//   }).filter(item => item.quantity > 0);

//   return { safe, difference: differenceItems };
// }

async function update_order(req, res) {
  try {
    const prev_order = await OrderModel.findOne({
      order_id: req.user.order_id,
    }).populate("items.menuItem");

    if (!prev_order) {
      return res.status(404).send({ message: "Previous order not found" });
    }

    const updated_order = req.body.items;
    // const { safe, difference } = checkQuantityReduction(prev_order.items, updated_order);

    // if (safe) {
    const complete_order = await OrderModel.findOneAndUpdate(
      { order_id: req.user.order_id },
      req.body,
      { new: true } // return the updated document
    ).populate("items.menuItem");

    // const sub_order = {
    //   order_id: req.user.order_id,
    //   status: "Order Placed",
    //   items: difference,
    // };
    // await subOrder_model.create(sub_order);

    return res.send({ message: complete_order });
    // } else {
    //   return res.send({ message: prev_order });
    // }
  } catch (err) {
    console.error("Update Order Error:", err);
    return res.status(500).send({ message: `${err}` });
  }
}

async function find_order(req, res) {
  try {
    const data = await OrderModel.findOne({
      order_id: req.body.order_id,
    }).populate("items.menuItem");
    res.send({ message: data });
  } catch (err) {
    res.status(500).send({ message: `${err}` });
  }
}

module.exports = OrderRouter;
