import { createContext, useState,useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart ={};
    for (let index = 0; index < 300+1; index++){
        cart[index]=0;
    }
    return cart;
}

 const ShopContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_product, setAllProduct] = useState([]); // State to store fetched product data

 // Fetch product data from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/allproducts"); // Replace with your API endpoint
        const data = await response.json();
        console.log("Fetched Products:", data); // Log the fetched data
        // Extract the `products` array from the response
      if (data.success && Array.isArray(data.products)) {
        setAllProduct(data.products); // Set only the products array
      } else {
        console.error("Invalid data format:", data);
      }
        //setAllProduct(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

   // Function to fetch cart data
  const fetchCartData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/getcartdata', {
        method: 'POST',
        headers: {
          'token': token, // Send the token in the headers
        },
        body:"",
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartData); // Set the cart data
        console.log('setdata fetch',data.cartData);
        
      } else {
        console.error('Failed to fetch cart data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };


    fetchProducts();
    fetchCartData();
  }, []);


  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const response = await fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token": token,
          },
          body: JSON.stringify({ itemId }),
        });
  
        const data = await response.json(); // Convert response to JSON
        console.log("Cart updated successfully:", data);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
  

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]-1}))

        const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const response = await fetch("http://localhost:4000/removefromcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "token": token,
          },
          body: JSON.stringify({ itemId }),
        });
  
        const data = await response.json(); // Convert response to JSON
        console.log("Cart removed and  updated successfully:", data);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
    }

    const getTotalCartAmount = ()=>{
          let totalAmount = 0;
          for(const item in cartItems)
          {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=> product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
           
          }
          return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0 )
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
 }

 export default ShopContextProvider;
