import { Router } from 'express';

import { getDisabledTypesController, getUserIdByPhoneNumberController, loginController, registerController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get("/disabled-types", getDisabledTypesController);
router.get("/id-by-phone", getUserIdByPhoneNumberController);

export default router;
