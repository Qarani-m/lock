const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
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

        const savedMessage = await Message.save(newMessage);
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.readAll();
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
