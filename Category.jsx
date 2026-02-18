import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProducts } from '../api'

export default function Category() {
  const { category, subcategory } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchProducts().then(all => {
      const filtered = all.filter(p => p.category === category && p.subcategory === subcategory)
      setItems(filtered)
    })
  }, [category, subcategory])

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)
    if (existing) existing.qty += 1
    else cart.push({ ...product, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <div>
      <h2>{subcategory} in {category}</h2>
      <div className="products">
        {items.map(p => (
          <div key={p.id} className="product">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <div className="row">
              <strong>₹{p.price}</strong>
              <div>
                <Link to={`/product/${p.id}`}>View</Link>
                <button onClick={() => addToCart(p)}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
