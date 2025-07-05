import { Router } from 'express';

import { getRelatedDisabledListController, handleAddMatching } from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.get("/connected-disabled-user", authenticateAccessToken, getRelatedDisabledListController)
router.post('/', authenticateAccessToken, handleAddMatching);

export default router;
