import { Router } from 'express';

import { registerController } from '../controllers/auth.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';
import { createAccessToken } from '../utils/create.jwt.tokens.js';
import { getAuthorAndAssistedUserIdForSocket } from '../services/matching.service.js';

const router = Router();

router.get('/test', registerController);
router.get('/short-access-token', (req, res) => {
  res.status(200).json({
    token: createAccessToken({ userId: req.body.userId }),
  });
});
router.get('/get-user-info', authenticateAccessToken, (req, res) => {
  return res.status(200).success({
    user: req.user,
  });
});
router.get('/get-matching-info', async (req, res) => {
  const matchingInfo = await getAuthorAndAssistedUserIdForSocket(req.query.matchingId);
  if (!matchingInfo) {
    return res.status(404).json({ error: 'Matching not found' });
  }
  return res.status(200).json(matchingInfo);
});

export default router;
