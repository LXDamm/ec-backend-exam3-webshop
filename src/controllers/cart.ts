import { Request, Response } from 'express';
import admin from '../config/firebase-config';
import { Account, CartItem } from '../types/account';

const db = admin.firestore();

export const getCart = async (req: Request, res: Response) => {
    const accountId = req.params.a_id.trim();
    const doc = await db.collection('accounts').doc(accountId).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const cart = (doc.data() as Account).cart;
        res.json(cart);
    }
};

export const putProductInCart = async (req: Request, res: Response) => {
    const accountId = req.params.a_id.trim();
    const cartItem: CartItem = {
        id: req.params.p_id.trim(),
        quantity: req.params.quantity.trim() as unknown as number
    };
    const docRef = db.collection('accounts').doc(accountId);
    const doc = await docRef.get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const cart: Array<CartItem> = doc.data()?.cart;
        cart.push(cartItem);
        const result = await docRef.update({cart});
        res.send(result);
    }
};

export const removeProductInCart = async (req: Request, res: Response) => {
    const accountId = req.params.a_id.trim();
    const productId = req.params.p_id.trim();
    const docRef = db.collection('accounts').doc(accountId);
    const doc = await docRef.get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const cart: Array<CartItem> = doc.data()?.cart;
        const updatedCart = cart.filter((item) => item.id !== productId);
        const result = await docRef.update({cart: updatedCart});
        res.send(result);
    }
};

export const updateProductQuantityInCart = async (req: Request, res: Response) => {
    const accountId = req.params.a_id.trim();
    const productId = req.params.p_id.trim();
    const quantity: number = req.params.quantity.trim() as unknown as number;
    const docRef = db.collection('accounts').doc(accountId);
    const doc = await docRef.get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const cart: Array<CartItem> = doc.data()?.cart;
        let productIndex = cart.findIndex((item) => item.id === productId);
        cart[productIndex].quantity = quantity;
        const result = await docRef.update({cart});
        res.send(result);
    }
};