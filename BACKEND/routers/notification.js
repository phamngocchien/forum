import express from 'express';
import { getNotification, handleReadNotify } from '../controllers/notification.js';
const router = express.Router();

router.get('/notification/:id', getNotification);
router.put('/handleNotify/:id', handleReadNotify);


export default router;