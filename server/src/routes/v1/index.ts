import { Router } from 'express';

import Health from './Health';
import AuthRouter from './Auth';
import users from './Users';
import NewsRouter from './News';
import PreferencesRouter from './Preferences';
import ConfigRouter from './Config';

const router = Router();

router.use('/health', Health);

router.use('/auth', AuthRouter)
router.use('/users', users)
router.use('/news', NewsRouter)
router.use('/preferences', PreferencesRouter)
router.use('/config', ConfigRouter)

export default router;
