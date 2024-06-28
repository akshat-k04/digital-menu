// src/CreateTableBooking.js
import React, { useState ,useContext} from "react";
import { Table_schedule_context } from "../Context/Table_schedule_context";

const CreateTableBooking = () => {
  const { Table_schedule_data, set_Table_schedule, get_table_schedule, update_Table_schedule, create_Table_schedule, delete_Table_schedule } = useContext(Table_schedule_context) ;
  const [tableBooking, setTableBooking] = useState({
    table_number: "",
    date: "",
    time: "",
    customer_name: "",
    customer_contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    //api to be integrated
    e.preventDefault();
    await create_Table_schedule(tableBooking) ;
    window.location.href = "/dashboard";
    setTableBooking({
      table_number: "",
      date: "",
      time: "",
      customer_name: "",
      customer_contact: "",

    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="table_number"
          className="block text-gray-700 font-bold mb-2"
        >
          Table Number:
        </label>
        <input
          type="number"
          id="table_number"
          name="table_number"
          value={tableBooking.table_number}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={tableBooking.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
          Time:
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={tableBooking.time}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="customer_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Customer Name:
        </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          value={tableBooking.customer_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="customer_contact"
          className="block text-gray-700 font-bold mb-2"
        >
          Customer Contact:
        </label>
        <input
          type="text"
          id="customer_contact"
          name="customer_contact"
          value={tableBooking.customer_contact}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Register Booking
      </button>
    </form>
  );
};

export default CreateTableBooking;
