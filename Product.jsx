import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../api'

export default function Product() {
  const { id } = useParams()
  const [p, setP] = useState(null)

  useEffect(() => {
    fetchProduct(id).then(setP).catch(() => setP(null))
  }, [id])

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)
    if (existing) existing.qty += 1
    else cart.push({ ...product, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  if (!p) return <div>Loading...</div>

  return (
    <div className="product-detail">
      <img src={p.image} alt={p.name} />
      <div>
        <h2>{p.name}</h2>
        <p>{p.description}</p>
        <p><strong>₹{p.price}</strong></p>
        <button onClick={() => addToCart(p)}>Add to cart</button>
      </div>
    </div>
  )
}
