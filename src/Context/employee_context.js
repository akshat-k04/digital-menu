import React, { createContext, useState } from 'react';
// const process.env.REACT_APP_BASE_BACK = "http://localhost:8000";
const Employee_context = createContext();

const Employee_provider = ({ children }) => {
    const [employee_data , set_employee] =useState({}) ;
    const token = localStorage.getItem('token');

    const get_employee = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_BACK}/admin/employee/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                // body: JSON.stringify(data_to_send),
            });



            const data = await response.json();
            // console.log(data) ;
            set_employee(data)
        }
        catch (error) {
            console.error('Error:', error);
        }
    }


    const delete_employee = async (deleted_employee) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_BACK}/admin/employee/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(deleted_employee),
            });
            const data = await response.json();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    const create_employee = async (employee) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_BACK}/admin/employee/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(employee),
            });
            const data = await response.json();
            if (data.message == "done") {
                let temp_employee = employee_data;
                temp_employee.push_back(employee);
                set_employee(temp_employee);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <Employee_context.Provider value={{ employee_data,set_employee,get_employee,delete_employee,create_employee }}>
            {children}
        </Employee_context.Provider>
    );
};

export { Employee_context, Employee_provider };
