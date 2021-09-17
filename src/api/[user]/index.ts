import {Router} from "express";
import auth from "../../utils/auth"

import userLogin from "./login/users"
import registerCustomer from "./register/register_customer";
import get_details from "./get_details";

const rUser = Router();

rUser.get('/details', auth.any, get_details)

// User Login
rUser.post('/login/user', userLogin)

// Other
rUser.post("/register/customer", registerCustomer)

export default rUser
