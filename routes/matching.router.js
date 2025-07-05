import { Router } from 'express';

import { handleAddMatching, handlelistMatching, getRelatedDisabledListController } from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.get("/connected-disabled-user", authenticateAccessToken, getRelatedDisabledListController)
router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', authenticateAccessToken, handlelistMatching);

export default router;
