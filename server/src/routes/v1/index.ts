import { Router } from 'express';

import Health from './Health';
import AuthRouter from './Auth';
import users from './Users';

const router = Router();
router.use('/health', Health);

router.use('/auth', AuthRouter)
router.use('/users', users)

export default router;
