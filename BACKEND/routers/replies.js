import express from "express";
import { createReply, deleteReply, deleteReplyByPost, getReplies, getReplyByPost, getReplyByUserId, updateReply } from "../controllers/replies.js";

const router = express.Router();

router.get("/replies", getReplies)
router.get("/replies/:id", getReplyByPost)
router.get("/replies/user/:id", getReplyByUserId)


router.post("/replies/create", createReply)
router.post("/replies/update/:id", updateReply)
router.delete("/replies/delete/:id", deleteReply)
router.delete("/replies/delete/:id", deleteReply)
router.delete("/replies/deletebypost/:id", deleteReplyByPost)


export default router;
