import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {inspectBuilder, param} from "../../../utils/inspect";
import {MErrorCode} from "../../../utils/dbMan/merror";


const cartIdInspector = inspectBuilder(
    param("cartId").exists().withMessage("Cart id should not be empty")
)
const customerIdInspector = inspectBuilder(
    param("customerId").exists().withMessage("Customer id should not be empty")
)

const getCartByCartId: Handler = async (req, res) => {
    const {r} = res;
    const cartId = req.params.cartId;

    const [error, cartData] = await model.cart.get_Cart({cartId});
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Cart not found")
            .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(cartData)
        .message("Success")
        .send();
};

const getCartByCustomerId: Handler = async (req, res) => {
    const {r} = res;
    const customerId = req.params.customerId;

    const [error, cartData] = await model.cart.get_Cart({customerId});
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Cart not found")
            .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(cartData)
        .message("Success")
        .send();
};


/**
 * Export Handler
 */
const getCartHandlers = {
    getCartByCartId : [cartIdInspector, <EHandler> getCartByCartId],
    getCartByCustomerId : [customerIdInspector, <EHandler> getCartByCustomerId],
}
export default getCartHandlers;
