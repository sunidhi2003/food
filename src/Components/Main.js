import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [originalProductList, setOriginalProductList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser ] = useState({
        name: localStorage.getItem('name') || 'Guest',
        email: localStorage.getItem('email') || 'No email available'
    });

    useEffect(() => {
        renderProducts();
    }, []);

    const renderProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/restaurants');
            setOriginalProductList(response.data);
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
        }
    };

    const randomizeProducts = () => {
        const shuffledProducts = [...originalProductList].sort(() => Math.random() - 0.5);
        setOriginalProductList(shuffledProducts);
    };

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        window.location.href = "login.html"; // Change this to a React Router redirect if you're using React Router
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = originalProductList.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <header className="header">
                <a href="#" className="logo">
                    <img src="img/icon (1).jpeg" className="logo-img" alt="" />
                </a>
                <nav className="navbar">
                    <a href="landing.html" target="_blank">Home</a>
                    <a href="#">Features</a>
                    <a href="#">Products</a>
                    <a href="#">Categories</a>
                    <a href="#">Offers</a>
                    <a href="#">Help</a>
                </nav>
                <div className="icons">
                    <div className="fas fa-bars" id="menu-btn"></div>
                    <div className="fas fa-search" id="search-btn"></div>
                    <div className="fas fa-shopping-cart" id="cart-btn" style={{ display: 'none' }}></div>
                    <div className="total-items-in-cart num-icon" style={{ display: 'none' }}>0</div>
                    <div className="fas fa-user" id="login-btn" onClick={handleLogout}></div>
                </div>
                <form className="login-form">
                    <div className="container">
                        <div className="card">
                            <h2>Welcome</h2>
                            <h3>Hi, <span>{user.name}</span></h3>
                            <h3>Email: <span>{user.email}</span></h3>
                            <div className="text-center">
                                <button type="button" onClick={handleLogout} className="btn btn-primary">Logout</button>
                            </div>
                        </div>
                    </div>
                </form>
            </header>

            <section className="home" id="home" style={{ overflowX: 'auto' }}>
                <div className="content">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/6e44fd7f1e5cd9967edfe47c10247671" className="new" alt="" />
                    <img src="img/ban2.webp" className="new" alt="" />
                    <img src="img/ban3.jpg" className="new" alt="" />
                    <img src="img/ban4.webp" className="new" alt="" />
                </div>
            </section>

            <section className="features" id="features">
                <div className="filter">
                <div className="filterLeft">
                        <div className="search-box">
                            <input
                                type="search"
                                id="search-box"
                                placeholder="search here..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <label htmlFor="search-box" className="fas fa-search" onClick={randomizeProducts}></label>
                        </div>
                    </div>
                    <div className="filterRight">
                        <a href="#" onClick={randomizeProducts}>Relevance</a>
                        <a href="#" onClick={randomizeProducts}>Delivery Time</a>
                        <a href="#" onClick={randomizeProducts}>Rating</a>
                        <a href="#" onClick={randomizeProducts}>Cost: Low to High</a>
                        <a href="#" onClick={randomizeProducts}>Cost: High to Low</a>
                        <a href="#">Filters</a>
                    </div>
                </div>
            </section>

            <div className="list-container" id="list-container">
                {filteredProducts.map((product, index) => (
                    <div className="cardDiv" key={index}>
                        <div className="vid-list" data-name={`p-${index}`}>
                            <img src={product.src} className="img-class" alt="Product Image" />
                            <div className="flex-div">
                                <div className="vid-info">
                                    <a href={product.href} className="title">{product.name}</a>
                                    <p>{product.description}</p>
                                    <p>Desserts, Beverages and more...</p>
                                    <div className="btns flex-div">
                                        <div className="rating">
                                            <span className="fas fa-star">{product.rating}</span>
                                        </div>
                                        <div className="time">{product.time}</div>
                                        <div className="amt">RS.{product.amt}</div>
                                    </div>
                                    <div className="offers">
                                        <p>{product.offer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;