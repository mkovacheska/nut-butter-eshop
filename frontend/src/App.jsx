import { useEffect, useState } from 'react'

function App() {
    // --- 1. STATE MANAGEMENT ---
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [activePage, setActivePage] = useState('home'); // Tracks which section to show

    // --- 2. LOAD DATA FROM BACKEND ---
    useEffect(() => {
        fetch('http://localhost:8081/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Backend error:", err));
    }, []);

    // --- 3. FUNCTIONS ---
    const addToCart = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    return (
        <div className="App">
            {/* --- HEADER & NAVIGATION --- */}
            <header className="site-header">
                {/* Left Column: Title and Subtitle stacked */}
                <div className="header-left">
                    <div className="header-text">
                        <h1 className="brand-title">Nut Library</h1>
                        <p className="brand-subtitle">Small-batch, homemade nut butters</p>
                    </div>
                </div>

                {/* Center Column: Larger Logo */}
                <div className="header-center">
                    <img src="/images/yellow.png" alt="Logo" className="nav-logo" />
                </div>

                {/* Right Column: Clean Menu */}
                <nav className="header-right">
                    <ul className="nav-menu">
                        <li><button onClick={() => setActivePage('home')}>Home</button></li>
                        <li><button onClick={() => setActivePage('products')}>Products</button></li>
                        <li><button onClick={() => setActivePage('about')}>About</button></li>
                        <li className="cart-link">
                            <button onClick={() => setActivePage('cart')}>Cart ({cartCount})</button>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* --- MAIN CONTENT (Changes based on activePage) --- */}
            <main className="shop-container">

                {/* VIEW: HOME */}
                {activePage === 'home' && (
                    <div className="home-hero" style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <h2 style={{ fontSize: '3rem', fontFamily: 'Playfair Display, serif' }}>
                            Freshly Ground. <br/> Locally Loved.
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '20px auto' }}>
                            Experience the creamiest, vegan nut butters made with simple ingredients and a lot of love.
                        </p>
                        <button className="add-btn" style={{ marginTop: '20px', padding: '12px 24px' }} onClick={() => setActivePage('products')}>
                            Start Shopping
                        </button>
                    </div>
                )}

                {/* VIEW: PRODUCTS (The Grid) */}
                {activePage === 'products' && (
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
                                        <button className="add-btn" onClick={addToCart}>
                                            Add to Bag
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* VIEW: ABOUT */}
                {activePage === 'about' && (
                    <div className="about-section" style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif' }}>Our Story</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '20px auto', lineHeight: '1.6' }}>
                            Nut Library was born from a passion for stone-ground textures and pure flavors.
                            We believe food should be honest, which is why we only use the highest quality nuts
                            with no hidden additives. Small batches, big taste.
                        </p>
                    </div>
                )}

                {/* VIEW: CART (Placeholder) */}
                {activePage === 'cart' && (
                    <div className="cart-section" style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <h2>Your Bag ({cartCount})</h2>
                        <p>Items in your cart will appear here.</p>
                        <button className="add-btn" onClick={() => setActivePage('products')}>Continue Shopping</button>
                    </div>
                )}

            </main>
            <footer className="site-footer">
                <div className="footer-content">
                    <p>© 2020 Girl Around The Food — Small batch, homemade nut butters.</p>
                    <p>Follow our journey @girlaroundthefood</p>
                    <div style={{marginTop: '10px', fontSize: '0.7rem', opacity: 0.6}}>
                        Homemade & Vegan • Healthy • Sustainable Packaging
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;