import { Request, Response } from 'express';
import admin from '../config/firebase-config';

const db = admin.firestore();

export const getAllProducts = async (req: Request, res: Response) => {
    const docs = await db.collection('products').get();
    if (docs.empty) {
        res.send('No products');
    } else {
        let products: Array<Product> = [];
        docs.forEach((doc) => {
            products.push(doc.data() as Product);
        });
        res.send(products);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const productId = req.params.p_id.trim();
    const doc = await db.collection('products').doc(productId).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const product: Product = doc.data() as unknown as Product;
        res.json(product);
    }
};
