import express from "express";
import { createTag, deleteTag, getTags, tagByID, updateTag, SearchTag, getQuantityOfTag } from "../controllers/tags.js";

const router = express.Router();

router.get('/tags', getTags);
router.get('/tags/quantity', getQuantityOfTag);
router.post('/tags/create', createTag);
router.put('/tags/update/:id', updateTag);
router.delete('/tags/delete/:id', deleteTag);
router.get('/tags/:id', tagByID);
router.post('/tags/search', SearchTag);


export default router;