import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {inspectBuilder, param} from "../../../utils/inspect";
import {MErrorCode} from "../../../utils/dbMan/merror";


// const inspector = inspectBuilder(
// )

const getActiveOrders: Handler = async (req, res) => {
    const {r} = res;

    const [error, ordersData] = await model.order.get_AllActiveOrders();

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

    const [error, ordersData] = await model.order.get_AllOrders({orderStatus : model.order.orderStatus.served});
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
    getAllServedOrders : [ <EHandler>getAllServedOrders]
}
export default getOrdersHandler;