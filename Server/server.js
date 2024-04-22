//server connection
const express = require('express');
const connectDB = require('./configuration/config');
const bakeryRoutes = require('./routes/bakeryRoutes');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();


// Connection to MongoDB
connectDB();
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001',`http://127.0.0.1` ,'http://127.0.0.1:1430'],
}));
app.use(bodyParser.json()); // Body-parser middleware for parsing JSON requests
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/bakery', bakeryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
