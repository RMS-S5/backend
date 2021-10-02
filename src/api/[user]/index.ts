import { Router } from "express";
import auth from "../../utils/auth"

import userLogin from "./login/users"
import registerCustomer from "./register/register_customer";
import registerStaffMember from "./register/register_staff_member";
import get_details from "./get_details";
import getStaffMembers from "./get/staff_members";
import getAccountTypes from "./get/account_types"
import updateUser from "./update/details";
import updatePassword from "./update/password";
import deleteStaffMember from "./update/delete_staff_member";

const rUser = Router();

rUser.get('/details', auth.any, get_details)

/**
 * Login
 */
//All the relevant details are sent when login no need to fetch details again
rUser.post('/login/user', userLogin);

/**
 * Register
 */
rUser.post("/register/customer", registerCustomer)
rUser.post("/register/staff-member", registerStaffMember)

/**
 * Getters
 */
 rUser.get("/staff-members", getStaffMembers)
 rUser.get("/account-types", getAccountTypes)

/**
 * Update
 */
rUser.put('/update-user-profile', auth.any, updateUser.userProfile);
// Branch Manager or Manager can edit staff users -> branch managers can edit only his branch people
rUser.put('/update-staff-member/:userId', auth.management, updateUser.staffMember);

rUser.put('/update-password/:userId', auth.any, updatePassword.updatePasswordByUserId);

/**
 * Delete
 */
// Branch Manager -> Only his branch members
// Manager -> All staff members (Remove branch id if exists for manager in database)
rUser.delete('/remove-staff/:userId', auth.management, deleteStaffMember);

export default rUser
