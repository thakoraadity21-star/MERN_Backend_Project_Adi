import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
// 

const router = express.Router();

//
const sampleResources = [
    { id: 1, name: 'Secure Data Item 1' },
    { id: 2, name: 'Secure Data Item 2' },
    { id: 3, name: 'Secure Data Item 3' },
];

// 
// 
// 
router.get('/', protect, async (req, res) => {
    try {
        res.status(200).json({
            count: sampleResources.length,
            data: sampleResources,
            message: `Successfully fetched ${sampleResources.length} secure resources from the backend. User ID: ${req.user.id}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching resources' });
    }
});

// 
export default router;