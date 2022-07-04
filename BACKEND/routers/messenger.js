import express from "express";
import { createMessage, createReplyInMessage, getListMessage, getMessageById, getMessageGroup } from "../controllers/messenger.js";

const router = express.Router();

router.post('/messenger', createMessage);
// router.post('/messenger/createreply/:id', createReplyInMessage);

router.get('/messenger/:id', getListMessage);
router.get('/messengerbyid/:id', getMessageById);


export default router;