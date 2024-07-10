import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./css/order.css"; // Import the CSS file

// Connect to the /chef namespace
const socket = io(`${process.env.REACT_APP_BASE_BACK}/chef`);

function ChefOrderQueue() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Listen for the initial order queue
    socket.on("orderQueue", (orders) => {
      setOrders(orders);
    });

    // Listen for new orders
    socket.on("newOrder", (order) => {
      console.log(order);
      setOrders((prevOrders) => [order, ...prevOrders]);
    });

    // Set up interval to fetch new orders every 2 seconds
    const interval = setInterval(() => {
      socket.emit("fetchOrders"); // Assuming there's a fetchOrders event on the server
    }, 2000);

    return () => {
      // Clean up the interval and socket listeners
      clearInterval(interval);
      socket.off("orderQueue");
      socket.off("newOrder");
    };
  }, []);

  const handleDeleteOrder = (orderId) => {
    socket.emit("deleteOrder", orderId);
  };

  return (
    <div className="order-queue-container">
      <h2 className="order-queue-title">Order Queue</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <p className="order-id">
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p className="order-status">
              <strong>Status:</strong> {order.status}
            </p>
            {order?.table ?? (
              <p className="order-status">
                <strong>table:</strong> {order?.table}
              </p>
            )}
            <p className="order-created-at">
              <strong>Created At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <h3 className="order-items-title">Items:</h3>
            <ul className="order-items-list">
              {order.items.map((item, index) => (
                <li key={index} className="order-item-detail">
                  <p className="order-item-name">
                    <strong>Dish:</strong> {item.menuItem}
                  </p>
                  <p className="order-item-quantity">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  {item.specialInstructions && (
                    <p className="order-item-instructions">
                      <strong>Instructions:</strong> {item.specialInstructions}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="delete-order-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChefOrderQueue;
