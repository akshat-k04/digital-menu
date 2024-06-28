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
            // console.log(data);

            set_Dishes(data) 
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    const update_Dishes = async (updated_dish) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/dishes/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify( updated_dish ),
            });
            const data = await response.json();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    const delete_Dishes = async (deleted_dish) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/dishes/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify( deleted_dish ),
            });
            const data = await response.json();
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    const create_Dish = async (dish) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${base}/admin/dishes/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${token}`
                },
                body: JSON.stringify(dish),
            });
            const data = await response.json();
            if(data.message=="done"){
                let temp_dishes = Dishes_data ;
                temp_dishes.push_back(dish) ;
                set_Dishes(temp_dishes) ;
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <Dishes_context.Provider value={{ Dishes_data, set_Dishes,get_Dishes,update_Dishes ,delete_Dishes,create_Dish}}>
            {children}
        </Dishes_context.Provider>
    );
};

export { Dishes_context, Dishes_provider };