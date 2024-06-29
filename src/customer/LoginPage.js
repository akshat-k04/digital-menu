import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [tableNumber, setTableNumber] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // api for login
    navigate("/order");
  };

  // const handleRegularCustomerLogin = () => {
  //   // api
  //   navigate("/order");
  // };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("path-to-your-background-image")' }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome!</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tableNumber"
          >
            Table number
          </label>
          <input
            type="text"
            id="tableNumber"
            placeholder="Enter the table number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pinNumber"
          >
            Enter the pin number
          </label>
          <input
            type="password"
            id="pinNumber"
            placeholder="Enter the pin number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          LOGIN
        </button>
        <hr className="mb-4" />
        <button
          // onClick={handleRegularCustomerLogin}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login as a regular customer
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
