import React, { useEffect, useState } from 'react';
import './css/Admin_login.css';
const base = "http://localhost:8000";

export default function Admin_login (){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                console.log("No token") ;
                return;
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
                    throw new Error('Token verification failed');
                }

                // Token is valid, proceed with the component logic
                const data = await response.json();
                console.log(data);
                // setUser(data.user); // Set the verified user data


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



