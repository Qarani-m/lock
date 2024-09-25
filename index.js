const express = require('express');
const app = express();
const port = 3000;

// Simple GET request that returns true or false randomly
app.get('/status', (req, res) => {
    const randomBoolean = true; // Generates either true or false
    res.json({ status: randomBoolean });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
