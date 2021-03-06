import { Router } from "express";
import auth from "../../utils/auth"

import getOrdersHandler from "./get/order";
import addOrder from "./add/order";
import updateOrder from "./update/order";
import { Handler } from "../../utils/types";

const rOrder = Router();

/**
 * Adders
 */
rOrder.post('/add-order', auth.authOrNoAuth, addOrder);

/**
 * Update
 */
rOrder.put('/order/:orderId', auth.staffMember, updateOrder.order);
rOrder.put('/orders-status', updateOrder.ordersStatus);


/**
 * Getters
 */
rOrder.get('/orders', auth.management, getOrdersHandler.getAllOrders);
rOrder.get('/active-orders', auth.staffMember, getOrdersHandler.getActiveOrders);
rOrder.get('/table-orders', getOrdersHandler.getTableOrders);
rOrder.get('/orders-monthly-completed', auth.management, getOrdersHandler.getMonthlyCompletedOrders);
rOrder.get('/get-order/:orderId', auth.staffMember, getOrdersHandler.getOrderById);



export default rOrder
