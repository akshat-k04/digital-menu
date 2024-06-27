import React, { useState, useContext, useEffect } from "react";
import CreateTableRegistration from "./CreateTableRegistration";
import { Table_registration_context } from "../Context/Table_registration";

function TableRegisteration() {
  const { Table_registration_data } = useContext(Table_registration_context);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (Array.isArray(Table_registration_data)) {
      setTables(Table_registration_data);
    }
  }, [Table_registration_data]);

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
          {create ? <>Back</> : <>Create New</>}
        </button>
      </div>
      {create ? (
        <CreateTableRegistration />
      ) : (
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="w-1/3 text-center">Table Number</th>
              <th className="w-1/3 text-center">Pincode</th>
              <th className="w-1/3 text-center">Order ID</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tables) && tables.map((table, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="w-1/3 text-center py-2">{table.table_number}</td>
                <td className="w-1/3 text-center py-2">{table.pincode}</td>
                <td className="w-1/3 text-center py-2">{table.order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableRegisteration;
