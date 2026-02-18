import React, { useState } from 'react'
import { checkout } from '../api'

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

export default function Cart() {
  const [cart, setCart] = useState(getCart())
  const [paymentMode, setPaymentMode] = useState('offline')
  const [onlineMethod, setOnlineMethod] = useState('upi')
  const [customerName, setCustomerName] = useState('')
  const [orderResult, setOrderResult] = useState(null)

  function save(c) {
    localStorage.setItem('cart', JSON.stringify(c))
    setCart([...c])
  }

  function removeItem(id) {
    const c = cart.filter(i => i.id !== id)
    save(c)
  }

  function changeQty(id, delta) {
    const c = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    save(c)
  }

  async function handleCheckout(e) {
    e.preventDefault()
    if (cart.length === 0) return alert('Cart empty')

    const payload = {
      cart,
      customer: { name: customerName },
      payment: { mode: paymentMode, method: paymentMode === 'online' ? onlineMethod : 'offline' }
    }

    try {
      const res = await checkout(payload)
      setOrderResult(res)
      localStorage.removeItem('cart')
      setCart([])
    } catch (err) {
      alert('Checkout failed')
    }
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div className="cart-list">
          {cart.map(i => (
            <div key={i.id} className="cart-item">
              <img src={i.image} alt={i.name} />
              <div>
                <h4>{i.name}</h4>
                <p>₹{i.price} x {i.qty}</p>
                <div className="row">
                  <button onClick={() => changeQty(i.id, -1)}>-</button>
                  <button onClick={() => changeQty(i.id, +1)}>+</button>
                  <button onClick={() => removeItem(i.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr />

      <h3>Checkout</h3>
      <form onSubmit={handleCheckout} className="checkout-form">
        <label>
          Name
          <input value={customerName} onChange={e => setCustomerName(e.target.value)} required />
        </label>

        <label>
          Payment Mode
          <div>
            <label><input type="radio" name="pm" value="offline" checked={paymentMode==='offline'} onChange={() => setPaymentMode('offline')} /> Offline (Pay on delivery)</label>
            <label><input type="radio" name="pm" value="online" checked={paymentMode==='online'} onChange={() => setPaymentMode('online')} /> Online</label>
          </div>
        </label>

        {paymentMode === 'online' && (
          <label>
            Online Method
            <select value={onlineMethod} onChange={e => setOnlineMethod(e.target.value)}>
              <option value="upi">UPI</option>
              <option value="bank">Net Banking</option>
            </select>
          </label>
        )}

        <button type="submit">Place Order</button>
      </form>

      {orderResult && (
        <div className="order-result">
          <h4>Order Confirmed</h4>
          <p>Order ID: {orderResult.orderId}</p>
          <p>{orderResult.message}</p>
        </div>
      )}
    </div>
  )
}
