import { Router } from 'express';
import passport from '../config/passport-config';
import { getAllProducts, getCategoryFilteredProducts, getProduct, getProductQuantityInStock, updateProductQuantityInStock } from '../controllers/product';

const router = Router();

router.patch('/product/:productId/stock/:operation', passport.authenticate('local', { failureRedirect: '/login' }), updateProductQuantityInStock);
router.get('/:productId/stock', getProductQuantityInStock);
router.get('/product/:productId', getProduct);
router.get('/:category/', getCategoryFilteredProducts);
router.get('/', getAllProducts);

export default router;