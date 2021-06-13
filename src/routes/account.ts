import { Router } from 'express';
import passport from '../config/passport-config';
import { getAccount, postAccountLogin } from '../controllers/account';

const router = Router();

router.get('/:id', getAccount);
router.post('/login', passport.authenticate('login', { session: false }), postAccountLogin);
//router.post('/signup', passport.authenticate('signup', { session: false }), postAccountSignup);

export default router;