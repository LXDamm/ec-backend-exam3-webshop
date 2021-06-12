import { Router } from 'express';
import { getAllProducts, getProduct } from '../controllers/product';

const router = Router();

router.get('/', getAllProducts);
router.get('/:p_id', getProduct);

export default router;