import express from 'express';
import userAuth from '../middleWares/authMiddleware.js';
import { getUserController, updateUserController } from '../controllers/userController.js';


// Router Object:-
const router = express.Router()


// Routes
// GET  USER DATA  ||  POST
router.post('/getUser', userAuth, getUserController)

// UPDATE USER  ||  PUT 
router.put('/update-user', userAuth,updateUserController)


export default router