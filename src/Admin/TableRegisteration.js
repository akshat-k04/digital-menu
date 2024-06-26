import React, { useState } from "react";
import CreateTableRegistration from "./CreateTableRegistration";

function TableRegisteration() {
  const [tables, setTables] = useState([
    {
      table_number: 1,
      pincode: "123456",
      order_id: "order1",
    },
    {
      table_number: 2,
      pincode: "654321",
      order_id: "order2",
    },
  ]);

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
          <CreateTableRegistration />
        </>
      ) : (
        <>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="w-1/3 text-center">Table Number</th>
                <th className="w-1/3 text-center">Pincode</th>
                <th className="w-1/3 text-center">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-1/3 text-center py-2">
                    {table.table_number}
                  </td>
                  <td className="w-1/3 text-center py-2">{table.pincode}</td>
                  <td className="w-1/3 text-center py-2">{table.order_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TableRegisteration;
