import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {MErrorCode} from "../../../utils/dbMan/merror";
import {inspectBuilder,query} from "../../../utils/inspect";


const tableOrderInspector = inspectBuilder(
    query('tableNumber').exists().withMessage("Table Number is required"),
    query('branchId').exists().withMessage("Branch id is required"),

)

const getActiveOrders: Handler = async (req, res) => {
    const {r} = res;

    const [error, ordersData] = await model.order.get_AllActiveOrders({branchId : req.user?.branchId});

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(ordersData)
        .message("Success")
        .send();
};

const getAllServedOrders: Handler = async (req, res) => {
    const {r} = res;

    const [error, ordersData] = await
        model.order.get_AllOrders({orderStatus : model.order.orderStatus.served,
        branchId : req.user?.branchId});
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(ordersData)
        .message("Success")
        .send();
};

/**
 * Table order
 * @param req 
 * @param res 
 * @returns 
 */

const getTableOrder: Handler = async (req, res) => {
    const {r} = res;
    const [error, ordersData] = await model.order.get_AllOrders(req.query);

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(ordersData)
        .message("Success")
        .send();
};

/**
 * Get Order By order Id
 * @param req
 * @param res
 */
const getOrderById: Handler = async (req, res) => {
    const {r} = res;
    const {orderId} = req.params;

    const [error, ordersData] = await model.order.get_OrderByOrderId(orderId);

    if (error.code === MErrorCode.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Order is not found")
            .send()
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(ordersData)
        .message("Success")
        .send();
};


/**
 * Export Handler
 */
const getOrdersHandler = {
    getActiveOrders : [<EHandler>getActiveOrders],
    getAllServedOrders : [ <EHandler>getAllServedOrders],
    getOrderById : [ <EHandler>getOrderById],
    getTableOrder : [tableOrderInspector,  <EHandler>getTableOrder]
}
export default getOrdersHandler;