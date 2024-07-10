import React, { useState,useContext,useEffect } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import { Dishes_context } from "../Context/Dishes_context";
import { TokenVerificationContext } from "../Context/customer_verification";


function LoginPage() {
  const [table, setTableNumber] = useState("");
  const [pincode, setPinNumber] = useState("");
  const navigate = useNavigate();
  const { get_Dishes} = useContext(Dishes_context);
  const {checkToken} = useContext(TokenVerificationContext) ;

  const location = useLocation();
  const path = location.pathname;


  useEffect(() => {
    const handleAutoLogin = async () => {
      await checkToken(path, navigate);
    };
    handleAutoLogin();
  }, []);


  const handleLogin = async() => {
    // api for login
    const response = await fetch(`${process.env.REACT_APP_BASE_BACK}/customer/Signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"table":table, "pincode":pincode}),
    });

    if (!response.ok) {
      window.alert("Invalid credentials!");
    }

    const data = await response.json();

    if(data.token){
      localStorage.setItem('c_token', data.token);
      // add use context here and save it globally
      // redirect to new page
      // await set_cart(data.order_id) ;
      await get_Dishes();
      navigate("/order");
    }
    else{
      window.alert("Something went wrong!");
    }
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
            htmlFor="table"
          >
            Table number
          </label>
          <input
            type="text"
            id="table"
            placeholder="Enter the table number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={table}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pincode"
          >
            Enter the pin number
          </label>
          <input
            type="password"
            id="pincode"
            placeholder="Enter the pin number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={pincode}
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
