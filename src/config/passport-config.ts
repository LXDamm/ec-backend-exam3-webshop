import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import admin from '../config/firebase-config';
import { Account } from '../types/account';

const db = admin.firestore();

passport.serializeUser<any, any>((req, account, done) => {
    return done(undefined, account);
});

passport.deserializeUser(async (id: string, done) => {
    const doc = await db.collection('accounts').doc(id).get();
    if (!doc.exists) {
        console.log("Document does not exist");
    } else {
        return done(undefined, doc.data() as Account)
    }
});

const Strategy = passportLocal.Strategy;

passport.use(new Strategy({ usernameField: "username" }, async (username, password, done) => {
    const query = await db.collection('accounts').where('username', '==', username).limit(1).get();
    if (!(query.docs[0].data() as Account).password.match(password)) {
        console.log("Password does not match");
        return done(undefined, false);
    } else {
        console.log("Password match");
        return done(undefined, true);
    }
}));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

export default passport;