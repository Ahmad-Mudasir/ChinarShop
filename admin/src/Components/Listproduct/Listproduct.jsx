"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Trash2, Loader2 } from "lucide-react"
import { API_ENDPOINTS } from "../../config/api"
import "./Listproduct.css"

const Listproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_ENDPOINTS.ALL_PRODUCTS)
      if (response.data.success) {
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(API_ENDPOINTS.REMOVE_PRODUCT, { id })
      if (response.data.success) {
        toast.success("Product removed successfully!")
        setProducts(products.filter((product) => product.id !== id))
      } else {
        toast.error("Product removal failed.")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product.")
    }
  }

  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice || !newPrice) return 0
    const discount = ((oldPrice - newPrice) / oldPrice) * 100
    return Math.round(discount)
  }

  // Product row component - reused for both mobile and desktop
  const ProductRow = ({ product }) => (
    <div className="product-row">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
      </div>
      <div className="product-name">
        <span>{product.name}</span>
      </div>
      <div className="product-old-price">
        <span>${product.old_price}</span>
      </div>
      <div className="product-new-price">
        <span>${product.new_price}</span>
        {product.old_price > product.new_price && (
          <span className="discount-badge">{calculateDiscount(product.old_price, product.new_price)}%</span>
        )}
      </div>
      <div className="product-category">
        <span className="category-badge">{product.category}</span>
      </div>
      <div className="product-actions">
        <button className="delete-btn" onClick={() => handleDelete(product.id)} aria-label="Delete product">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="product-dashboard">
        <div className="dashboard-header">
          <h2>Product List</h2>
          <p>Loading products...</p>
        </div>
        <div className="loading-container">
          <Loader2 className="loading-icon" />
        </div>
      </div>
    )
  }

  return (
    <div className="product-dashboard">
      <div className="dashboard-header">
        <h2>Product List</h2>
        <p>{products.length} products found</p>
      </div>

      <div className="product-list-container">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products available</p>
          </div>
        ) : (
          <>
            <div className="product-list-header">
              <div className="header-image">Product</div>
              <div className="header-name">Title</div>
              <div className="header-old-price">Old Price</div>
              <div className="header-new-price">New Price</div>
              <div className="header-category">Category</div>
              <div className="header-actions">Actions</div>
            </div>
            <div className="product-list">
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Listproduct

