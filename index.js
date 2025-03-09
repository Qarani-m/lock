
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





// Middleware to parse the request body as JSON
app.use(express.json());

// Endpoint: /users/login
app.post('/users/login', (req, res) => {
  const user = {
    name: "Martin Muthoni",
    depositRate: 134.09,
    withdrawRate: 124.38,
    cr: "CR7114405",
    mt5Account: null,
    phoneNumber: "254704847676",
    paymentProviders: {
      mobilePaymentProviders: [
        {
          providerName: "mpesa",
          phoneNumber: "254704847676"
        }
      ],
      bankPaymentProviders: []
    },
    defaultDepositProvider: "mpesa",
    defaultWithdrawProvider: "mpesa",
    token: "eyJhbGciOiJIUzI1NiJ9.ZW1xYXJhbmlAZ21haWwuY29tLCBNYXJ0aW4gTXV0aG9uaSwyMDI1MDMwOTE3NTEwMw.ECPvhxbCu7VZD6QMGduS_pRDlxJktEex793WRluAHIY"
  };

  res.json(user);
});

// Endpoint: /users/transactions
app.get('/users/transactions', (req, res) => {
  const transactions = [
    {
      _id: "6662e305a8cea390d10ed799",
      clientEmail: "emqarani@gmail.com",
      action: "Deposit",
      date: "20240607133756",
      mpesaId: "SF71PH9FRD",
      derivId: "119848297161",
      amount: 5.09,
      ksh: 700,
      __v: 0
    }
  ];

  res.json({ transactions });
});

// Endpoint: /users/brokers/deriv/balance-rate
app.get('/users/brokers/deriv/balance-rate', (req, res) => {
  const balanceRate = {
    derivBalance: 0.02,
    mt5Balance: 0,
    depositRate: 1.09,
    withdrawRate: 124.38
  };

  res.json(balanceRate);
});

 app.all('*', (req, res) => {
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
