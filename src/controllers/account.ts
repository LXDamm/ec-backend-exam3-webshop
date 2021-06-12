import express, { NextFunction, Request, Response } from 'express';
import passport from '../config/passport-config';
import admin from '../config/firebase-config';
import { Account } from '../types/account';

const db = admin.firestore();

export const getAccount = async (req: Request, res: Response) => {
    const id = req.params.id.trim();
    const doc = await db.collection('accounts').doc(id).get();
    if (!doc.exists) {
        res.send('No such document!');
    } else {
        res.json(doc.data());
    }
};

export const postAccountLogin = async (req: Request, res: Response) => {
    console.log("Login attempt");
    /*passport.authenticate('local', (err: Error, user: User) => {

    })(req, res, next);*/
};

export const updateAccountCart = async (req: Request, res: Response) => {
    const id = req.params.id;
    const docRef = db.collection('accounts').doc(id);
    if (docRef) {
        const result = await docRef.update({cart: {products: []}});
        console.log(result);
    }
    res.send('Has run');
};