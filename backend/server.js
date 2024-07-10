// Import modules
require("dotenv").config();
const connect_to_mongo = require("./database_connection.js");
const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Admin = require("./routes/Admin/base");
const CustomerRouter = require("./routes/Customer/cust_base");
const subOrder_model = require("./models/sub_order.js");
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'build')));

// // Put all your API routes here

// // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_BASE_FRONT, // React app URL
    methods: ["GET", "POST", "UPDATE","DELETE"],
  },
});

io.of("/chef").on("connection", async (socket) => {
  console.log("A chef connected");

  const sendOrderQueue = async () => {
    try {
      const orders = await subOrder_model.find({});
      socket.emit("orderQueue", orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Send the initial order queue
  sendOrderQueue();

  // Handle fetching orders periodically
  socket.on("fetchOrders", sendOrderQueue);

  // Handle order deletion
  socket.on("deleteOrder", async (orderId) => {
    try {
      await subOrder_model.findByIdAndDelete(orderId);
      io.of("/chef").emit("orderDeleted", orderId);
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A chef disconnected");
  });
});

// Use the modules in app
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Creating the routes
app.use("/admin", Admin);
app.use("/customer", CustomerRouter);

// Giving the port to the server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connecting to the database
connect_to_mongo();
