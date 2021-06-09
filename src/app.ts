import express from 'express';

import passport from './config/passport-config';
import accountRoutes from './routes/account';
import productRoutes from './routes/product';

const app = express();
const ps = passport;

app.use('/sinus_shop/account/', accountRoutes);
app.use('/sinus_shop/products/', productRoutes);

app.get('/*', (req, res) => {
    res.send('Ah ah ah, you didn\'t say the magic word\n' + req.path);
});

app.listen(8080, () => {});

export default app;