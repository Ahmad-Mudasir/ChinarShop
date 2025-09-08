import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { API_ENDPOINTS } from "../../config/api";

const Popular = () => {
  const [popularWomen, setPopularWomen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularWomen = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.POPULAR_WOMEN);
        if (!response.ok) {
          throw new Error("Failed to fetch popular women's products");
        }

        const data = await response.json();
        console.log("Fetched Popular Women Products:", data);

        if (data.success && Array.isArray(data.products)) {
          setPopularWomen(data.products);
        } else {
          console.error("Invalid data format:", data);
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching popular women's products:", error);
        setError("Failed to load popular women's products.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularWomen();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="popular-item">
        {popularWomen.length > 0 ? (
          popularWomen.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          !loading && <p>No popular women's products available.</p>
        )}
      </div>
    </div>
  );
};

export default Popular;