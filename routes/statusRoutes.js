const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Equity
router.get('/', statusController.getStatus);
router.post('/check_device', statusController.checkDevice);
router.get('/allowed_devices', statusController.getAllowedDevices);


// Payapal
router.get('/pp-status', statusController.getAppStatus);
router.post('/pp-toggle-app', statusController.toggleAppStatus);
router.post('/pp-update-blocked-users', statusController.updateBlockedUsers);




// mpesa




// wise





module.exports = router;
