import {Router} from "express";
import auth from "../../utils/auth";

import getTableHandler from "./get/table";



const rBranch = Router();

/**
 * Getters
 */
rBranch.get("/table-by-verification/:verificationCode", getTableHandler.getTableByVerificationCode)
rBranch.get("/branch-tables", auth.staffMember,getTableHandler.getBranchTables)



export default rBranch;

