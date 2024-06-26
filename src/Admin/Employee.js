// src/Dishes.js
import React, { useState,useContext } from 'react';
import CreateRestaurantDetail from './CreateRestaurantDetail';
import { employee_context } from '../Context/employee_context';

function Employee() {
  const { employee_data } = useContext(employee_context);
  // const [restaurantDetails, setRestaurantDetails] = useState([
  //   {
  //     username: 'admin1',
  //     password: 'password1',
  //     is_employee: true
  //   },
  //   {
  //     username: 'user2',
  //     password: 'password2',
  //     is_employee: false
  //   }
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
          <CreateRestaurantDetail  />
        </>
      ) : (
        <>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="w-1/3 text-center">Username</th>
                <th className="w-1/3 text-center">Password</th>
                <th className="w-1/3 text-center">Is Employee</th>
              </tr>
            </thead>
            <tbody>
              {employee_data.map((detail, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-1/3 text-center py-2">{detail.username}</td>
                  <td className="w-1/3 text-center py-2">{detail.password}</td>
                  <td className="w-1/3 text-center py-2">{detail.is_employee ? 'Yes' : 'No'}</td>
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
