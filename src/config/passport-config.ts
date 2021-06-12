import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import admin from '../config/firebase-config';
import { Account } from '../types/account';

const db = admin.firestore();

passport.use('signup', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
    try {
        const account: Account = {
            username, password, cart: []
        }
        const result = await db.collection('accounts').add(account);
        return done(null, account);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
    try {
        const passwordSnapshot = await db.collection('accounts').where('username', '==', username).limit(1).select('password').get();
        const localPassword: string = passwordSnapshot.docs[0].data().password;
        if (localPassword.match(password)) {
            const accountSnapshot = await db.collection('accounts').where('username', '==', username).limit(1).get();
            const account: Account = accountSnapshot.docs[0].data() as unknown as Account;
            return done(null, account);
        }
    } catch (error) {
        done(error);
    }
}));

passport.use('account', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
    try {
        const snapshot = await db.collection('accounts').where('username', '==', username).limit(1).get();
        const account = snapshot.docs[0].data();
        return done(null, account);
    } catch (error) {
        done(error);
    }
}));

export default passport;
