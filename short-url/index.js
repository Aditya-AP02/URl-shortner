const express = require("express");
const path = require('path');
const session = require('express-session');
const { connectToMongoDB } = require("./connect");
const { handleRedirect } = require("./controller/url");

const app = express();
const PORT = 8002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'short-url-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Static Files
app.use(express.static(path.resolve("./public")));

// Routes
app.use('/user', require('./routes/user'));
app.use('/url', require('./routes/url'));
app.use('/', require('./routes/staticRouter'));

// Redirect Route
app.get('/:shortId', handleRedirect);

// MongoDB Connection
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => {
    console.log('MongoDB connected 🫡');
    app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} 🚀`));
  })
  .catch(err => console.error('MongoDB error:', err));
