import React, { createContext, useState } from 'react';

const employee_context = createContext();

const Employee_provider = ({ children }) => {
    const [employee_data , set_employee] =useState({}) ;


    return (
        <employee_context.Provider value={{ employee_data,set_employee }}>
            {children}
        </employee_context.Provider>
    );
};

export { employee_context, Employee_provider };
