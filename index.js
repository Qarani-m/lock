
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
app.use('/mpesa', statusRoutes);
app.use('/wise', statusRoutes);
app.use('/ext', statusRoutes);




app.all('transactions/deriv/mpesa/', (req, res) => {
  console.log('Request Details:');
  console.log('Method:', req.method);               // Logs the HTTP method (GET, POST, etc.)
  console.log('URL:', req.originalUrl);              // Logs the full requested URL
  console.log('Body:', req.body);                    // Logs the request body
  console.log('Headers:', req.headers);              // Logs the request headers
  console.log('Params:', req.params);                // Logs the request parameters
  console.log('Query:', req.query);                  // Logs the query string (if any)
  console.log('IP Address:', req.ip);                // Logs the IP address of the client
  console.log('User-Agent:', req.headers['user-agent']); // Logs the user-agent (browser or client type)

  // Send a response back
  res.send('Request logged successfully!');
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
