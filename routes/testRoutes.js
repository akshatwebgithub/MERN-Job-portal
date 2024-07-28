import express from 'express';
import { testPostController } from '../controllers/testController.js';
import userAuth from '../middleWares/authMiddleware.js';

// Router object:-
const router = express.Router()

// Routes:-
router.post('/test-post',userAuth, testPostController)


// Exports:-
export default router;