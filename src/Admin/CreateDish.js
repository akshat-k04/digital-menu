// src/NewDishForm.js
import React, { useState } from "react";

const NewDishForm = () => {
  const [dish, setDish] = useState({
    name: "",
    image_url: "",
    catagory: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    //api to be integrated
    e.preventDefault();
    console.log("New Dish:", dish);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={dish.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image_url"
          className="block text-gray-700 font-bold mb-2"
        >
          Image URL:
        </label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={dish.image_url}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="catagory"
          className="block text-gray-700 font-bold mb-2"
        >
          Category:
        </label>
        <input
          type="text"
          id="catagory"
          name="catagory"
          value={dish.catagory}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={dish.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Dish
      </button>
    </form>
  );
};

export default NewDishForm;
