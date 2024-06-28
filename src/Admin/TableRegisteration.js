import React, { useState, useContext, useEffect } from "react";
import CreateTableRegistration from "./CreateTableRegistration";
import { Table_registration_context } from "../Context/Table_registration";

function TableRegisteration() {
  const { Table_registration_data, set_Table_registration, delete_Table_registration } = useContext(Table_registration_context);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (Array.isArray(Table_registration_data)) {
      setTables(Table_registration_data);
    }
  }, [Table_registration_data]);

  const [create, setCreate] = useState(false);

  const handleDeleteClick = async (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this table registration?");
    if (confirmed) {
      let temp_tables = [...tables];
      const tableToDelete = temp_tables.splice(index, 1)[0];
      await delete_Table_registration(tableToDelete);
      set_Table_registration(temp_tables);
    }
  };

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
              <th className="w-1/4 text-center">Table Number</th>
              <th className="w-1/4 text-center">Pincode</th>
              <th className="w-1/4 text-center">Order ID</th>
              <th className="w-1/4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tables) && tables.map((table, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="w-1/4 text-center py-2">{table.table_number}</td>
                <td className="w-1/4 text-center py-2">{table.pincode}</td>
                <td className="w-1/4 text-center py-2">{table.order_id}</td>
                <td className="w-1/4 text-center py-2">
                  <button onClick={() => handleDeleteClick(index)} className="p-2 bg-red-500 text-white rounded-md ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableRegisteration;
