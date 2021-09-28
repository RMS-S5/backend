import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, inspectBuilder , param} from "../../../utils/inspect";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    param('orderId').exists().withMessage("Food item id is required"),
    body("price")
        .optional()
        .isNumeric().withMessage("Total amount should be a number"),
    body('orderStatus').optional(),
);

const updateOrder: Handler = async (req, res) => {
    const { r } = res;
    const orderId = req.params.foodItemId;
    const { price, orderStatus } = req.body;
    const orderData =  { price, orderStatus };
    
    const [error, response] =
        await model.order.update_Order(orderId,orderData );
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>updateOrder];

