import express from 'express'; //Express is used to create the routes


const router = express.Router();

router.get('/test',(req, res) => {
    res.json({
      message: 'Hello this is from router'
    });
  } ) 
export default router; 