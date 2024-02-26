import express from 'express';
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { google, signin, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup",signup);

router.post("/signin",signin);

router.post("/google",google);


export default router;