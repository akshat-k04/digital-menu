import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Order() {
  const dishes = [
    {
      name: "Pasta Carbonara",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Italian",
      price: 12.99,
    },
    {
      name: "Sushi Platter",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Japanese",
      price: 18.5,
    },
    {
      name: "Chicken Tikka Masala",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Indian",
      price: 15.0,
    },
    {
      name: "Beef Tacos",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Mexican",
      price: 10.5,
    },
    {
      name: "Vegan Burger",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Vegan",
      price: 11.99,
    },
    {
      name: "Margherita Pizza",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Italian",
      price: 14.0,
    },
    {
      name: "Pad Thai",
      image_url:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      catagory: "Thai",
      price: 13.25,
    },
  ];
  const categories = [...new Set(dishes.map((dish) => dish.catagory))];
  const [current, setCurrent] = useState(categories[0]);
  return (
    <div className="h-lvh flex flex-col ">
      <div className="h-2/6 "> img</div>
      <div className="h-1/6 ">
        <div className="flex justify-between mx-5 items-center">
          <span className="text-4xl font-bold">Menu</span>{" "}
          <span>
            <GiHamburgerMenu size={30} />
          </span>
        </div>
        <div>
          <input
            type="text"
            className=" border-2 w-5/6 my-3 p-2"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="h-3/6 ">
        <div className="flex text-3xl h-1/6  gap-4 px-4  z-10 backdrop-blur-10 overflow-x-auto">
          {categories?.map((item, index) => {
            return (
              <>
                <span
                  onClick={() => {
                    setCurrent(item);
                  }}
                  id={index}
                >
                  {item}
                </span>
              </>
            );
          })}
        </div>
        <div className="flex w-full px-4 gap-4 relative z-1 h-5/6 overflow-auto">
          {dishes
            ?.filter((item) => {
              return item.catagory === current;
            })
            ?.map((item, index) => {
              return (
                <div id={index} className="flex flex-col items-center">
                  <img src={item.image_url} />
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Order;
