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

export default passport;
