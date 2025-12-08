const express = require('express');
const router = express.Router();
//simple resources str....
const { 
    getResources,
    createResource,
    updateResource,
    deleteResource,
    getResource,
} = require('../Controllers/ResourceController');

const { protect } = require('../middleware/AuthMiddleware');

//base rout for post man 

router.route('/')
    .get(protect, getResources)
    .post(protect, createResource);
//what show in last 

router.route('/:id')
    .get(protect, getResource)
    .put(protect, updateResource)
    .delete(protect, deleteResource);

module.exports = router;