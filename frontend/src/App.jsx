import emailjs from '@emailjs/browser';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    return (
        <div className="shop-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2 className="checkout-main-title">Order Confirmed!</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#555', marginBottom: '40px' }}>
                Thank you for visiting the Library. You will receive an email confirmation soon.
            </p>
            <Link to="/">
                <button className="checkout-btn-main" style={{ width: 'auto', padding: '15px 40px' }}>
                    BACK TO SHOPPING
                </button>
            </Link>
        </div>
    );
};

const Checkout = ({ cart, setCart, cartTotal, MKD_RATE }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', phone: ''
    });

    const DELIVERY_FEE_MKD = 200;
    const subtotalMKD = Math.round(cartTotal * MKD_RATE);
    const finalTotalMKD = subtotalMKD + DELIVERY_FEE_MKD;

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetailsString = cart.map(item => 
        `${item.name} (${item.size}) x ${item.quantity}`
    ).join('\n');

    const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        address: formData.address,
        city: formData.city,
        total_price: `${finalTotalMKD} MKD`,
        order_details: orderDetailsString
    };

    emailjs.send(
        'service_5skj9vb',       
        'template_82drr57', 
        templateParams,
        'xVyyuL8-4LH8xN9Ji' 
    )
    .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setCart([]);
        navigate('/order-confirmation'); 
    })
    .catch((err) => {
        console.error('Email failed to send:', err);
        setCart([]);
        navigate('/order-confirmation');
    });
};

    return (
        <div className="shop-container">
            <div className="checkout-layout">
                <div className="checkout-form-side">
                    <h2 className="checkout-main-title">Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <h3 className="checkout-subheading">Shipping Details</h3>
                        <div className="checkout-input-stack">
                            <input name="name" placeholder="Full Name" onChange={handleInput} required className="checkout-field" />
                            <input name="email" type="email" placeholder="Email Address" onChange={handleInput} required className="checkout-field" />
                            <input name="address" placeholder="Shipping Address" onChange={handleInput} required className="checkout-field" />
                            <div className="checkout-row-double">
                                <input name="city" placeholder="City" onChange={handleInput} required className="checkout-field" />
                                <input name="phone" placeholder="Phone Number" onChange={handleInput} required className="checkout-field" />
                            </div>
                        </div>

                        <h3 className="checkout-subheading" style={{marginTop: '30px'}}>Payment Method</h3>
                        <div className="payment-box">
                            <label className="payment-radio">
                                <input type="radio" checked readOnly />
                                <span>Pay on Delivery (Cash) — {DELIVERY_FEE_MKD} MKD Delivery</span>
                            </label>
                        </div>
                        
                        <button type="submit" className="checkout-btn-main">PLACE ORDER</button>
                    </form>
                </div>

                <div className="order-summary-card">
                    <h3 className="summary-title">Your Order</h3>
                    <div className="summary-items">
                        {cart.map(item => (
                            <div key={`${item.id}-${item.size}`} className="summary-item-row">
                                <span>{item.name} ({item.size}) x {item.quantity}</span>
                                <span>{Math.round((item.price * item.quantity) * MKD_RATE)} MKD</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-totals">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{subtotalMKD} MKD</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>{DELIVERY_FEE_MKD} MKD</span>
                        </div>
                        <div className="summary-row grand-total">
                            <span>Total</span>
                            <span>{finalTotalMKD} MKD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('nutLibraryCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const MKD_RATE = 60;

    useEffect(() => {
        fetch('http://localhost:9000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Backend error:", err));
    }, []);

    useEffect(() => {
        localStorage.setItem('nutLibraryCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, price) => {
        setCart((prevCart) => {
            const existing = prevCart.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return prevCart.map(item =>
                    (item.id === product.id && item.size === size) 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            return [...prevCart, { ...product, quantity: 1, size, price }];
        });
    };

    const updateQuantity = (productId, amount, size) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === productId && item.size === size) {
                    const newQty = (item.quantity || 1) + amount;
                    return { ...item, quantity: Math.max(1, newQty) };
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) => prevCart.filter(item => !(item.id === productId && item.size === size)));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const ProductDetail = () => {
        const { id } = useParams();
        const product = products.find(p => p.id === parseInt(id));
        const [selectedSize, setSelectedSize] = useState("200g");

        if (products.length === 0) {
            return <div className="shop-container"><p>Loading library...</p></div>;
        }
        if (!product) {
            return <div className="shop-container"><p>Product not found.</p></div>;
        }

        const modifiers = product.sizeModifiers || {};
        const currentPrice = (product.price + (modifiers[selectedSize] || 0)) * MKD_RATE;

        return (
            <div className="about-page">
                <div className="about-container">
                    <div className="about-image-side">
                        <img src={product.imageUrl} alt={product.name} className="about-img" />
                    </div>
                    
                    <div className="about-text-side">
                        <Link to="/products" className="back-link" style={{textDecoration: 'none', color: '#888', fontSize: '0.8rem'}}>← BACK TO SHOP</Link>
                        <h2 className="about-title" style={{marginTop: '10px'}}>{product.name}</h2>
                        <p className="detail-price" style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0'}}>{Math.round(currentPrice)} MKD</p>
                        
                        <div className="size-selector" style={{margin: '30px 0'}}>
                            <p style={{fontSize: '0.8rem', fontWeight: '600', marginBottom: '10px'}}>SELECT SIZE</p>
                            <div style={{display: 'flex', gap: '10px'}}>
                                {Object.keys(modifiers).length > 0 ? (
                                    Object.keys(modifiers)
                                        .sort((a, b) => parseInt(a) - parseInt(b)) 
                                        .map(size => (
                                            <button 
                                                key={size}
                                                className={selectedSize === size ? "size-btn active" : "size-btn"}
                                                onClick={() => setSelectedSize(size)}
                                                style={{
                                                    padding: '10px 20px',
                                                    border: '1px solid #1a1a1a',
                                                    backgroundColor: selectedSize === size ? '#1a3a8a' : 'white',
                                                    color: selectedSize === size ? 'white' : '#1a1a1a',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {size}
                                            </button>
                                        ))
                                ) : (
                                    <p>Standard Size Only (200g)</p>
                                )}
                            </div>
                        </div>

                        <div className="about-details">
                            <p>{product.description}</p>
                            <p>All of our nut butters are stone-ground and freshly made in small batches in Ohrid.</p>
                        </div>

                        <button 
                            className="about-shop-btn" 
                            style={{width: '100%', marginTop: '30px', border: 'none', cursor: 'pointer'}}
                            onClick={() => addToCart(product, selectedSize, (product.price + (modifiers[selectedSize] || 0)))}
                        >
                            Add {selectedSize} to Bag
                        </button>
                    </div>
                </div>
            </div>
        );
    };

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
                    <Link to="/"><img src="/images/yellow.png" alt="Logo" className="nav-logo" /></Link>
                </div>
                <nav className="header-right">
                    <ul className="nav-menu">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink></li>
                        <li><NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Products</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>About</NavLink></li>
                        <li className="cart-link">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Cart ({cartCount})</NavLink>
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
                                <Link to="/products" className="start-btn">Start Shopping</Link>
                            </div>
                        </div>
                    } />
                    <Route path="/checkout" element={
                        <Checkout 
                            cart={cart} 
                            setCart={setCart}
                            cartTotal={cartTotal} 
                            MKD_RATE={MKD_RATE} 
                        />
} />
                     <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/products" element={
                        <div className="shop-container">
                            <div className="product-grid">
                                {products.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <Link to={`/product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                            <div className="image-container">
                                                <img src={product.imageUrl} alt={product.name} />
                                            </div>
                                            <h3>{product.name}</h3>
                                        </Link>
                                        <div className="product-info">
                                            <p className="product-desc">{product.description}</p>
                                            <div className="product-footer">
                                                {}
                                                <span className="price">from {Math.round(product.price * MKD_RATE)} MKD</span>
                                                <Link to={`/product/${product.id}`} className="more-btn">
                                                    More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    } />

                    <Route path="/product/:id" element={<ProductDetail />} />

                   <Route path="/cart" element={
    <div className="shop-container">
        <div className="cart-section">
            {cart.length === 0 ? (
                <div className="empty-cart-container">
                    <h2 className="cart-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Your Library Bag
                    </h2>
                    <p className="empty-msg" style={{ marginBottom: '30px' }}>
                        Your bag is currently empty.
                    </p>
                    <Link to="/products" className="about-shop-btn">
                        Explore the Library
                    </Link>
                </div>
            ) : (
                <>
                    <h2 className="cart-header">Your Library Bag</h2>
                    <div className="cart-list">
                        {cart.map(item => (
                            <div key={`${item.id}-${item.size}`} className="cart-item-row">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4 className="cart-item-name">{item.name} ({item.size})</h4>
                                    <p className="cart-item-unit-price">{Math.round(item.price * MKD_RATE)} MKD</p>
                                    <div className="quantity-tool">
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1, item.size)}>—</button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1, item.size)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                                </div>
                                <div className="cart-item-total">{Math.round((item.price * item.quantity) * MKD_RATE)} MKD</div>
                            </div>
                        ))}
                        <div className="cart-summary">
                            <h3 className="total-price">Total: {Math.round(cartTotal * MKD_RATE)} MKD</h3>
                            <Link to="/checkout" style={{ textDecoration: 'none' }}>
                                <button className="checkout-btn">Proceed to Checkout</button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
} />

                    <Route path="/about" element={
                        <div className="about-page">
                            <div className="about-container">
                                <div className="about-image-side">
                                    <img src="/images/founder.JPG" alt="Mihaela" className="about-img" />
                                    <div className="founder-caption">
                                        <span className="founder-name">Mihaela Kovacheska</span>
                                        <span className="founder-title">Founder of Girl Around The Food</span>
                                    </div>
                                </div>
                                <div className="about-text-side">
                                    <h2 className="about-title">The Story Behind <br/> The Library</h2>
                                    <p className="about-intro">What started as a personal quest for the perfect jar of nut butter, eventually turned from a kitchen experiment into a small business I'm proud of.</p>
                                    <div className="about-details">
                                        <p>"Girl Around The Food: Nut Library" began simply as a hobby. I was looking for healthy, fresh nut butter that I just couldn't find on store shelves.</p>
                                        <p>After perfecting the formula at home, in 2020 I decided to share it with others and here we are, 6 years later, still delivering the same quality and happiness to my customers. What started as a small assortiment of products, has grown into a multiple nut butter varieties, at different sizes and homemade granola.</p>
                                        <p>Everything is made in small batches and with the highest quality ingredients. With every order of nut butter, you get a fresh daily made product just for you- not a stored product.</p>
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
                    <div className="footer-column">
                        <h3 className="footer-logo">Nut Library</h3>
                        <p className="footer-about">Homemade nut butters, crafted in the heart of Ohrid. 
                            Made in small batches with love, attention and the finest ingredients.
                        </p>
                    </div>
                    <div className="footer-column">
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Shop All</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-heading">Follow Our Journey on Instagram: </h4>
                        <div className="footer-social-box">
                            <a href="https://instagram.com/girlaroundthefood" target="_blank" rel="noreferrer" className="instagram-tag">@girlaroundthefood</a>
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