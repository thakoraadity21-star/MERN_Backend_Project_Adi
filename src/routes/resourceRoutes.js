const express = require('express');
const router = express.Router();

const { 
    getResources,
    createResource,
    updateResource,
    deleteResource,
    getResource,
} = require('../controllers/ResourceController'); // <--- यहाँ C छोटा किया गया है

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