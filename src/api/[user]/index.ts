import {Router} from "express";
import auth from "../../utils/auth"

import userLogin from "./login/users"
import adminLogin from "./login/admin";
import registerCustomer from "./register/register_customer";
import password from "./update/password";
import details from "./update/details";
import get_details from "./get_details";
import reset_password from "./register/reset_password";
import send_reset_password from "./register/send_reset_pass";
import refresh from "./login/refresh";

const rUser = Router();

rUser.get('/details', auth.any, get_details)

// User Login
rUser.post('/login/user', userLogin)
// rUser.post('/login/admin', adminLogin)
// rUser.post("/refresh", refresh)

// Other
rUser.post("/register/customer", registerCustomer)

// rUser.put("/set-avatar/:userId*?", auth.any, avatar)
// rUser.put("/set-password/:userId*?", auth.any, password)
// rUser.put("/set-details/:userId*?", auth.any, details)

// rUser.post("/reset-password", reset_password)
// rUser.post("/send-reset-password", send_reset_password)

export default rUser
