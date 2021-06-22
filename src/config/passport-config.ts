import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import admin from '../config/firebase-config';
import { Account } from '../types/account';

const db = admin.firestore();


passport.use('login', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) => {
    try {
        const passwordSnapshot = await db.collection('accounts').where('username', '==', username).limit(1).select('password').get();
        const localPassword: string = passwordSnapshot.docs[0].get('password');
        if (localPassword.match(password)) {
            const accountSnapshot = await db.collection('accounts').where('username', '==', username).limit(1).get();
            const account: Account = accountSnapshot.docs[0].data() as unknown as Account;
            return done(null, account);
        }
    } catch (error) {
        done(error);
    }
}));

export default passport;
