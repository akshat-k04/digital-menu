import React, { useState, useContext, useEffect } from "react";
import CreateTableBooking from "./CreateTableBooking";
import { Table_schedule_context } from "../Context/Table_schedule_context";
import { Table_registration_context } from "../Context/Table_registration";

function Table() {
  const { Table_schedule_data, delete_Table_schedule, sort_and_set, update_Table_schedule } = useContext(Table_schedule_context);
  const { Table_registration_data} = useContext(Table_registration_context);

  const [create, setCreate] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [orderDetails, setOrderDetails] = useState(null); // Add state for order details
  const [after_time,set_after_time] = useState(false) ;
  useEffect(()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  },[]) ;
  const tables = [...new Set(Table_registration_data.map((booking) => booking.table_number))].sort((a, b) => a - b);
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  const filteredBookings = Table_schedule_data.filter((booking) => {
    const isTableMatch = selectedTable ? booking.table_number === selectedTable : true;
    const isHourMatch = (after_time) ? (selectedHour ? parseInt(booking.time.split(":")[0]) > selectedHour : true) : (selectedHour ? parseInt(booking.time.split(":")[0]) == selectedHour : true);
    const isDateMatch = selectedDate ? booking.date.split('T')[0] === selectedDate : true;
    return isTableMatch && isHourMatch && isDateMatch;
  });

  const handleDelete = async (index) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      let temp_bookings = [...filteredBookings];
      const schedule_to_delete = temp_bookings.splice(index, 1)[0];
      await delete_Table_schedule(schedule_to_delete);
      sort_and_set(temp_bookings);
    }
  };

  const handle_customer_come = async (index) => {
    const confirmed = window.confirm("Are you sure?");
    if(!confirmed)return ;
    let entry = filteredBookings[index];
    const generatePincode = () => {
      return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const generateOrderID = (table_number) => {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${year}${month}${day}${hours}${minutes}${seconds}_T${table_number}`;
    };

    entry.pincode = generatePincode();
    entry.order_id = generateOrderID(entry.table_number);

    await update_Table_schedule(entry);
    let temp_data = [...filteredBookings];
    temp_data[index] = entry;
    sort_and_set(temp_data);
  };

  const handleOrderClick = async (order_id) => {
    try {
      const response = await fetch('http://localhost:8000/admin/orders/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id }),
      });

      const order = await response.json();
      console.log(order) ;
      if (response.ok) {
        setOrderDetails(order);
      } else {
        console.error(order.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetAll = () => {
    setSelectedTable(null);
    setSelectedHour(null);
    setSelectedDate("");
  };

  const closeModal = () => {
    setOrderDetails(null);
  };

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
            className={`p-2 m-1 ${selectedTable === table ? "bg-blue-500" : "bg-gray-300"} text-white rounded-md`}
          >
            Table {table}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className="p-2 m-1 bg-blue-500 text-white rounded-md" onClick={()=>{set_after_time(!after_time)}}>
          {after_time ? <>After</>:<>At</>}
        </button>
        {hours.map((hour) => (
          <button
            key={hour}
            onClick={() => setSelectedHour(selectedHour === hour ? null : hour)}
            className={`p-2 m-1 ${selectedHour === hour ? "bg-blue-500" : "bg-gray-300"} text-white rounded-md`}
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
        <button onClick={resetAll} className="p-2 bg-red-500 text-white rounded-md">Reset All Filters</button>
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
              <th className="w-1/7 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
              {filteredBookings.map((booking, index) => {
                // Calculate current date and time
                const currentDate = new Date();
                const bookingDateTime = new Date(`${booking.date.split('T')[0]}T${booking.time}`);

                // Calculate 1 hour before and after the current date and time
                const oneHourBefore = new Date(currentDate.getTime() - (1 * 60 * 60 * 1000));
                const oneHourAfter = new Date(currentDate.getTime() + (1 * 60 * 60 * 1000));

                // Check if booking date and time is within the 1 hour range
                const isWithinOneHour = bookingDateTime >= oneHourBefore && bookingDateTime <= oneHourAfter;

                return (
                  <tr key={index} className={`bg-white border-b ${isWithinOneHour ? 'bg-green-100' : ''}`}>
                    <td className="w-1/7 text-center py-2">{booking.table_number}</td>
                    <td className="w-1/7 text-center py-2">{booking.pincode}</td>
                    <td className="w-1/7 text-center py-2">{booking.date.split('T')[0]}</td>
                    <td className="w-1/7 text-center py-2">{booking.time}</td>
                    <td className="w-1/7 text-center py-2">{booking.customer_name}</td>
                    <td className="w-1/7 text-center py-2">{booking.customer_contact}</td>
                    <td className="w-1/7 text-center py-2">
                      {booking.order_id && (
                        <button
                          onClick={() => handleOrderClick(booking.order_id)}
                          className="text-blue-500 underline"
                        >
                          {booking.order_id}
                        </button>
                      )}
                    </td>
                    <td className="w-1/7 text-center py-2">
                      {!booking.pincode ? (
                        <>
                          <button
                            onClick={() => handle_customer_come(index)}
                            className="p-2 bg-yellow-500 text-white rounded-md mr-2"
                          >
                            Customer Arrived
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 bg-red-500 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })}

          </tbody>
        </table>
      )}

      {orderDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="mb-4">
              <p className="text-lg">
                Customer Name: {orderDetails.customer_name}
              </p>
              <p className="text-lg">
                Customer Contact: {orderDetails.customer_contact}
              </p>
              <p className="text-lg">
                Current Status: {orderDetails.status}
              </p>
              <p className="text-lg">
                Total Amount: {orderDetails.amount}
              </p>
              <p className="text-lg">
                GST: {orderDetails.tax}
              </p>
            </div>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left">Dish</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Special Instructions</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.quantity}</td>
                    <td>{item.specialInstructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default Table ;