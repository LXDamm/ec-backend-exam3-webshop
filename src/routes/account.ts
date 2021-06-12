import { Router } from 'express';
import { getAccount, postAccountLogin, updateAccountCart } from '../controllers/account';

const router = Router();

router.get('/:a_id', getAccount);
router.post('/login', postAccountLogin);

export default router;