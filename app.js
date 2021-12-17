const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes'); 
const expresslayouts = require('express-ejs-layouts');
const passport = require('passport')

// Load config
dotenv.config({ path: './config/config.env' }) 

//connect to the Data Base
connectDB()

const app = express()

// Passport Config
require('./config/passport')(passport);

//static middleware
app.use(express.static('public'));
app.use(express.json());

// View engine
app.use(expresslayouts);
app.set('view engine', 'ejs');

//Bodyparser to get data from the form with req.body 
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

//Routes
app.get('/', (req, res) => res.render('signup'));
app.get('/login' , (req, res) => res.render('login'));
app.get('/dashboard' , (req, res ) => res.render('dashboard'))

app.use(authRoutes) ;





const PORT = process.env.PORT || 3000

app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` ))