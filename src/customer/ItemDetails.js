import React, { useState,useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dishes_context } from "../Context/Dishes_context";

function ItemDetails() {
  const { Dishes_data } = useContext(Dishes_context);

  const { id } = useParams();
  const dish = Dishes_data.find((d) => d._id == id); 
  const navigate = useNavigate();
  const [size, setSize] = useState("medium");
  const [spiciness, setSpiciness] = useState("mild");
  const [gravy, setGravy] = useState("normal");
  const [instructions, setInstructions] = useState("");
  const handleAddToCart = () => {
    const cartItem = {
      ...dish,
      specialInstructions: "special instructions : " + instructions,
      quantity: 1,
    };
    if (spiciness) {
      cartItem.specialInstructions += ", spiciness: " + spiciness;
    }
    if (size) {
      cartItem.specialInstructions += ", size: " + size;
    }
    if (gravy) {
      cartItem.specialInstructions += ", size: " + gravy;
    }
    if (size === "small") {
      cartItem.price = cartItem.price / 2;
    } else if (size === "large") {
      cartItem.price = cartItem.price * 2;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id == cartItem._id);
    // console.log(existingItem);
    if (existingItem) existingItem.quantity++ ;
    else cart.push(cartItem); 

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="p-4">
      <img
        src={dish.image_url}
        alt={dish.name}
        className="w-full h-auto rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{dish.name}</h2>
      <p className="text-gray-600 mt-2">{dish.description}</p>
      <div className="mt-4">
        <label className="block font-bold mb-2">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border-2 p-2 rounded w-full"
        >
          <option value="medium">Medium</option>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block font-bold mb-2">Spiciness</label>
        <select
          value={spiciness}
          onChange={(e) => setSpiciness(e.target.value)}
          className="border-2 p-2 rounded w-full"
        >
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block font-bold mb-2">Gravy</label>
        <select
          value={gravy}
          onChange={(e) => setGravy(e.target.value)}
          className="border-2 p-2 rounded w-full"
        >
          <option value="normal">Normal</option>
          <option value="less">Less</option>
          <option value="extra">Extra</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block font-bold mb-2">Any instruction</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Write any other instructions..."
          className="border-2 p-2 rounded w-full"
        ></textarea>
      </div>
      <div className="flex px-4 gap-4">
        <button
          onClick={() => {
            navigate("/order");
          }}
          className="bg-blue-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Go Back
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default ItemDetails;
