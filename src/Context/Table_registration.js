import React, { createContext, useState } from 'react';
const base = "http://localhost:8000";


const Table_registration_context = createContext();

const Table_registration_provider = ({ children }) => {
    const [Table_registration_data, set_Table_registration] = useState({});

    const get_Table_registration = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${base}/admin/tableRegistration/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                // body: JSON.stringify(data_to_send),
            });



            const data = await response.json();
            console.log(data);

            set_Table_registration(data)
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <Table_registration_context.Provider value={{ Table_registration_data, set_Table_registration,get_Table_registration }}>
            {children}
        </Table_registration_context.Provider>
    );
};

export { Table_registration_context, Table_registration_provider };