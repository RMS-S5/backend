import { Router } from "express";
import auth from "../../utils/auth";

import userLogin from "./login/users";
import registerCustomer from "./register/register_customer";
import get_details from "./get_details";

import updateUser from "./update/details";
import updatePassword from "./update/password";
import deleteStaffMember from "./update/delete_staff_member";

import getCustomerDataByIdHandler from "./get/getUserById";

const rUser = Router();

rUser.get("/details", auth.any, get_details);

rUser.get(
  "/get-user-by-id/:customerId",
  getCustomerDataByIdHandler.getCustomerDataById
);

/**
 * Login
 */
//All the relevant details are sent when login no need to fetch details again
rUser.post("/login/user", userLogin);

/**
 * Register
 */
rUser.post("/register/customer", registerCustomer);

/**
 * Update
 */
rUser.put(
  "/update-user-profile/:userId",
  //auth.any,
  updateUser.userProfile
);
// Branch Manager or Manager can edit staff users -> branch managers can edit only his branch people
rUser.put(
  "/update-staff-member/:userId",
  auth.management,
  updateUser.staffMember
);

rUser.put(
  "/update-password/:userId",
  //auth.any,
  updatePassword.updatePasswordByUserId
);

/**
 * Delete
 */
// Branch Manager -> Only his branch members
// Manager -> All staff members (Remove branch id if exists for manager in database)
rUser.delete("/remove-staff/:userId", auth.management, deleteStaffMember);

export default rUser;
