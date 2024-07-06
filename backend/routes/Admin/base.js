const TableBooking = require('./TablesSchedule.js');
const Dishes = require('./Dish_routes.js') ;
const Tables = require('./TableRegistrationRoute.js');
const Employee = require('./employee_routes.js') ;
const OrderRouter = require('./Order_routes_admin.js') ;

const AdminRouter = express.Router();


AdminRouter.use('/tableRegistration',Tables) ;
AdminRouter.use('/dishes', Dishes);
AdminRouter.use('/table', TableBooking);
AdminRouter.use('/employee',Employee) ;
AdminRouter.use('/orders', OrderRouter);
// AdminRouter.use('/chef',chef)



module.exports = AdminRouter;
