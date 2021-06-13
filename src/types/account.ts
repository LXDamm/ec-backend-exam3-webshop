interface Address {
    street: string;
    postcode: string;
    town: string;
}

interface CartItem {
    id: string;
    quantity: number;
}

interface Account {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    address: Address;
    cart: Array<CartItem>;
}

export { CartItem, Account };