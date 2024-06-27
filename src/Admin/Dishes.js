import React, { useState, useContext } from "react";
import CreateDish from "./CreateDish";
import { Dishes_context } from "../Context/Dishes_context";

function Dishes() {
  const { Dishes_data } = useContext(Dishes_context);
  console.log(Dishes_data);
  // const dishes = [
  //   {
  //     name: "Pasta Carbonara",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Italian",
  //     price: 12.99,
  //   },
  //   {
  //     name: "Sushi Platter",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Japanese",
  //     price: 18.5,
  //   },
  //   {
  //     name: "Chicken Tikka Masala",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Indian",
  //     price: 15.0,
  //   },
  //   {
  //     name: "Beef Tacos",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Mexican",
  //     price: 10.5,
  //   },
  //   {
  //     name: "Vegan Burger",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Vegan",
  //     price: 11.99,
  //   },
  //   {
  //     name: "Margherita Pizza",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Italian",
  //     price: 14.0,
  //   },
  //   {
  //     name: "Pad Thai",
  //     image_url:
  //       "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     catagory: "Thai",
  //     price: 13.25,
  //   },
  // ];

  const [Create, setCreate] = useState(false);
  return (
    <div className=" flex flex-col w-full">
      <div className="flex justify-end px-10 h-8">
        <button
          onClick={() => {
            setCreate(!Create);
          }}
          className="p-2 bg-green-500 text-white rounded-md flex items-center justify-center"
        >
          {Create ? <>Back</> : <> Create New</>}
        </button>
      </div>
      {Create ? (
        <>
          <CreateDish />
        </>
      ) : (
        <>
          <table className="w-full ">
            <thead>
              <tr>
                <th className="w-1/4 text-center">Name</th>
                <th className="w-1/4 text-center">Category</th>
                <th className="w-1/4 text-center">Price</th>
                <th className="w-1/4 text-center">Image</th>
              </tr>
            </thead>
            <tbody>
              {Dishes_data.map((dish, index) => (
                <tr key={index}>
                  <td className="w-1/4 text-center">{dish.name}</td>
                  <td className="w-1/4 text-center">{dish.catagory}</td>
                  <td className="w-1/4 text-center">{dish.price}</td>
                  <td className="w-1/4 flex justify-center items-center m-auto">
                    {dish.image_url ? (
                      <img
                        src={dish.image_url}
                        alt={dish.name}
                        className="flex justify-center items-center "
                      />
                    ) : (
                      "No image available"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Dishes;
