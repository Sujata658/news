import { Router } from 'express';

import Health from './Health';
import AuthRouter from './Auth';
import users from './Users';
import NewsRouter from './News';

const router = Router();

router.use('/health', Health);

router.use('/auth', AuthRouter)
router.use('/users', users)
router.use('/news', NewsRouter)

export default router;
