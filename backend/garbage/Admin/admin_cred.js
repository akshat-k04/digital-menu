const mongoose = require('mongoose');
const restaurant_detail = require('../../models/restaurant_model.js') ;
const Dishes = require('./Dishes_routes.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TableBooking = require('./Table_route.js') ;



const AdminRouter = express.Router();


AdminRouter.post('/',signin);
AdminRouter.use('/dishes',Dishes) ;
AdminRouter.use('/table',TableBooking) ;
AdminRouter.use('employee',)

async function signin(req, res) {
    const { username, password } = req.body;

    const restaurant_data = await restaurant_detail.findOne({ username });
    if (restaurant_data && await bcrypt.compare(password, restaurant_data.password)) {
        const token = jwt.sign({ username: restaurant_data.username,is_employee:restaurant_data.is_employee }, process.env.JWT_SECRET_KEY, { expiresIn: '23h' });
        res.json({ 'token': token, Total_tables:restaurant_data.Total_tables });
    } else {
        res.status(401).send('Invalid credentials');
    }
}




module.exports = AdminRouter;
