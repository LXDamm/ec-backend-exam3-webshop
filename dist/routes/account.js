import { Router } from 'express';
const router = Router();
router.get('/:id', (req, res) => {
    console.log("Get user");
    res.send(`ID: ${req.params.id}`);
});
export default router;
//# sourceMappingURL=account.js.map