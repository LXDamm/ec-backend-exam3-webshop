import { Request, Response } from 'express';
import admin from '../config/firebase-config';

const db = admin.firestore();

export const getAccount = async (req: Request, res: Response) => {
    const id = req.params.a_id.trim();
    const doc = await db.collection('accounts').doc(id).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        res.json(doc.data());
    }
};

export const postAccountLogin = async (req: Request, res: Response) => {
    res.json({message: 'Success'});
};

export const postAccountSignup = async (req: Request, res: Response) => {
    res.json({message: 'Success'});
};