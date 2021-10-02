import {Router} from "express";
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
 rBranch.post('/add-branch', addBranch);
 rBranch.post('/add-table', addTable);

/**
 * Getters
 */
rBranch.get("/table-by-verification/:verificationCode", getTableHandler.getTableByVerificationCode)
rBranch.get("/branch-tables", auth.staffMember,getTableHandler.getBranchTables)
rBranch.get("/branches", getTableHandler.getBranches)


/**
* Delete
*/
rBranch.put('/remove-room/:roomNumber', removeBranch);
rBranch.put('/remove-room-type/:roomType', removeTable);

export default rBranch;

