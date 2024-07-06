// // here we are creating the app using express
// const http = require('http');
// const socketIo = require('socket.io');
// const express = require('express');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const Admin = require('./routes/Admin/base') ;
// const CustomerRouter = require('./routes/Customer/cust_base');

// // creating the express object
// const app = express();

// // for creating the realtime queue
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000", // React app URL
//         methods: ["GET", "POST"]
//     }
// });
// // Handle chef namespace
// io.of('/chef').on('connection', (socket) => {
//     console.log('A chef connected');

//     // Send the current queue to the connected client
//     SubOrderModel.find({}, (err, orders) => {
//         if (err) {
//             console.error('Error fetching orders:', err);
//             return;
//         }
//         socket.emit('orderQueue', orders);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A chef disconnected');
//     });
// });

// // using the modules in app
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());



// //creatint the route
// app.use('/admin',Admin)
// app.use('/customer',CustomerRouter) ;
// module.exports = app;