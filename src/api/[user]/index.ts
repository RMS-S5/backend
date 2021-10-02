import { Router } from "express";
import auth from "../../utils/auth";

import userLogin from "./login/users";
import registerCustomer from "./register/register_customer";
import get_details from "./get_details";
import getCustomerDataByIdHandler from "./get/getUserById";
import updateUserData from "./update/details";
const rUser = Router();

rUser.get("/details", auth.any, get_details);

rUser.get(
  "/get-user-by-id/:customerId",
  getCustomerDataByIdHandler.getCustomerDataById
);

// User Login
rUser.post("/login/user", userLogin);

// Other
rUser.post("/register/customer", registerCustomer);

rUser.post("/register/customer", registerCustomer);

rUser.post("/change-password", updateUserData);

export default rUser;
