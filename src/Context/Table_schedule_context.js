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
            // console.log(data);

            set_Table_schedule(data)
        }
        catch (error) {
            console.error('Error:', error);
        }
    }


    const update_Table_schedule = async (update_schedule) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/table/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(update_schedule),
            });
            const data = await response.json();
            // Optionally update state if necessary
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const delete_Table_schedule = async (deleted_schedule) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/table/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(deleted_schedule),
            });
            const data = await response.json();
            // Optionally update state if necessary
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const create_Table_schedule = async (schedule) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/table/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(schedule),
            });
            const data = await response.json();
            if (data.message === "done") {
                let temp_schedules = [...Table_schedule_data];
                temp_schedules.push(schedule);
                set_Table_schedule(temp_schedules);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Table_schedule_context.Provider value={{ Table_schedule_data, set_Table_schedule, get_table_schedule, update_Table_schedule, create_Table_schedule, delete_Table_schedule }}>
            {children}
        </Table_schedule_context.Provider>
    );
};

export { Table_schedule_context, Table_schedule_provider };