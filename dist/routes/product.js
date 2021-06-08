import { Router } from 'express';
const router = Router();
router.get('/:id', (req, res) => {
    console.log("Get product");
    res.send(`ID: ${req.params.id}`);
});
export default router;
//# sourceMappingURL=product.js.map