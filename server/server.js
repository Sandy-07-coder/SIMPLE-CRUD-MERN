require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// routes
const userRoute = require('./routes/user.route');

const port = process.env.PORT || 3000;

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes

app.use('/', (req, res, next) => {
    console.log("Request type:", req.method);
    next();
});

app.use('/', userRoute);


app.listen(port, () => {
    console.log(`simple-backend-server listening on port ${port}`);
});

