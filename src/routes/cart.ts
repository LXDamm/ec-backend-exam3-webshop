import { Router } from 'express';
import passport from '../config/passport-config';
import { getCart, putProductInCart, removeProductInCart, updateProductQuantityInCart } from '../controllers/cart';

const router = Router();

router.get('/:a_id/cart', passport.authenticate('local', { failureRedirect: '/login' }), getCart);
router.put('/:a_id/cart/:p_id/quantity/:quantity', passport.authenticate('local', { failureRedirect: '/login' }), putProductInCart);
router.delete('/:a_id/cart/:p_id', passport.authenticate('local', { failureRedirect: '/login' }), removeProductInCart);
router.patch('/:a_id/cart/:p_id/quantity/:quantity', passport.authenticate('local', { failureRedirect: '/login' }), updateProductQuantityInCart);

export default router;