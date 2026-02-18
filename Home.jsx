import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Welcome to ShopDemo</h1>
      <section>
        <h2>Dress Categories</h2>
        <div className="categories">
          <div className="card">
            <h3>Dresses - Sarees</h3>
            <p>Traditional and modern sarees</p>
            <Link to="/category/Dresses/Sarees">Browse Sarees</Link>
          </div>
          <div className="card">
            <h3>Dresses - Western</h3>
            <p>Western dresses and outfits</p>
            <Link to="/category/Dresses/Western">Browse Western</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
