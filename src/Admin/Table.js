// src/Dishes.js
import React, { useState,useContext } from "react";
import CreateTableBooking from "./CreateTableBooking";
import { Table_schedule_context } from "../Context/Table_schedule_context";

function Table() {
  
  const { Table_schedule_data } = useContext(Table_schedule_context);
 
  // const [bookings, setBookings] = useState([
  //   {
  //     table_number: 1,
  //     pincode: "123456",
  //     date: "2023-06-01",
  //     time: "18:00",
  //     customer_name: "John Doe",
  //     customer_contact: "1234567890",
  //     order_id: "order1",
  //   },
  //   {
  //     table_number: 2,
  //     pincode: "654321",
  //     date: "2023-06-02",
  //     time: "19:00",
  //     customer_name: "Jane Smith",
  //     customer_contact: "0987654321",
  //     order_id: "order2",
  //   },
  // ]);

  const [create, setCreate] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end px-10 h-8">
        <button
          onClick={() => {
            setCreate(!create);
          }}
          className="p-2 bg-green-500 text-white rounded-md flex items-center justify-center"
        >
          {create ? <>Back</> : <> Create New</>}
        </button>
      </div>
      {create ? (
        <>
          <CreateTableBooking />
        </>
      ) : (
        <>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="w-1/7 text-center">Table Number</th>
                <th className="w-1/7 text-center">Pincode</th>
                <th className="w-1/7 text-center">Date</th>
                <th className="w-1/7 text-center">Time</th>
                <th className="w-1/7 text-center">Customer Name</th>
                <th className="w-1/7 text-center">Customer Contact</th>
                <th className="w-1/7 text-center">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {Table_schedule_data.map((booking, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-1/7 text-center py-2">
                    {booking.table_number}
                  </td>
                  <td className="w-1/7 text-center py-2">{booking.pincode}</td>
                  <td className="w-1/7 text-center py-2">{booking.date}</td>
                  <td className="w-1/7 text-center py-2">{booking.time}</td>
                  <td className="w-1/7 text-center py-2">
                    {booking.customer_name}
                  </td>
                  <td className="w-1/7 text-center py-2">
                    {booking.customer_contact}
                  </td>
                  <td className="w-1/7 text-center py-2">{booking.order_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Table;
