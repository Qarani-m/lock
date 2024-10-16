const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Paths for the messages and apps JSON files
const messagesFile = path.join(__dirname, 'messages.json');
const appsFile = path.join(__dirname, 'apps.json');

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow only Content-Type header
};

app.use(cors(corsOptions));
app.use(express.json());

// Helper function to read messages from file
async function readMessages() {
    try {
        const data = await fs.readFile(messagesFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return an empty array
            return [];
        }
        throw error;
    }
}

// Helper function to write messages to file
async function writeMessages(messages) {
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
}

// Helper function to read apps from file
async function readApps() {
    try {
        const data = await fs.readFile(appsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return an empty array
            return [];
        }
        throw error;
    }
}

// API to return status
app.get('/status', (req, res) => {
    const randomBoolean = true; // Generates either true or false
    res.json({ status: randomBoolean });
});

const allowedDeviceIds = ['TP1A.220624.014']; // Allowed device IDs

// API to check if a device is allowed
app.post('/check_device', (req, res) => {
    const { deviceId } = req.body;

    if (!deviceId) {
        return res.status(400).json({ error: 'Device ID is required' });
    }

    const isAllowed = allowedDeviceIds.includes(deviceId);
    res.json({ status: isAllowed });
});

// API to get all allowed devices
app.get('/allowed_devices', (req, res) => {
    res.json({ devices: allowedDeviceIds });
});

// POST endpoint to send a message
app.post('/api/messages', async (req, res) => {
    console.log("new message");
    try {
        const { message, time, date, bt, type } = req.body;

        if (!message || !time || !date || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMessage = {
            message,
            time,
            date,
            bt: bt || 'false',
            type
        };

        const messages = await readMessages();
        messages.push(newMessage);
        await writeMessages(messages);

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to retrieve all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await readMessages();
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API to read and return apps JSON data
app.get('/api/apps', async (req, res) => {
    try {
        const apps = await readApps();
        res.json(apps);
    } catch (error) {
        console.error('Error retrieving apps:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
