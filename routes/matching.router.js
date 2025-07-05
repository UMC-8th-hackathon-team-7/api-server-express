import { Router } from 'express';

import { handleAddMatching } from '../controllers/matching.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';

const router = Router();

router.post('/', authenticateAccessToken, handleAddMatching);

export default router;
