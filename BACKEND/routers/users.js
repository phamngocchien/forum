import express from "express";
import { login } from "../controllers/auth.js";
import { createListUser, createUser, deleteUser, getQuantityOfUser, getUserFollow, getUsers, handleFollow, handleMark, searchUser, updateUser, userByID } from "../controllers/users.js";


const router = express.Router();

router.get('/users/quatity', getQuantityOfUser);
router.get('/users', getUsers);
router.get('/users/:id', userByID);
router.post('/users/create', createUser);
router.post('/users/createlist', createListUser);
router.post('/users/update/:id', updateUser);
router.delete('/users/delete/:id', deleteUser);
router.post('/users/search', searchUser);
router.post('/users/mark/:idPost', handleMark);
router.post('/users/follow/:id', handleFollow);
router.get('/users/follow/:id', getUserFollow);


router.post('/login', login);

export default router;