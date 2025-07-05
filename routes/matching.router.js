import { Router } from 'express';

import {
  getRelatedDisabledListController,
  handleAddMatching,
  handleDeleteMatching,
  handlelistMatching,
  handleGetMatchingDetail,
} from '../controllers/matching.controller.js';

import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.get('/connected-disabled-user', authenticateAccessToken, getRelatedDisabledListController);
router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', authenticateAccessToken, handlelistMatching);
router.get('/:matchingId', handleGetMatchingDetail);
router.delete('/:matchingId', authenticateAccessToken, handleDeleteMatching);

export default router;
