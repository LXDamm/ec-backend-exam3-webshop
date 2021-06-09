import passport from 'passport';
import passportLocal from 'passport-local';
import admin from '../config/firebase-config';
import { User } from '../types/user';

const db = admin.firestore();

passport.serializeUser<any, any>((req, user, done) => {
    return done(undefined, user);
});

passport.deserializeUser(async (id: string, done) => {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
        console.log("Document does not exist");
    } else {
        return done(undefined, doc.data() as User)
    }
});

const Strategy = passportLocal.Strategy;

passport.use(new Strategy({ usernameField: "username" }, async (username, password, done) => {
    const query = await db.collection('users').where('username', '==', username).limit(1).get();
    if (!(query.docs[0].data() as User).password.match(password)) {
        console.log("Password does not match");
        return done(undefined, false);
    } else {
        console.log("Password match");
        return done(undefined, true);
    }
}));

export default passport;