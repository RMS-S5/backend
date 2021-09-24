import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { param, inspectBuilder } from "../../../utils/inspect";
import cart from "../add/cart";

const inspector = inspectBuilder(
    param('cartItemId').exists().withMessage('Cart item id is required')
)

/**
 * Remove cart item
 */

const removeCartItem: Handler = async (req, res) => {
    const { r } = res;
    const { cartItemId } = req.params;

    const [error, response] = await model.cart.delete_CartItem(cartItemId);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Cart item not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .data('cartItemId')
        .message("Cart item removed successfully")
        .send();
    
}

export default [inspector,<EHandler> removeCartItem];