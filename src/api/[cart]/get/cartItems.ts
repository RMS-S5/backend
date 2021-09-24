import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {inspectBuilder, param} from "../../../utils/inspect";
import {MErrorCode} from "../../../utils/dbMan/merror";

const inspector = inspectBuilder(
    param("cartId").exists().withMessage("Cart id should not be empty")
)

const getAllCartItems: Handler = async (req, res) => {
    const {r} = res;
    const cartId = req.params.cartId;

    const [error, cartData] = await model.cart.get_AllCartItems({cartId});
    if (error.code !== MErr.NO_ERROR) {
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

export default [inspector, <EHandler>getAllCartItems];