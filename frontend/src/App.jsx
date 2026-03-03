import { useEffect, useState } from 'react'

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="App">
            {/* 1. Modern Navigation Header */}
            <header className="site-header">
                <div className="header-content">
                    <img src="/images/yellow.png" alt="Logo" className="nav-logo" />
                    <div className="header-text">
                        <h1 className="brand-title">Nut Library</h1>
                        <p className="brand-subtitle">Small-batch, homemade nut butters</p>
                    </div>
                </div>
                <div className="header-tag">Since 2020</div>
            </header>

            {/* 2. Main Shop Section */}
            <main className="shop-container">
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
                                    <button className="add-btn">Add to Bag</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;