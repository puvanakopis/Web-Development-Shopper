const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://puvan:puvan1234@cluster0.tbk7w5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error:', err));



// Image storage config with multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });


app.use('/images', express.static('upload/images'));


// Test route
app.get("/", (req, res) => {
    res.send("Express app is running");
});


// Image upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});



// Product schema
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, required: true },
    available: { type: Boolean, required: true }
});





// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            date: new Date(),
            available: true,
        });

        await product.save();
        console.log('Product saved:', product);

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});




// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed:", req.body.id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});




// Get all products endpoint
app.get('/allproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All products fetched");
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// User schema
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let cart = {};
        for (let i = 0; i < 300; i++) cart[i] = 0;

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ success: false, errors: 'Invalid email' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, errors: 'Invalid password' });

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// New collection endpoint
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('New collection fetched');
    res.send(newcollection);
});

// Popular in women endpoint
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({});
    let popular = products.slice(0, 4);
    console.log('Popular in Women');
    res.send(popular);
});

// Middleware to fetch user from token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ errors: 'Please authenticate using a valid token' });

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: 'Invalid token' });
    }
};

// Add to cart endpoint
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Added');
});

// Remove from cart endpoint
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Removed');
});

// Get cart data endpoint
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Get Cart');
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server running on port ${port}`);
    } else {
        console.error('Server startup error:', error);
    }
});
