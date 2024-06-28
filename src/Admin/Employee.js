import React, { useState, useContext } from 'react';
import CreateRestaurantDetail from './CreateRestaurantDetail';
import { Employee_context } from '../Context/employee_context';

function Employee() {
  const { employee_data, set_employee, delete_employee } = useContext(Employee_context);
  const [create, setCreate] = useState(false);

  const handleDeleteClick = async (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if(!confirmed){
      return  ;
    }
    let temp_employees = [...employee_data];
    temp_employees.splice(index, 1);
    await delete_employee(employee_data[index]);
    set_employee(temp_employees);
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
        <>
          <CreateRestaurantDetail />
        </>
      ) : (
        <>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="w-1/4 text-center">Username</th>
                <th className="w-1/4 text-center">Password</th>
                <th className="w-1/4 text-center">Is Employee</th>
                <th className="w-1/4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee_data.map((detail, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-1/4 text-center py-2">{detail.username}</td>
                  <td className="w-1/4 text-center py-2">{detail.password}</td>
                  <td className="w-1/4 text-center py-2">{detail.is_employee ? 'Yes' : 'No'}</td>
                  <td className="w-1/4 text-center py-2">
                    <button onClick={() => handleDeleteClick(index)} className="p-2 bg-red-500 text-white rounded-md">
                      Delete
                    </button>
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

export default Employee;
