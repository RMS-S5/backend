import {Router} from "express";
import auth from "../../utils/auth"

import getCartHandlers from "./get/cart";
import addCart from "./add/cart";
import addCartItem from "./add/cart_item";


const rCart = Router();

/**
 * Post
 */
rCart.post('/add-cart', addCart);
rCart.post('/add-cart-item', addCartItem);



/**
 * Getters
 */
rCart.get('/cart-data/:cartId', getCartHandlers.getCart);
rCart.get('/cart-items/:cartId', getCartHandlers.getCartItems);


export default rCart;



