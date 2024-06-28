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
            });
            const data = await response.json();
            set_Table_registration(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const update_Table_registration = async (updated_registration) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/tableRegistration/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(updated_registration),
            });
            const data = await response.json();
            // Optionally update state if necessary
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const delete_Table_registration = async (deleted_registration) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/tableRegistration/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(deleted_registration),
            });
            const data = await response.json();
            // Optionally update state if necessary
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const create_Table_registration = async (registration) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/tableRegistration/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(registration),
            });
            const data = await response.json();
            if (data.message === "done") {
                let temp_registrations = [...Table_registration_data];
                temp_registrations.push(registration);
                set_Table_registration(temp_registrations);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Table_registration_context.Provider value={{
            Table_registration_data,
            set_Table_registration,
            get_Table_registration,
            update_Table_registration,
            delete_Table_registration,
            create_Table_registration
        }}>
            {children}
        </Table_registration_context.Provider>
    );
};

export { Table_registration_context, Table_registration_provider };
