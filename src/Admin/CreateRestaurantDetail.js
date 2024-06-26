// src/CreateRestaurantDetail.js
import React, { useState } from "react";

const CreateRestaurantDetail = ({ onRegister }) => {
  const [restaurantDetail, setRestaurantDetail] = useState({
    username: "",
    password: "",
    is_employee: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantDetail((prevDetail) => ({
      ...prevDetail,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    //api to be integrated
    e.preventDefault();
    setRestaurantDetail({
      username: "",
      password: "",
      is_employee: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-bold mb-2"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={restaurantDetail.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={restaurantDetail.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="is_employee"
          className="block text-gray-700 font-bold mb-2"
        >
          Is Employee:
        </label>
        <input
          type="checkbox"
          id="is_employee"
          name="is_employee"
          checked={restaurantDetail.is_employee}
          onChange={handleChange}
          className="mr-2 leading-tight"
        />
        <span className="text-gray-700">Employee</span>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Register Restaurant Detail
      </button>
    </form>
  );
};

export default CreateRestaurantDetail;
