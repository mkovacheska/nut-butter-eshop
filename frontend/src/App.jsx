import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white px-8 py-12 font-sans">
      {/* Editorial Header */}
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase mb-4">The Nut Library</h1>
        <p className="text-gray-400 italic font-serif text-lg">Pure. Stone-ground. Organic.</p>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="overflow-hidden bg-gray-100 aspect-[4/5] mb-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm tracking-widest uppercase mb-2">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default App