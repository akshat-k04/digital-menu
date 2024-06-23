// todos
// complete customer side
//  then remove the vernarabilities like which route is access by whom use JWT

const signin = require('./c_signin.js') ;
const Order = require('./c_order_routes.js') ;
const Dishes = require('./c_dishes_routes.js') ;


const CustomerRouter = express.Router();


CustomerRouter.use('/dishes', Dishes);
CustomerRouter.use('/order', Order);
CustomerRouter.post('/signin',signin) ; // once customer sign in then only he will able to view and order dishes




module.exports = CustomerRouter;
