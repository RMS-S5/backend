import {Router} from "express";
import auth from "../../utils/auth"

import getOrdersHandler from "./get/order";
const rOrder = Router();


/**
 * Getters
 */
rOrder.get('/active-orders', getOrdersHandler.getActiveOrders);
rOrder.get('/served-orders', getOrdersHandler.getAllServedOrders);

export default rOrder
