import express from 'express';
import userRoutes from './routes/user';

const app = express();

app.use('/sinus_shop/user/', userRoutes);

app.get('/*', (req, res) => {
    res.send('Ah ah ah, you didn\'t say the magic word\n' + req.path);
});

app.listen(8080, () => {});