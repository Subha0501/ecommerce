import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

export async function fetchProducts() {
  const r = await API.get('/products')
  return r.data
}

export async function fetchProduct(id) {
  const r = await API.get(`/products/${id}`)
  return r.data
}

export async function checkout(payload) {
  const r = await API.post('/checkout', payload)
  return r.data
}
