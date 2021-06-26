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
            let product = doc.data() as Product;
            product.id = doc.id;
            products.push(product);
        });
        res.json(products);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId.trim();
    const doc = await db.collection('products').doc(productId).get();
    if (!doc.exists) {
        res.send('No such product ( )');
    } else {
        let product: Product = doc.data() as unknown as Product;
        res.json(product);
    }
};

export const getCategoryFilteredProducts = async (req: Request, res: Response) => {
    const category = req.params.category.trim();
    const docs = await db.collection('products').where('category', '==', category).get();
    if (docs.empty) {
        res.send('No products');
    } else {
        let products: Array<Product> = [];
        docs.forEach((doc) => {
            let product = doc.data() as Product;
            product.id = doc.id;
            products.push(product);
        });
        res.json(products);
    }
};

export const getProductQuantityInStock = async (req: Request, res: Response) => {
    const productId = req.params.productId.trim();
    const doc = await db.collection('products').doc(productId).get();
    if (!doc.exists) {
        res.send('No such product');
    } else {
        let product: Product = doc.data() as unknown as Product;
        res.json(product.stock);
    }
};

export const updateProductQuantityInStock = async (req: Request, res: Response) => {
    const productId = req.params.productId.trim();
    const operation = req.params.operation.trim();
    const docRef = db.collection('products').doc(productId);
    const doc = await docRef.get();
    if (!doc.exists) {
        res.send('No such product');
    } else {
        const product: Product = doc.data() as unknown as Product;
        if (operation === 'increment') {
            product.stock++;
        } else if (operation === 'deincrement') {
            if (product.stock > 0) product.stock--;
        } else {
            res.send('Malformed operation');
            return;
        }
        const result = await docRef.update(product);
        res.json(result);
    }
};