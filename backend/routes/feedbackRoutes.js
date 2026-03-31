import express from 'express';
import { 
  submitFeedback, 
  getAllFeedback, 
  getFeedbackById, 
  deleteFeedback 
} from '../controllers/feedbackController.js';

const router = express.Router();

// POST - Submit feedback
router.post('/', submitFeedback);

// GET - Get all feedback (admin)
router.get('/', getAllFeedback);

// GET - Get feedback by ID
router.get('/:id', getFeedbackById);

// DELETE - Delete feedback (admin)
router.delete('/:id', deleteFeedback);

export default router;
