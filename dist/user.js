import { Model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const User = new Schema({
    username: String,
    password: String
});
User.plugin(passportLocalMongoose);
const userModel = new Model(User);
export { userModel };
//# sourceMappingURL=user.js.map