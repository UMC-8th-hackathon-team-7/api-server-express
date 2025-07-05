import { Router } from 'express';

import { getDisabledTypesController, loginController, registerController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get("/disabled-types", getDisabledTypesController);

export default router;
