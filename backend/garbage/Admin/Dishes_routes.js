express = require('express');
const DishesModel = require('../../models/dishes_model.js');
const jwt = require('jsonwebtoken');

const DishesRouter = express.Router();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('token');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err ) {
                return res.sendStatus(403); // Forbidden
            }
            console.log("Verified") ;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

DishesRouter.post('/add', authenticateJWT, add_dish);
DishesRouter.post('/delete', authenticateJWT, delete_dish);
DishesRouter.post('/update', authenticateJWT, update_dish);
DishesRouter.get('/',get_dish) ;






async function add_dish(req, res) {
    try {
        await DishesModel.create(req.body);
        res.send({ 'message': 'done' });// run only when the above line run without any error
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function update_dish(req, res) {
    try {
        //delete the image from the database also
        await DishesModel.findOneAndUpdate({ "id": req.body.id }, req.body);
        res.send({ 'message': 'done' });// run only when the above line run without any error
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function delete_dish(req, res) {
    try {
        //delete the image from database also
        await DishesModel.findOneAndDelete({ "id": req.body.id });
        res.send({ 'message': 'done' });
    } catch (err) {
        res.status(500).send({ 'message': `${err}` });
    }
}

async function get_dish(req, res) {
    let data = await DishesModel.find({});
    res.send(data);
}

// note that the name everywhere must use the same as in schemas

module.exports = DishesRouter;