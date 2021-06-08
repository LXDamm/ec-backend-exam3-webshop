import mongoose from "mongoose";

interface Products {
    uuid: string;
    quantity: number;
}

interface ShoppingCart {
    products: Array<Products>;
}

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
    shoppingCart: ShoppingCart;
}

const userSchema = new mongoose.Schema<UserDocument>({
        email: {
            type: String,
            unique: true
        },
        password: String,

    }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
