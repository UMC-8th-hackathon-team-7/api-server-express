import { Router } from 'express';

import { handleAddMatching, handlelistMatching } from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.post('/', authenticateAccessToken, handleAddMatching);
router.get('/', authenticateAccessToken, handlelistMatching);

export default router;
