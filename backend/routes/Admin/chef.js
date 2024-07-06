// express = require('express');
// const subOrder_model = require('../../models/sub_order.js');
// const jwt = require('jsonwebtoken');

// const sub_order_Router = express.Router();

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.header('token');

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//             if (err || !('is_employee' in user)) {
//                 res.send({ 'message': 'error' });
//                 return res.sendStatus(403); // Forbidden
//             }
//             console.log("Verified");
//             next();
//         });
//     } else {
//         res.send({ 'message': 'error' });
//         res.sendStatus(401); // Unauthorized
//     }
// };

// sub_order_Router.post('/delete', authenticateJWT, delete_sub_order);


// async function delete_sub_order(req, res) {
//     try {
//         //delete the image from database also
//         await subOrder_model.findOneAndDelete({ "_id": req.body._id });
//         res.send({ 'message': 'done' });
//     } catch (err) {
//         res.status(500).send({ 'message': `${err}` });
//     }
// }

// // note that the name everywhere must use the same as in schemas

// module.exports = sub_order_Router;