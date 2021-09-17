import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import {body, inspectBuilder} from "../../../utils/inspect";

/**
 * Validate Request
 */
const inspector = inspectBuilder(
    body("foodItemId").exists().withMessage("Food item id is required"),
    body("variantId").exists().withMessage("Variant id is required"),
    body("price").exists().withMessage("Price is is required")
        .isNumeric().withMessage("Price should be a number"),
    body("quantity").exists().withMessage("Quantity is is required")
        .isNumeric().withMessage("Quantity should be a number"),
    body("cartId").exists().withMessage("Cart id is required"),
)

const addCartItem: Handler = async (req, res) => {
    const {r} = res;
    const cartItemId = UUID();

    const cartItemData  = {
        cartItemId,
        foodItemId : req.body.foodItemId,
        variantId : req.body.variantId,
        price : req.body.price,
        cartId : req.body.cartId,
        quantity : req.body.quantity
    };

    const [error, response] = await model.cart.add_CartItem(cartItemData);
    if (error.code == MErr.DUPLICATE_ENTRY) {
        r.status.ERROR()
            .message("Duplicate entry")
            .send()
        return;
    }else if (error.constraint == 'fk_ci_cart_id_constraint') {
        r.status.ERROR()
            .message("No cart id found")
            .send()
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .data({cartItemId})
        .message("Success")
        .send();
};

export default [inspector,<EHandler> addCartItem];