import {Router} from "express";
import auth from "../../utils/auth"

import userLogin from "./login/users"
import registerCustomer from "./register/register_customer";
import get_details from "./get_details";
import updateUser from "./update/details";
import updatePassword from "./update/password";

const rUser = Router();

rUser.get('/details', auth.any, get_details)

// User Login
rUser.post('/login/user', userLogin)

// Other
rUser.post("/register/customer", registerCustomer)

// Update
rUser.put('/update-user-profile', auth.any, updateUser.userProfile);
rUser.put('/update-staff-member', auth.management, updateUser.staffMember);
rUser.put('/update-password:userId', auth.any, updatePassword.updatePasswordByUserId);

export default rUser
