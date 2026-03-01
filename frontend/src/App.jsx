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
            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
                {/* This looks for the logo in public/images/logo.png */}
                <img
                    src="/images/yellow.png"
                    alt="Logo"
                    style={{ width: '200px', marginBottom: '20px' }}
                />

                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: '#1a3a8a' }}>
                    Nut Library
                </h1>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#1a3a8a' }}>Small-batch, homemade nut butters</p>
            </header>

            <main>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name}/>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className="price-row">
                                <span>${product.price.toFixed(2)}</span>
                                <button>Add to Bag</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
export default App