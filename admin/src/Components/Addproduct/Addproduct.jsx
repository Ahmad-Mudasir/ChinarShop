import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Addproduct.css";

const Addproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file selection (Preview only)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submission (Uploads image + product together)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("product", file);

    try {
      // Upload image first
      const uploadResponse = await axios.post("http://localhost:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadResponse.data.success === 1) {
        const imageUrl = uploadResponse.data.image_url;

        // Send product details including uploaded image URL
        const productData = { ...product, image: imageUrl };
        const productResponse = await axios.post("http://localhost:4000/addproduct", productData);

        if (productResponse.data.success) {
          toast.success("Product added successfully!");
          setProduct({ name: "", category: "", new_price: "", old_price: "" });
          setFile(null);
          setImagePreview("");
        } else {
          toast.error("Failed to add product.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Category:</label>
            <input type="text" name="category" value={product.category} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>New Price:</label>
            <input type="number" name="new_price" value={product.new_price} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Old Price:</label>
            <input type="number" name="old_price" value={product.old_price} onChange={handleInputChange} required />
          </div>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" required />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Product Preview" />
            </div>
          )}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;
