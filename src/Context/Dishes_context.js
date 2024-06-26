import React, { createContext, useState } from 'react';
const base = "http://localhost:8000";

const Dishes_context = createContext();

const Dishes_provider = ({ children }) => {
    const [Dishes_data, set_Dishes] = useState({});

    const get_Dishes = async () => {
        try {
            const response = await fetch(`${base}/admin/dishes/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(data_to_send),
            });



            const data = await response.json();
            console.log(data);

            set_Dishes(data) 
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Dishes_context.Provider value={{ Dishes_data, set_Dishes,get_Dishes }}>
            {children}
        </Dishes_context.Provider>
    );
};

export { Dishes_context, Dishes_provider };