import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

function App() {
    const [products, setProducts] = useState([]);
    
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('nutLibraryCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        fetch('http://localhost:9000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Backend error:", err));
    }, []);

    useEffect(() => {
        localStorage.setItem('nutLibraryCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    const updateQuantity = (productId, amount) => {
    console.log("Button clicked for ID:", productId, "Adjust by:", amount);

    setCart((prevCart) => {
        const newCart = prevCart.map((item) => {
            if (item.id === productId || item._id === productId) {
                const newQty = (item.quantity || 1) + amount;
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        });
        console.log("New Cart State:", newCart);
        return newCart;
    });
};

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="App">
            <header className="site-header">
                <div className="header-left">
                    <div className="header-text">
                        <h1 className="brand-title">Nut Library</h1>
                        <p className="brand-subtitle">Small-batch, homemade nut butters</p>
                    </div>
                </div>

                <div className="header-center">
                    <Link to="/">
                        <img src="/images/yellow.png" alt="Logo" className="nav-logo" />
                    </Link>
                </div>

                <nav className="header-right">
                    <ul className="nav-menu">
                         <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                             <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                About
                            </NavLink>
                        </li>
                        <li className="cart-link">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Cart ({cartCount})
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <main> 
                <Routes>
                    <Route path="/" element={
                        <div className="home-hero">
                            <div className="hero-overlay"></div>
                            <div className="hero-content">
                                <h2 className="hero-title">Freshly Made. <br/> Locally Loved.</h2>
                                <p className="hero-subtitle">
                                    Experience the creamiest, vegan nut butters made with simple ingredients.
                                </p>
                                <Link to="/products" className="start-btn">
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    } />

                    <Route path="/products" element={
                        <div className="shop-container">
                            <div className="product-grid">
                                {products.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <div className="image-container">
                                            <img src={product.imageUrl} alt={product.name} />
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p className="product-desc">{product.description}</p>
                                            <div className="product-footer">
                                                <span className="price">${product.price.toFixed(2)}</span>
                                                <button className="add-btn" onClick={() => addToCart(product)}>
                                                    Add to Bag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    } />

                    <Route path="/cart" element={
                        <div className="shop-container">
                             <div className="cart-section">
                                <h2 className="cart-header">Your Library Bag</h2>
                                 {cart.length === 0 ? (
                                 <p className="empty-msg">Your bag is currently empty.</p>
                                 ) : (
                                <div className="cart-list">
                                     {cart.map(item => (
                                          <div key={item.id} className="cart-item-row">
                                            <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h4 className="cart-item-name">{item.name}</h4>
                                <p className="cart-item-unit-price">${item.price.toFixed(2)}</p>
                                
                                {}
                                <div className="quantity-tool">
                                    <button 
                                        className="qty-btn" 
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >—</button>
                                    
                                    <span className="qty-val">{item.quantity}</span>
                                    
                                    <button 
                                        className="qty-btn" 
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >+</button>
                                </div>

                                <button 
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove Item
                                </button>
                            </div>
                            
                            <div className="cart-item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    
                    <div className="cart-summary">
                        <h3 className="total-price">Total: ${cartTotal.toFixed(2)}</h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    </div>
} />
{}
<Route path="/about" element={
    <div className="about-page">
        <div className="about-container">
            {}
            <div className="about-image-side">
                <img 
                    src="/images/founder.JPG"
                    alt="Mihaela - Founder of Nut Library" 
                    className="about-img" 
                />
                <div className="founder-caption">
                    <span className="founder-name">Mihaela</span>
                    <span className="founder-title">Founder of Girl Around The Food</span>
                </div>
            </div>
            
            {}
            <div className="about-text-side">
                <h2 className="about-title">The Story Behind <br/> The Library</h2>
                <p className="about-intro">
                    What started as a personal quest for the perfect jar of nut butter, eventually turned from a kitchen experiment into a small business I'm proud of.
                </p>
                <div className="about-details">
                    <p>
                        Nut Library began simply as a hobby. I was looking for healthy, fresh nut butter that I just couldn't find on store shelves—something pure, freshly made, with no unnecessary additives.
                    </p>
                    <p>
                        After perfecting the formula at home for a couple of years, in 2020 I decided to share it with others. What began with a few jars has grown into the business you see today, built on the same promise I made to myself: never settle for anything less than the freshest and purest ingredients.
                    </p>
                    <p>
                        From my kitchen in Ohrid to your home, thank you for being part of this journey.
                    </p>
                </div>
                <Link to="/products" className="about-shop-btn">Shop the Collection</Link>
            </div>
        </div>
    </div>
} />
                </Routes>
            </main>

            <footer className="site-footer">
    <div className="footer-container">
        {}
        <div className="footer-column">
            <h3 className="footer-logo">Nut Library</h3>
            <p className="footer-about">
                Homemade nut butters, crafted in the heart of Ohrid.
                Each jar contains just good quality nuts, no other unnecessary ingredients!
            </p>
        </div>

        {}
        <div className="footer-column">
            <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Shop All</Link></li>
                <li><Link to="/about">Our Story</Link></li>
            </ul>
        </div>

        {}
        <div className="footer-column">
            <h4 className="footer-heading">Follow Our Journey on Instagram: </h4>
            <div className="footer-social-box">
                <a href="https://instagram.com/girlaroundthefood" target="_blank" rel="noreferrer" className="instagram-tag">
                    {}
                    <i className="fab fa-instagram"></i> @girlaroundthefood
                </a>
            </div>
        </div>
    </div>

    <div className="footer-bottom-bar">
        <p>© 2026 NUT LIBRARY. ALL RIGHTS RESERVED.</p>
        <p>since 2020</p>
    </div>
</footer>
        </div>
    );
}

export default App;