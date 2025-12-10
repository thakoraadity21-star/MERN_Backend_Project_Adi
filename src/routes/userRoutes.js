import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
//

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
    // अगर protect middleware पास हो जाता है, तो यूजर एक्सेस कर सकता है
    try {
        // यहाँ हम MongoDB से डेटा Fetch कर सकते थे, लेकिन सादगी के लिए Sample Data भेज रहे हैं
        // const resources = await Resource.find({ user: req.user.id });
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

export default router;