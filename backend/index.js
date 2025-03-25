const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Add this
app.use(express.json());


const port = 4000;

// Database connection with MongoDB
mongoose.connect(
  "mongodb+srv://nawaz311412:chinarShop@cluster0.z8qfv.mongodb.net/chinarShop?authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("Database Connected"))
.catch((error) => console.error("Database Connection Failed:", error.message));

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename:(req,file,cb) => {
   return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage:storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload",upload.single('product'),(req,res) => {
    console.log("Request File:", req.file); // Debugging: Log the file object
  console.log("Request Body:", req.body); // Debugging: Log the request body

  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

//schema for creatings products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensure each product has a unique ID
  },
  name: {
    type: String,
    required: true,
    trim: true, // Remove extra spaces
  },
  image: {
    type: String,
    
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
  available: {
    type: Boolean,
    default: true, // Default to true (product is available)
  },
} );

// Create the Product model
const Product = mongoose.model('Product', productSchema);

//add product end point
app.post('/addproduct',async (req,res)=>{

  //generate unique id
  let products = await Product.find({});
  let id;
  if(products.length>0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  } else{
    id =1;
  }

  const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log('saved');
  res.json({
    success:true,
    name:req.body.name,
  })
  
})

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
  try {
    const productId = req.body.id; // Assuming the product ID is sent in the request body

    // Find the product by ID and delete it
    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      // If no product is found with the given ID, return an error response
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // If the product is successfully deleted, return a success response
    console.log('Removed');
    
    res.json({
      success: true,
      name:req.body.name,
      message: 'Product removed successfully',
      deletedProduct,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error removing product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.get('/allproducts', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});

    // If no products are found, return an empty array
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products found',
        products: [],
      });
    }

    // If products are found, return them in the response
    res.status(200).json({
      success: true,
      message: 'All products retrieved successfully',
      products,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

//Api endpoint for new collection
app.get('/newcollections', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);

    // If no products are found, return an empty array
    if (!newcollections || newcollections.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No newcollections products found',
        newcollections: [],
      });
    }

    // If products are found, return them in the response
    res.status(200).json({
      success: true,
      message: 'All newcollections products retrieved successfully',
      newcollections,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching newcollections products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

//api endpoint for popular product
app.get('/popular-women', async (req, res) => {
  try {
    // Fetch all products from the database where category is 'women'
    const Products = await Product.find({ category: "women" });
     const popularWomenProducts = Products.slice(0,4)
    // If no products are found, return an empty array
    if (!popularWomenProducts || popularWomenProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No popular women's products found",
        products: [],
      });
    }

    // If products are found, return them in the response
    res.status(200).json({
      success: true,
      message: "Popular women's products retrieved successfully",
      products: popularWomenProducts,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching popular women's products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


//schema for user
const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
  },
  password: {
      type: String,
      required: true,
  },
  cartData: {
      type: Object,
  },
  date: {
      type: Date,
      default: Date.now // Automatically sets to the current date and time
  }
});

const User = mongoose.model('User', userSchema);

// Signup Route api endpoint
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

     let cart = {};
     for (let i = 0; i < 300; i++) {
      cart[i] = 0;
  }

    // Create user
    user = new User({ name, email, password, cartData:cart});
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, 'secret_ecom', {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//create login endponit
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare passwords (assuming passwords are hashed in the DB)
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid  password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, "secret_ecom", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//creating midleware to fetch user
const fetchUser = async (req,res,next)=>{
  const token = req.header('token');
  if(!token){
    res.status(401).send({errors:'please authenticate using valide user'})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.user = {id:data.id};
      next();
    } catch (error) {
      res.status(401).send({errors:'please authentictae using a valide user'})
    }
  }
}

//creating endpoint for add to cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
  console.log('hello',req.body,req.user);
  
  try {
    const user = await User.findOne({ _id: req.user.id }); // Access user ID as req.user.id
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cartData[req.body.itemId] += 1; // Increment the item count in the cart
    
    await User.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData})
    console.log('User document saved successfully');
    res.json({ success: true, message: 'Item added to cart', cartData: user.cartData });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

});

//creating endpoint for remove cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
  console.log('hello',req.body,req.user);
  
  try {
    const user = await User.findOne({ _id: req.user.id }); // Access user ID as req.user.id
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
     if(user.cartData[req.body.itemId] > 0)
    user.cartData[req.body.itemId] -= 1; // Increment the item count in the cart
   
    await User.findOneAndUpdate({_id:req.user.id},{cartData:user.cartData})
    console.log('User document saved successfully');
    res.json({ success: true, message: 'Item remove from cart', cartData: user.cartData });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

});

//endpoint for getcartdata
app.post('/getcartdata', fetchUser, async (req, res) => {
  try {
    // Find the user by their _id (MongoDB's default primary key)
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user's cartData
    res.json({
      success: true,
      message: 'Cart data retrieved successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Running On ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});