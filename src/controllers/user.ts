import express from 'express';
import admin from '../config/firebase-config';
import { User } from '../types/user';

const db = admin.firestore();

export const getUser = async (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
        console.log('No such document!');
        response.send('No such document!');
    } else {
        console.log('Document data:', doc.data());
        response.send('Document data: ' + doc.data());
    }
}