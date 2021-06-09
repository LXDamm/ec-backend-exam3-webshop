import express from 'express';
import admin from '../config/firebase-config';
import { User } from '../types/user';

const db = admin.firestore();

export const getUser = async (request: express.Request, response: express.Response) => {
    const id = request.params.id.trim();
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
        response.send('No such document!');
    } else {
        response.json(doc.data());
    }
}