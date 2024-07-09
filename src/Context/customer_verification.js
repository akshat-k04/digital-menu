import {createContext, useContext } from 'react';
import { Dishes_context } from '../Context/Dishes_context';
const base = "http://localhost:8000";

const TokenVerificationContext = createContext();

const TokenVerificationProvider = ({ children }) => {
    const { get_Dishes ,set_cart} = useContext(Dishes_context);
    


        const checkToken = async (path,navigate) => {
            console.log(path) ;
            const token = localStorage.getItem('c_token');
            if (!token && path !== '/login') {
                navigate("/login");
                console.log("No token");
                return;
            }

            try {
                const response = await fetch(`${base}/customer/Signin/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'c_token': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Token verification failed');
                }

                const data = await response.json();
                // console.log(data) ;
                // await set_cart(data.user.order_id);
                await get_Dishes();
                if (path === '/login') navigate("/order");
            } catch (error) {
                console.error('Error:', error);
                if (path !== '/login') navigate("/login");
            }
        };


    return (
        <TokenVerificationContext.Provider value={{ checkToken }}>
            {children}
        </TokenVerificationContext.Provider>
    );
};

export { TokenVerificationContext, TokenVerificationProvider };
