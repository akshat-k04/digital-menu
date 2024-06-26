import React, { useState } from "react";

const CreateTableRegistration = ({ onRegister }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e) => {
    //api to be integrated
    e.preventDefault();
    setTableNumber("");
    setPincode("");
    setOrderId("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="tableNumber"
          className="block text-gray-700 font-bold mb-2"
        >
          Table Number:
        </label>
        <input
          type="number"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pincode" className="block text-gray-700 font-bold mb-2">
          Pincode:
        </label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="orderId" className="block text-gray-700 font-bold mb-2">
          Order ID:
        </label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Register Table
      </button>
    </form>
  );
};

export default CreateTableRegistration;
