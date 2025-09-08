import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";
import { API_ENDPOINTS } from "../../config/api";

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.NEW_COLLECTIONS);
        if (!response.ok) {
          throw new Error("Failed to fetch new collections");
        }

        const data = await response.json();
        console.log("Fetched New Collections:", data);

        if (data.success && Array.isArray(data.newcollections)) {
          setNewCollections(data.newcollections);
        } else {
          console.error("Invalid data format:", data);
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching new collections:", error);
        setError("Failed to load new collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="collections">
        {newCollections.length > 0 ? (
          newCollections.map((item, index) => (
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
          !loading && <p>No new collections available.</p>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
