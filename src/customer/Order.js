import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Order() {
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

  const [hide, setHide] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [...new Set(dishes.map((dish) => dish.category))];
  const [current, setCurrent] = useState(categories[0]);
  const navigate = useNavigate();

  const filteredDishes = dishes.filter((dish) => {
    return (
      dish.category === current &&
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const addToCart = (dish) => {
    const newCart = [...cart, { ...dish, quantity: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const goToCart = () => {
    navigate("/cart", { state: { cart, dishes } });
  };

  return (
    <div className="h-lvh flex flex-col">
      {!hide && <div className="h-2/6"> img</div>}
      <div className="h-1/6">
        <div className="flex justify-between mx-5 items-center">
          <span className="text-4xl font-bold">Menu</span>
          <span>
            <GiHamburgerMenu size={30} />
          </span>
        </div>
        <div>
          <input
            type="text"
            className="border-2 w-5/6 my-3 p-2"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setHide(true)}
          />
        </div>
      </div>
      <div className={hide ? "h-5/6" : "h-3/6"}>
        <div className="flex text-3xl h-1/6 gap-4 px-4 z-10 backdrop-blur-10 overflow-x-auto">
          {categories.map((item, index) => (
            <span key={index} onClick={() => setCurrent(item)}>
              {item}
            </span>
          ))}
        </div>
        <div className="flex w-full px-4 gap-4 relative z-1 h-5/6 overflow-auto">
          {filteredDishes.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-auto rounded"
              />
              <span className="font-bold">{item.name}</span>
              <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/6 flex justify-center items-center">
        <button
          onClick={goToCart}
          className="bg-blue-500 text-white p-2 rounded"
        >
          View Cart ({cart.length})
        </button>
      </div>
    </div>
  );
}

export default Order;
