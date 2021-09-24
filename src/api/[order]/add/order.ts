import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import {body, inspectBuilder} from "../../../utils/inspect";
import order from "../get/order";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    body("totalAmount")
        .exists().withMessage("Total amount is required")
        .isNumeric().withMessage("Total amount should be a number"),
    body("tableNumber")
        .exists().withMessage("Table Number is required")
        .isNumeric().withMessage("Table Number should be a number"),
    body('branchId').exists().withMessage("Branch Id is required"),
    body('cartItems').exists().withMessage("Cart Items are required"),
)

const addOrder: Handler = async (req, res) => {
    const {r} = res;
    const orderId = UUID();
    const {totalAmount, tableNumber, branchId , cartItems } = req.body;
    let orderData = {
        orderId, totalAmount, tableNumber, branchId , cartItems,
        placedTime : new Date(), orderStatus : model.order.orderStatus.placed
    };

    if(req.user?.userId != null) { // @ts-ignore
        orderData = {...orderData, customerId : req.user.userId}
    }

    const [error, response] = await model.order.add_Order(orderId, orderData, cartItems );
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data({orderId})
        .message("Success")
        .send();
};

export default [<EHandler> addOrder];