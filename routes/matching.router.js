import { Router } from 'express';

import {
  getRelatedDisabledListController,
  handleAddMatching,
  handleDeleteMatching,
  handleGetMatchingDetail,
  handleModifyMatching,
  handleModifyStatus,
  handlelistMatching,
} from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.get('/connected-disabled-user', authenticateAccessToken, getRelatedDisabledListController);
router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', handlelistMatching);
router.get('/:matchingId', handleGetMatchingDetail);
router.delete('/:matchingId', authenticateAccessToken, handleDeleteMatching);
router.patch('/:matchingId/status', authenticateAccessToken, handleModifyStatus);
router.patch('/:matchingId', authenticateAccessToken, handleModifyMatching);

export default router;
