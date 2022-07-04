import express from "express";
import { createDocumentType, deleteDocType, DocTypeByID, getDocumentType, updateDocumentType, searchDocType } from "../controllers/document-type.js";

const router = express.Router();

router.get('/document-type', getDocumentType);
router.post('/document-type/create', createDocumentType);
router.get('/document-type/:id', DocTypeByID);
router.put('/document-type/:id', updateDocumentType);
router.delete('/document-type/:id', deleteDocType);
router.post('/document-type/search', searchDocType);


export default router;