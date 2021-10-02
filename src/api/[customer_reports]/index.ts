import { Router } from "express";
import auth from "../../utils/auth"

import customerReports from "./get/customer_reports";

const rRoom = Router();



/**
 * Getters
 */
rRoom.get('/customer-reports', customerReports);



export default rRoom;



