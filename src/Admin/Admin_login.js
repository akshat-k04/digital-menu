import React, { useEffect, useState,useContext } from 'react';
import './css/Admin_login.css';
import { Dishes_context } from '../Context/Dishes_context';
import { Table_schedule_context } from '../Context/Table_schedule_context';
import { employee_context } from '../Context/employee_context';
import { Table_registration_context } from '../Context/Table_registration';
// import { User_context } from '../Context/user_data';
const base = "http://localhost:8000";

export default function Admin_login ({checkToken}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { get_Dishes } = useContext(Dishes_context);
    const { get_table_schedule  } = useContext(Table_schedule_context);
    const { get_employee } = useContext(employee_context);
    const { get_Table_registration } = useContext(Table_registration_context);
    // const {set_User} = useContext(User_context) ;

    const handleSubmit =async (e) => {
        e.preventDefault();
        let data_to_send = {
            "username" : username,
            "password" :password 
        }
        try {
            const response = await fetch(`${base}/admin/employee/Signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_to_send),
            });

            if (!response.ok) {
                window.alert("Invalid credentials!");
            }

            const data = await response.json();
        
            localStorage.setItem('token', data.token);
            // add use context here and save it globally
            // redirect to new page
            await get_Dishes() ;
            await get_employee() ;
            await get_table_schedule() ;
            await get_Table_registration() ;
            window.location.href = '/dashboard';
        } 
        catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // If no token
                // redirect to login page
                // window.location.href = '/';
                console.log("No token");
            }

            try {
                const response = await fetch(`${base}/admin/employee/verifyToken`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    // window.location.href = '/';
                    throw new Error('Token verification failed');
                }

                // Token is valid, proceed with the component logic
                const data = await response.json();
                console.log(data);
                await get_employee();
                await get_Dishes();
                await get_table_schedule();
                await get_Table_registration();
                window.location.href = '/dashboard';

            } catch (error) {
                console.error('Error:', error);
                // re direct to login page
            }
        };
        checkToken();
    }, []);

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};



