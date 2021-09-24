import {Router} from "express";
import auth from "../../utils/auth"

import getOrdersHandler from "./get/order";
import addOrder from "./add/order";

const rOrder = Router();

/**
 * Adders
 */
rOrder.post('/add-order', addOrder);

/**
 * Getters
 */
rOrder.get('/active-orders',auth.staffMember, getOrdersHandler.getActiveOrders);
rOrder.get('/served-orders',auth.staffMember, getOrdersHandler.getAllServedOrders);
rOrder.get('/table-order', getOrdersHandler.getTableOrder);
rOrder.get('/:orderId', auth.staffMember,getOrdersHandler.getOrderById);


export default rOrder
