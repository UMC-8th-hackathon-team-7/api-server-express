import { Router } from 'express';

import { handleAddMatching, handlelistMatching, handleGetMatchingDetail } from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', authenticateAccessToken, handlelistMatching);
router.get('/:matchingId', handleGetMatchingDetail);

export default router;
