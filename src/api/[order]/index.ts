import {Router} from "express";
import auth from "../../utils/auth"

import getOrdersHandler from "./get/order";
import addOrder from "./add/order";
import updateOrder from "./update/order";

const rOrder = Router();

/**
 * Adders
 */
rOrder.post('/add-order', addOrder);

/**
 * Update
 */
 rOrder.put('/order/:orderId', updateOrder);


/**
 * Getters
 */
rOrder.get('/active-orders',auth.staffMember, getOrdersHandler.getActiveOrders);
// rOrder.get('/served-orders',auth.waiter, getOrdersHandler.getAllServedOrders);
rOrder.get('/table-order', getOrdersHandler.getTableOrder);
rOrder.get('/:orderId', auth.staffMember,getOrdersHandler.getOrderById);


export default rOrder
