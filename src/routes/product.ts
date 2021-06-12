import { Router } from 'express';
import { getAllProducts, getProduct, updateProductQuantityInStock } from '../controllers/product';

const router = Router();

router.get('/', getAllProducts);
router.get('/:p_id', getProduct);
router.patch('/:p_id/stock/:operation', updateProductQuantityInStock);

export default router;