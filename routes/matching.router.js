import { Router } from 'express';

import {
  getRelatedDisabledListController,
  handleAddMatching,
  handleDeleteMatching,
  handleModifyStatus,
  handlelistMatching,
} from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.get('/connected-disabled-user', authenticateAccessToken, getRelatedDisabledListController);
router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', authenticateAccessToken, handlelistMatching);
router.delete('/:matchingId', authenticateAccessToken, handleDeleteMatching);
router.patch('/:matchingId/status', authenticateAccessToken, handleModifyStatus);

export default router;
