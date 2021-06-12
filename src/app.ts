import cors from 'cors';
import express from 'express';
import passport from './config/passport-config';

import accountRoutes from './routes/account';
import cartRoutes from './routes/cart';
import productRoutes from './routes/product';

const app = express();

app.use(express.json());
app.use(cors({
    origin: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/sinus_shop/account', accountRoutes);
app.use('/sinus_shop/account', cartRoutes);
app.use('/sinus_shop/products', productRoutes);

app.get('/*', (req, res) => {
    res.send('Ah ah ah, you didn\'t say the magic word\n' + req.path);
});

app.listen(8080, () => { });

export default app;