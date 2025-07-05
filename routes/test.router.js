import { Router } from 'express';

import { registerController } from '../controllers/auth.controller.js';
import { authenticateAccessToken } from '../middleware/authenticate.jwt.js';
import { createAccessToken } from '../utils/create.jwt.tokens.js';

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

export default router;
