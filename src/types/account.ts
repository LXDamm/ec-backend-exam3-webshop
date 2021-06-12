interface CartItem {
    id: string;
    quantity: number;
}

interface Account {
    username: string;
    password: string;
    cart: Array<CartItem>;
}

export { CartItem, Account };