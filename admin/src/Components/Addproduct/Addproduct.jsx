import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"
import './Addproduct.css'
const Addproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("product", file);

    try {
      const response = await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success === 1) {
        setImageUrl(response.data.image_url);
        setProduct({ ...product, image: response.data.image_url });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload an image first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/addproduct", product);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setProduct({
          name: "",
          image: "",
          category: "",
          new_price: "",
          old_price: "",
        });
        setImageUrl("");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>New Price:</label>
            <input
              type="number"
              name="new_price"
              value={product.new_price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Old Price:</label>
            <input
              type="number"
              name="old_price"
              value={product.old_price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" required />
          <button type="button" onClick={handleImageUpload}>
            Upload Image
          </button>
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Product Preview" />
            </div>
          )}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;