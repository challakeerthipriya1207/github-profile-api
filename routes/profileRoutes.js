const express = require('express');
const router = express.Router();
const { 
    fetchAndSaveProfile, 
    getAllProfiles, 
    getProfileByUsername 
} = require('../controllers/profileController');

// Defining specific routes  which maps directly to controller functions
router.get('/github/:username', fetchAndSaveProfile);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:username', getProfileByUsername);

module.exports = router;