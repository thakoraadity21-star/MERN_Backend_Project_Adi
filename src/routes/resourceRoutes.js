import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
// Resource मॉडल को हटा दिया गया है क्योंकि यह वर्तमान में उपयोग में नहीं है।

const router = express.Router();

// रिसॉर्स डेटा
const sampleResources = [
    { id: 1, name: 'Secure Data Item 1' },
    { id: 2, name: 'Secure Data Item 2' },
    { id: 3, name: 'Secure Data Item 3' },
];

// @route   GET /api/resources
// @desc    सभी सुरक्षित रिसॉर्स प्राप्त करें
// @access  Private (JWT आवश्यक)
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

// ⚠️ ध्यान दें: यह सुनिश्चित करें कि आप export default का उपयोग कर रहे हैं!
export default router;