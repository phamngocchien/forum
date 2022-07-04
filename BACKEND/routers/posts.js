import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  postByID,
  postByAdmin,
  postByStudentQuestion,
  postByStudentShare,
  postByTrending,
  postByShareNewest,
  postByUserId,
  postByQuestionNewest,
  findPosts,
  postByTag,
  postByJob,
  getPostsBookmark,
  updateAllPost,
  handleVotePost,
  addFieldView,
  handleView,
  postByTags,
  postByTitle,
  analyzePost,
  analyzePostPerMonth,
  handleIsFinish
} from '../controllers/posts.js';

const router = express.Router();

router.post('/posts/update/:id', updatePost);
router.get('/posts/analyze', analyzePost);
router.post('/posts/analyzepostpermonth', analyzePostPerMonth);
router.get('/posts', getPosts);
router.post('/posts/create', createPost);
router.get('/posts/postbystudent/question', postByStudentQuestion);
router.get('/posts/postbystudent/share', postByStudentShare);
router.get('/posts/postbyadmin', postByAdmin);
router.get('/posts/postbytrending', postByTrending);
router.get('/posts/postbynewest', postByShareNewest);
router.get('/posts/postbyjob', postByJob);
router.post('/posts/postbytitle', postByTitle);
router.get('/posts/postbyquestionnewest', postByQuestionNewest);
router.get('/posts/postbyuser/:idUser', postByUserId);
router.get('/posts/bookmark/:idUser', getPostsBookmark);
router.delete('/posts/delete/:id', deletePost);
router.get('/posts/:id', postByID);
router.post('/posts/find', findPosts);
router.post('/posts/postbytag', postByTag);
router.get('/posts/postbytags/:id', postByTags);
router.post('/posts/updateall', updateAllPost);
router.post('/posts/handlevotepost/:id', handleVotePost);
router.post('/posts/handleview/:id', handleView);
router.post('/posts/updateview', addFieldView);
router.post('/posts/handleisfinish/:id', handleIsFinish);


export default router;
