
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Import routes
const messageRoutes = require('./routes/messageRoutes');
const statusRoutes = require('./routes/statusRoutes');




const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json()); // Enable JSON parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/messages', messageRoutes);
app.use('/status', statusRoutes);



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
