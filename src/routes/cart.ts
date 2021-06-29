import { Router } from 'express';
import passport from '../config/passport-config';
import { getCart, putProductInCart, removeProductInCart, updateProductQuantityInCart } from '../controllers/cart';

const router = Router();

router.get('/:a_id/cart', getCart);
router.put('/:a_id/cart/:p_id/quantity/:quantity', putProductInCart);
router.delete('/:a_id/cart/:p_id', removeProductInCart);
router.patch('/:a_id/cart/:p_id/quantity/:quantity', updateProductQuantityInCart);

export default router;