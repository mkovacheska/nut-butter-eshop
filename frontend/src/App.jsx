import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li className="cart-link">
                            <Link to="/cart">Cart ({cartCount})</Link>
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
                            <div className="cart-section" style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
                                <h2 style={{fontFamily: 'Playfair Display, serif', fontSize: '2.5rem'}}>Your Library Bag</h2>
                                {cart.length === 0 ? (
                                    <p style={{marginTop: '20px'}}>Your bag is currently empty.</p>
                                ) : (
                                    <div className="cart-list" style={{marginTop: '40px'}}>
                                        {cart.map(item => (
                                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                                                <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div style={{ flex: 1, textAlign: 'left' }}>
                                                    <h4 style={{fontFamily: 'Playfair Display, serif', fontSize: '1.4rem'}}>{item.name}</h4>
                                                    <p style={{fontSize: '1rem', color: '#666'}}>${item.price.toFixed(2)} x {item.quantity}</p>
                                                    {}
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.8rem', padding: '0', marginTop: '10px', textDecoration: 'underline' }}
                                                    >
                                                        Remove Item
                                                    </button>
                                                </div>
                                                <strong style={{fontSize: '1.2rem'}}>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </div>
                                        ))}
                                        <div style={{ textAlign: 'right', marginTop: '30px' }}>
                                            <h3 style={{fontSize: '2rem'}}>Total: ${cartTotal.toFixed(2)}</h3>
                                            <button className="add-btn" style={{marginTop: '20px', padding: '12px 30px'}}>Proceed to Checkout</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    } />
                </Routes>
            </main>

            <footer className="site-footer">
                <div className="footer-content">
                    <p>2026 Nut Library — ©Girl Around The Food</p>
                    <p>Follow our journey @girlaroundthefood</p>
                    <p>Ohrid, Macedonia</p>
                </div>
            </footer>
        </div>
    );
}

export default App;