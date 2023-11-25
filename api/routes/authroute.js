import express from 'express'
import { signIn, signup } from '../controllers/authCtrl.js';

const router = express.Router()

router.post('/signup',signup)
router.get('/signIn',signIn)

export default router;