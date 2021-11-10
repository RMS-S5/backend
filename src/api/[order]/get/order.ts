import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {MErrorCode} from "../../../utils/dbMan/merror";
import {inspectBuilder,query} from "../../../utils/inspect";
import table from "../../[branch]/add/table";

/**
 * Inspector
 */
const tableOrderInspector = inspectBuilder(
    query('tableNumber').exists().withMessage("Table Number is required"),
    query('branchId').exists().withMessage("Branch id is required"),

)

/**
 * 
 * @param req Get all active orders
 * @param res 
 * @returns 
 */
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

/**
 * Get Table order
 * @param req 
 * @param res 
 * @returns 
 */

const getTableOrders: Handler = async (req, res) => {
    const { r } = res;
    const { branchId, tableNumber } = req.query;
    const [error, ordersData] = await model.order.get_TableOrders({
        branchId,
        tableNumber
    });
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
 * Get monthly completed orders
 * @param req 
 * @param res 
 * @returns 
 */
const getMonthlyCompletedOrders: Handler = async (req, res) => {
    const {r} = res;

    let query = {}
    if (req.user.accountType === model.user.accountTypes.branchManager) {
        query = {...query, branchId: req.user.branchId, orderStatus: "Served"}
    }
    else{
        query = {...query, orderStatus: "Served"}
    }

    const [error, ordersData] = await model.order.get_MonthlyCompletedOrders(query);

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
 * 
 * @param req Get all orders
 * @param res 
 * @returns 
 */
const getAllOrders: Handler = async (req, res) => {
    const {r} = res;

    const [error, ordersData] = await model.order.get_Orders();

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
 * Export Handler
 */
const getOrdersHandler = {
    getActiveOrders : [<EHandler>getActiveOrders],
    // getAllServedOrders : [ <EHandler>getAllServedOrders],
    getOrderById : [ <EHandler>getOrderById],
    getTableOrders : [tableOrderInspector,  <EHandler>getTableOrders],
    getMonthlyCompletedOrders : [<EHandler>getMonthlyCompletedOrders],
    getAllOrders : [<EHandler>getAllOrders],
}
export default getOrdersHandler;