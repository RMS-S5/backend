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
        .exists({checkNull: true}).withMessage("Total amount is required")
        .isNumeric().withMessage("Total amount should be a number"),
    body("tableNumber")
        .exists({checkNull: true}).withMessage("Table Number is required")
        .isNumeric().withMessage("Table Number should be a number"),
    body('branchId').exists({checkNull: true}).withMessage("Branch Id is required")
        .isString().withMessage("Branch Id should not be empty."),
    body('cartItems').exists({checkNull: true}).withMessage("Cart Items are required"),
)

const addOrder: Handler = async (req, res) => {
    const {r} = res;
    const orderId = UUID();
    const { totalAmount, tableNumber, branchId, cartItems } = req.body;
    let orderData = {
        orderId, totalAmount, tableNumber, branchId ,
        placedTime : new Date(), orderStatus : model.order.orderStatus.placed
    };

    if(req.user?.userId != null) { // @ts-ignore
        orderData = {...orderData, customerId : req.user.userId}
    }

    const [error, response] = await model.order.add_Order(orderId, orderData, cartItems );
    if (error.code === MErr.FOREIGN_KEY) {
        if (error.constraint == 'fk_o_tn_bi_constraint') {
            r.status.BAD_REQ()
        .message("Table not verified")
                .send();
            return;
        }
        r.status.BAD_REQ()
        .message("Bad request!")
        .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data({orderId})
        .message("Success")
        .send();
};

export default [inspector,<EHandler> addOrder];