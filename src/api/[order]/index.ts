import {Router} from "express";
import auth from "../../utils/auth"

import getOrdersHandler from "./get/order";
import addOrder from "./add/order";
import updateOrder from "./update/order";
import { Handler } from "../../utils/types";

const rOrder = Router();

/**
 * Adders
 */
rOrder.post('/add-order',auth.authOrNoAuth, addOrder);

/**
 * Update
 */
 rOrder.put('/order/:orderId',auth.staffMember, updateOrder);


/**
 * Getters
 */
rOrder.get('/active-orders',auth.staffMember, getOrdersHandler.getActiveOrders);
// rOrder.get('/served-orders',auth.waiter, getOrdersHandler.getAllServedOrders);
rOrder.get('/table-order', getOrdersHandler.getTableOrder);
rOrder.get('/:orderId', auth.staffMember,getOrdersHandler.getOrderById);
rOrder.get('/orders-monthly-completed', <EHandler> (req, res, next):Handler =>{console.log(req.body);} ,getOrdersHandler.getMonthlyCompletedOrders);


export default rOrder
