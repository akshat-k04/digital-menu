import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const base = "http://localhost:8000";


function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      // console.log(savedCart) ;
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const updateSpecialInstructions = (id, instructions) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, specialInstructions: instructions } : item
      );
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatOrderData = (cart, totalAmount, taxRate = 0.1) => {
    const items = cart.map((item) => ({
      menuItem: item._id,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions || "",
    }));

    const tax = (totalAmount * taxRate).toFixed(2);
    const amount = (totalAmount + parseFloat(tax)).toFixed(2);

    return {
      amount: amount.toString(),
      Tax: tax.toString(),
      items: items,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };
  };

  const handleSubmit = async () => {
    const taxRate = 0.1; // update tax rate later
    const orderData = formatOrderData(cart, totalAmount, taxRate);
    console.log(orderData);

    const token = localStorage.getItem('c_token');
    try {
      const response = await fetch(`${base}/customer/order/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'c_token': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      console.log(data) ;
      if(data.message=="done"){
        window.location.href = '/order';
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">My Order</h2>
      <div className="space-y-4 flex flex-col gap-2">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col border p-2 rounded mb-4">
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
                  onClick={() => updateQuantity(item.id, -1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
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
                  <span key={index} className="w-full  p-2 rounded">{el}</span>
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
