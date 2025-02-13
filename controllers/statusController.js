const PPStatus = require('../models/PPStatus');


exports.getStatus = (req, res) => {
    const randomBoolean = true;
    res.json({ status: randomBoolean });
};

exports.checkDevice = (req, res) => {
    const { deviceId } = req.body;
    const allowedDeviceIds = ['TP1A.220624.014'];

    if (!deviceId) {
        return res.status(400).json({ error: 'Device ID is required' });
    }

    const isAllowed = allowedDeviceIds.includes(deviceId);
    res.json({ status: isAllowed });
};

exports.getAllowedDevices = (req, res) => {
    const allowedDeviceIds = ['TP1A.220624.014'];
    res.json({ devices: allowedDeviceIds });
};



// payapl
exports.getAppStatus = async (req, res) => {
    try {
        const status = await PPStatus.getStatus();
        res.json(status);
    } catch (error) {
        console.error('Error getting PP status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.toggleAppStatus = async (req, res) => {
    try {
        const updatedStatus = await PPStatus.toggleAppStatus();
        res.json({ 
            message: 'App status updated', 
            appStatus: updatedStatus 
        });
    } catch (error) {
        console.error('Error toggling PP status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.updateBlockedUsers = async (req, res) => {
    try {
        const { userId, userEmail, action } = req.body;
        let updatedStatus;

        if (!userId || !userEmail) {
            return res.status(400).json({ error: 'User ID and User Email are required' });
        }

        if (action === 'add') {
            updatedStatus = await PPStatus.addBlockedUser(userId, userEmail);
        } else if (action === 'remove') {
            updatedStatus = await PPStatus.removeBlockedUser(userId);
        } else {
            return res.status(400).json({ error: 'Invalid action. Use "add" or "remove"' });
        }

        res.json({ 
            message: 'Blocked users updated', 
            appStatus: updatedStatus 
        });
    } catch (error) {
        console.error('Error updating blocked users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
