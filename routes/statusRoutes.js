const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Equity
// router.get('/', statusController.getAppStatus);
// router.post('/check_device', statusController.checkDevice);
// router.get('/allowed_devices', statusController.getAllowedDevices);

// Equity
router.get('/eq-status', statusController.getAppStatus);
router.post('/eq-user', statusController.checkUserStatus);
router.post('/eq-toggle-app', statusController.toggleAppStatus);
router.post('/eq-update-blocked-users', statusController.updateBlockedUsers);


// PayPal
router.get('/pp-status', statusController.getAppStatus);
router.post('/pp-user', statusController.checkUserStatus);
router.post('/pp-toggle-app', statusController.toggleAppStatus);
router.post('/pp-update-blocked-users', statusController.updateBlockedUsers);

// Extension
router.get('/ext-status', statusController.getAppStatus);
router.post('/ext-user', statusController.checkUserStatus);
router.post('/ext-toggle-app', statusController.toggleAppStatus);
router.post('/ext-update-blocked-users', statusController.updateBlockedUsers);

// Mpesa
router.get('/mpesa-status', statusController.getAppStatus);
router.post('/mpesa-user', statusController.checkUserStatus);
router.post('/mpesa-toggle-app', statusController.toggleAppStatus);
router.post('/mpesa-update-blocked-users', statusController.updateBlockedUsers);

// Wise
router.get('/wise-status', statusController.getAppStatus);
router.post('/wise-user', statusController.checkUserStatus);
router.post('/wise-toggle-app', statusController.toggleAppStatus);
router.post('/wise-update-blocked-users', statusController.updateBlockedUsers);

module.exports = router;
