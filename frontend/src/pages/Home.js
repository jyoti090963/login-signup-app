import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);   // ✅ fixed
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');

        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://login-signup-app-omega.vercel.app/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const result = await response.json();
            console.log(result);
            setProducts(result);

        } catch (err) {
            handleError("Failed to fetch products");
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <div>
                {
                    products.length > 0 ? (
                        products.map((item, index) => (
                            <ul key={index}>
                                <li>{item.name} : ₹{item.price}</li>
                            </ul>
                        ))
                    ) : (
                        <p>No products found</p>
                    )
                }
            </div>

            <ToastContainer />
        </div>
    )
}

export default Home;
