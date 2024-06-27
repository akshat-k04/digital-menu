import React, { createContext, useState } from 'react';
const base = "http://localhost:8000";
const employee_context = createContext();

const Employee_provider = ({ children }) => {
    const [employee_data , set_employee] =useState({}) ;
    const token = localStorage.getItem('token');

    const get_employee = async () => {
        try {
            const response = await fetch(`${base}/admin/employee/`, {
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
    return (
        <employee_context.Provider value={{ employee_data,set_employee,get_employee }}>
            {children}
        </employee_context.Provider>
    );
};

export { employee_context, Employee_provider };
