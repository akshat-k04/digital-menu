// src/Dishes.js
import React, { useState, useContext } from "react";
import CreateTableBooking from "./CreateTableBooking";
import { Table_schedule_context } from "../Context/Table_schedule_context";

function Table() {
  const { Table_schedule_data } = useContext(Table_schedule_context);


  const [create, setCreate] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const tables = [...new Set(Table_schedule_data.map((booking) => booking.table_number))];
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  const filteredBookings = Table_schedule_data.filter((booking) => {
    const isTableMatch = selectedTable ? booking.table_number === selectedTable : true;
    const isHourMatch = selectedHour ? parseInt(booking.time.split(":")[0]) > selectedHour : true;
    const isDateMatch = selectedDate ? booking.date === selectedDate : true;
    return isTableMatch && isHourMatch && isDateMatch;
  });

  const resetAll = ()=>{
    setSelectedTable(null) ;
    setSelectedHour(null) ;
    setSelectedDate("") ;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end px-10 h-8">
        <button
          onClick={() => setCreate(!create)}
          className="p-2 bg-green-500 text-white rounded-md flex items-center justify-center"
        >
          {create ? <>Back</> : <>Create New</>}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => setSelectedTable(selectedTable === table ? null : table)}
            className={`p-2 m-1 ${selectedTable === table ? "bg-blue-500" : "bg-gray-300"
              } text-white rounded-md`}
          >
            Table {table}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {hours.map((hour) => (
          <button
            key={hour}
            onClick={() => setSelectedHour(selectedHour === hour ? null : hour)}
            className={`p-2 m-1 ${selectedHour === hour ? "bg-blue-500" : "bg-gray-300"
              } text-white rounded-md`}
          >
            {hour}:00
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={resetAll}>
          reset All Filter
        </button>
      </div>
      {create ? (
        <CreateTableBooking />
      ) : (
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
            {filteredBookings.map((booking, index) => (
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
      )}
    </div>
  );

}

export default Table;
