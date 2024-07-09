import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const base = "http://localhost:8000";

function Cart() {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    // console.log(JSON.parse(savedCart));
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const updateSpecialInstructions = (id, instructions) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item._id === id ? { ...item, specialInstructions: instructions } : item
      );
    });
  };

  useEffect(() => {
    setInfo(parseJwt(localStorage.getItem("c_token")));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalAmount = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  const formatOrderData = (cart, totalAmount, taxRate = 0.1) => {
    const items = cart.map((item) => ({
      menuItem: item._id,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions || "",
    }));

    const tax = (totalAmount * taxRate).toFixed(2);
    const amount = (totalAmount + parseFloat(tax)).toFixed(2);

    return {
      table: info?.table,
      amount: amount.toString(),
      Tax: tax.toString(),
      items: items,
      status: "Order Placed",
      createdAt: new Date().toISOString(),
    };
  };

  const handleSubmit = async () => {
    const taxRate = 0.1; // update tax rate later
    const orderData = formatOrderData(cart, totalAmount, taxRate);
    console.log(orderData);

    const token = localStorage.getItem("c_token");
    try {
      const response = await fetch(`${base}/customer/order/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          c_token: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "done") {
        window.location.href = "/order";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">My Order</h2>
      <div className="space-y-4 flex flex-col gap-2">
        {Array.isArray(cart) &&
          cart.map((item) => (
            <div key={item._id} className="flex flex-col border p-2 rounded mb-4">
              <div className="flex items-center justify-between">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-gray-500">₹{item.price?.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 ">
                <label className="block text-gray-700">Instructions:</label>
                <div className="flex flex-col text-left">
                  {item?.specialInstructions?.split(",")?.map((el, index) => (
                    <span key={index} className="w-full  p-2 rounded">
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-bold mb-2">
          <span>Total:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex px-4 gap-4">
          <button
            onClick={() => navigate("/order")}
            className="bg-blue-500 text-white p-2 rounded w-full "
          >
            Add More
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
