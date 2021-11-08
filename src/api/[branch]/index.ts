import { Router } from "express";
import auth from "../../utils/auth";

import getTableHandler from "./get/table";
import addBranch from "./add/branch";
import addTable from "./add/table";
import removeBranch from "./remove/branch";
import removeTable from "./remove/table";


const rBranch = Router();

/**
 * Post
 */
 rBranch.post('/add-branch', auth.manager, addBranch);
 rBranch.post('/add-table', auth.branchManager, addTable);

/**
 * Getters
 */
rBranch.get("/table-by-verification/:verificationCode", getTableHandler.getTableByVerificationCode)
rBranch.get("/branch-tables", auth.staffMember, getTableHandler.getBranchTables) //todo: include auth.branchManager
rBranch.get("/branches", auth.management, getTableHandler.getBranches)


/**
* Delete
*/
rBranch.put('/remove-branch/:branchId', auth.manager, removeBranch);
rBranch.put('/remove-table/:tableNumber', auth.branchManager, removeTable);

export default rBranch;
