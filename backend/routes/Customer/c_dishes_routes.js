express = require('express');
const DishesModel = require('../../models/dishes_model.js');
const jwt = require('jsonwebtoken');

const DishesRouter = express.Router();



DishesRouter.get('/', get_dish);


async function get_dish(req, res) {
    let data = await DishesModel.find({});
    res.send(data);
}

// note that the name everywhere must use the same as in schemas

module.exports = DishesRouter;