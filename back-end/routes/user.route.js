import express from 'express'; //Express is used to create the routes
import { test } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/test',test) 


export default router; 