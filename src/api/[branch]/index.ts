import { Router } from "express";
import auth from "../../utils/auth";

import getTableHandler from "./get/table";

import getAllBrachesCustomer from "./get/allBrachesCustomer";
const rBranch = Router();

/**
 * Getters
 */
rBranch.get(
  "/get-table-by-verification/:verificationCode",
  getTableHandler.getTableByVerificationCode
);
rBranch.get("/get-all-branches-customer", getAllBrachesCustomer);

export default rBranch;
