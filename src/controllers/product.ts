import { Request, Response } from 'express';
import admin from '../config/firebase-config';
import { Account, CartItem } from '../types/account';

const db = admin.firestore();

export const getProduct = async (req: Request, res: Response) => {
    const accountId = req.params.a_id.trim();
    const doc = await db.collection('accounts').doc(accountId).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        const cart = (doc.data() as Account).cart;
        res.json(cart);
    }
};