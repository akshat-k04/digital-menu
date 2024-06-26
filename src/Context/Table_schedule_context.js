import React, { createContext, useState } from 'react';
const base = "http://localhost:8000";

const Table_schedule_context = createContext();

const Table_schedule_provider = ({ children }) => {
    const [Table_schedule_data, set_Table_schedule] = useState({});

    const get_table_schedule = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/table/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token' : `Bearer ${token}`
                },
                // body: JSON.stringify(data_to_send),
            });



            const data = await response.json();
            console.log(data);

            set_Table_schedule(data)
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Table_schedule_context.Provider value={{ Table_schedule_data, set_Table_schedule, get_table_schedule }}>
            {children}
        </Table_schedule_context.Provider>
    );
};

export { Table_schedule_context, Table_schedule_provider };