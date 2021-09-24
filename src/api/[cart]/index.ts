import {Router} from "express";
import auth from "../../utils/auth"

import getCartHandlers from "./get/cart";
import getCartItems from "./get/cartItems";
import addCart from "./add/cart";
import addCartItem from "./add/cart_item";
import removeCartItem from "./update/remove_cart_item";


const rCart = Router();

/**
 * Post
 */
rCart.post('/add-cart', addCart);
rCart.post('/add-cart-item', addCartItem);


/**
 * Getters
 */
rCart.get('/cart-data/:cartId', getCartHandlers.getCartByCartId);
rCart.get('/customer-cart/:customerId', getCartHandlers.getCartByCustomerId);
rCart.get('/cart-items/:cartId', getCartItems);

/**
 * Delete
 */
rCart.delete('/cart-item/:cartItemId', removeCartItem);

export default rCart;

