const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TableBooking = require('./TablesSchedule.js');
const Dishes = require('./Dish_routes.js') ;
const Tables = require('./TableRegistrationRoute.js');
const Employee = require('./employee_routes.js') ;


const AdminRouter = express.Router();


AdminRouter.use('/tableRegistration',Tables) ;
AdminRouter.use('/dishes', Dishes);
AdminRouter.use('/table', TableBooking);
AdminRouter.use('employee',Employee) ;





module.exports = AdminRouter;
