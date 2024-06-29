import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ItemDetails() {
  const dishes = [
    {
      id: 1,
      name: "Pasta Carbonara",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Italian",
      price: 12.99,
    },
    {
      id: 2,
      name: "Sushi Platter",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Japanese",
      price: 18.5,
    },
    {
      id: 3,
      name: "Chicken Tikka Masala",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Indian",
      price: 15.0,
    },
    {
      id: 4,
      name: "Beef Tacos",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Mexican",
      price: 10.5,
    },
    {
      id: 5,
      name: "Vegan Burger",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Vegan",
      price: 11.99,
    },
    {
      id: 6,
      name: "Margherita Pizza",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Italian",
      price: 14.0,
    },
    {
      id: 7,
      name: "Pad Thai",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Thai",
      price: 13.25,
    },
  ];
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id)); 
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
    cart.push(cartItem);
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
