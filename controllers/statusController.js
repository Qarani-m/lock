const { PPStatus, ExtStatus, MpesaStatus, WiseStatus } = require('../models/PPStatus');

const getManager = (type) => {

    console.log(type);
    switch (type) {
        case 'ext': return ExtStatus;
        case 'mpesa': return MpesaStatus;
        case 'wise': return WiseStatus;
        case 'paypal': return PPStatus;
        default: return PPStatus; // Default to PayPal
    }
};

exports.getAppStatus = async (req, res) => {
    try {
        const { type } = req.body || req.params;
        const manager = getManager(type);
        
        const status = await manager.getStatus();
        res.json(status);
    } catch (error) {
        console.error(`Error getting ${type} status:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.toggleAppStatus = async (req, res) => {
    try {
        const { type } = req.params;
        const manager = getManager(type);
        const updatedStatus = await manager.toggleAppStatus();
        res.json({ 
            message: `${type} app status updated`, 
            appStatus: updatedStatus 
        });
    } catch (error) {
        console.error(`Error toggling ${type} status:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.checkUserStatus = async (req, res) => {
    try {
        const { type } = req.params;
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const manager = getManager(type);
        const isActive = await manager.checkUserStatus(userId);
        res.json({ userId, isActive });
    } catch (error) {
        console.error(`Error checking ${type} user status:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateBlockedUsers = async (req, res) => {
    try {
        const { type } = req.params;
        const { userId, userEmail, action } = req.body;
        let updatedStatus;

        if (!userId || !userEmail) {
            return res.status(400).json({ error: 'User ID and User Email are required' });
        }

        const manager = getManager(type);

        if (action === 'add') {
            updatedStatus = await manager.addBlockedUser(userId, userEmail);
        } else if (action === 'remove') {
            updatedStatus = await manager.removeBlockedUser(userId);
        } else {
            return res.status(400).json({ error: 'Invalid action. Use "add" or "remove"' });
        }

        res.json({ 
            message: `${type} blocked users updated`, 
            appStatus: updatedStatus 
        });
    } catch (error) {
        console.error(`Error updating ${type} blocked users:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
