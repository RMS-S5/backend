import {Router} from "express";
import auth from "../../utils/auth";

import getTableHandler from "./get/table";



const rBranch = Router();

/**
 * Getters
 */
rBranch.get("/get-table-by-verification/:verificationCode", getTableHandler.getTableByVerificationCode)



export default rBranch;

