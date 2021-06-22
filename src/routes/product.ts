import { Router } from 'express';
import passport from '../config/passport-config';
import { getAllProducts, getCategoryFilteredProducts, getProduct, updateProductQuantityInStock } from '../controllers/product';

const router = Router();

router.get('/', getAllProducts);
router.get('/:category/', getCategoryFilteredProducts);
router.get('/:p_id', getProduct);
router.patch('/:p_id/stock/:operation', passport.authenticate('local', { failureRedirect: '/login' }), updateProductQuantityInStock);

export default router;