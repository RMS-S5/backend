import { Router } from "express";
import auth from "../../utils/auth";

import getTableHandler from "./get/table";
import getAvailabeRoomsHandler from "./get/allAvailableRooms";
import getAllBrachesCustomer from "./get/allBrachesCustomer";
const rBranch = Router();

/**
 * Getters
 */
rBranch.get(
  "/get-table-by-verification/:verificationCode",
  getTableHandler.getTableByVerificationCode
);
rBranch.get(
  "/get-available-rooms-by-branch/:branchId",
  getAvailabeRoomsHandler.getAvailabeRooms
);
rBranch.get("/get-all-branches-customer", getAllBrachesCustomer);
rBranch.get(
  "/branch-tables",
  auth.staffMember,
  getTableHandler.getBranchTables
);

export default rBranch;
