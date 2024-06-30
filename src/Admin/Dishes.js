import React, { useState, useContext } from "react";
import CreateDish from "./CreateDish";
import { Dishes_context } from "../Context/Dishes_context";

function Dishes() {
  const { Dishes_data, set_Dishes, update_Dishes, delete_Dishes } = useContext(Dishes_context);
  const [Create, setCreate] = useState(false);
  const [editingDishIndex, setEditingDishIndex] = useState(null);
  const [editedDish, setEditedDish] = useState({});

  const handleEditClick = (index) => {
    setEditingDishIndex(index);
    setEditedDish(Dishes_data[index]);
  };

  const handleDoneClick = async () => {
    // Update the dish data here (e.g., make an API call to save the changes)
    let temp_dishes = [...Dishes_data];
    temp_dishes[editingDishIndex] = editedDish;
    await update_Dishes(editedDish);
    set_Dishes(temp_dishes);
    setEditingDishIndex(null);
  };

  const handleDeleteClick = async (index) => {
    // Delete the dish data here (e.g., make an API call to delete the dish)
    let temp_dishes = [...Dishes_data];
    temp_dishes.splice(index, 1);
    await delete_Dishes(Dishes_data[index]);
    set_Dishes(temp_dishes);
    
  };

  const handleChange = (e, field) => {
    setEditedDish({ ...editedDish, [field]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end px-10 h-8">
        <button
          onClick={() => {
            setCreate(!Create);
          }}
          className="p-2 bg-green-500 text-white rounded-md flex items-center justify-center"
        >
          {Create ? <>Back</> : <>Create New</>}
        </button>
      </div>
      {Create ? (
        <CreateDish />
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/4 text-center">Name</th>
              <th className="w-1/4 text-center">Category</th>
              <th className="w-1/4 text-center">Price</th>
              <th className="w-1/4 text-center">Image</th>
              <th className="w-1/4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Dishes_data.map((dish, index) => (
              <tr key={index}>
                <td className="w-1/4 text-center">
                  {editingDishIndex === index ? (
                    <input
                      type="text"
                      value={editedDish.name}
                      onChange={(e) => handleChange(e, "name")}
                      className="border p-1"
                    />
                  ) : (
                    dish.name
                  )}
                </td>
                <td className="w-1/4 text-center">
                  {editingDishIndex === index ? (
                    <input
                      type="text"
                      value={editedDish.catagory}
                      onChange={(e) => handleChange(e, "catagory")}
                      className="border p-1"
                    />
                  ) : (
                    dish.catagory
                  )}
                </td>
                <td className="w-1/4 text-center">
                  {editingDishIndex === index ? (
                    <input
                      type="text"
                      value={editedDish.price}
                      onChange={(e) => handleChange(e, "price")}
                      className="border p-1"
                    />
                  ) : (
                    dish.price
                  )}
                </td>
                <td className="w-1/4 flex justify-center items-center m-auto">
                  {dish.image_url ? (
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="flex justify-center items-center"
                    />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td className="w-1/4 text-center">
                  {editingDishIndex === index ? (
                    <button onClick={handleDoneClick} className="p-2 bg-green-500 text-white rounded-md mr-1">
                      Done
                    </button>
                  ) : (
                    <button onClick={() => handleEditClick(index)} className="p-2 bg-blue-500 text-white rounded-md mr-1">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteClick(index)} className="p-2 bg-red-500 text-white rounded-md">
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dishes;
