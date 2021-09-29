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
    const orderId = req.params.orderId;
    const { price, orderStatus } = req.body;
    var tempData = { price, orderStatus };
    var orderData;
    if (req.user.accountType == model.user.accountTypes.waiter) {
        orderData = {...tempData, waiterId : req.user.userId}
    } else if (req.user.accountType == model.user.accountTypes.kitchenStaff) {
        orderData = {...tempData, kitchenStaffId : req.user.userId}
    }
    
    console.log(orderId);
    const [error, response] =
        await model.order.update_Order(orderId,
            orderData);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Not found")
            .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>updateOrder];

