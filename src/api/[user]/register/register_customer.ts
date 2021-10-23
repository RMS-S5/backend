import { v4 as UUID } from "uuid";
import { EHandler, Handler } from "../../../utils/types";
import { encrypt_password } from "../../../utils/hasher";
import { inspectBuilder, body } from "../../../utils/inspect";
import model, { MErr } from "../../../model";
import { TokenMan } from "../../../utils/tokenMan";

/**
 * :: STEP 1
 * Validate Request
 */
const inspector = inspectBuilder(
  body("password").exists().withMessage("Password is required"),
  body("firstName").exists().withMessage("First Name is required"),
  body("lastName").exists().withMessage("LastName is is required"),
  body("email").exists().isEmail().withMessage("Email is required"),
  body("mobileNumber")
    .exists()
    .isMobilePhone("any")
    .withMessage("Mobile Number is required")
);
/**
 * :: STEP 2
 * Create a new [user] user
 * @param req body
 *      password
 *      firstName
 *      lastName
 *      email
 *      mobileNumber
 * @param res
 *  message
 */
const registerCustomer: Handler = async (req, res) => {
  const { r } = res;

  // Setup Data
  const userId = UUID();

  const { email, password, firstName, lastName, mobileNumber } = req.body;
  const userAccountData = {
    userId,
    email,
    password: await encrypt_password(password),
    firstName,
    lastName,
    mobileNumber,
    accountType: model.user.accountTypes.customer,
  };
  const customerData = {
    userId,
  };

  // Sync model to database
  const [{ code, constraint }] = await model.user.add_CustomerAccount(
    userAccountData,
    customerData
  );

  if (code === MErr.NO_ERROR) {
    // await mailer.send_verification_mail(userAccountData.email, TokenMan.getAccessToken({
    //     email: userAccountData.email,
    //     userId: userAccountData.userId,
    //     firstName: userAccountData.firstName
    // }))
    r.status
      .OK()
      .message("Success")
      .data({
        userId,
        email,
        accountType: userAccountData.accountType,
        firstName,
        lastName,
      })
      .send();
    return;
  }

  if (code === MErr.DUPLICATE_ENTRY) {
    const message =
      constraint === "user_account_email_unique"
        ? "Email address is associated with another account."
        : "user name is already taken";
    r.status.BAD_REQ().message(message).send();
    return;
  }

  r.pb.ISE();
};

/**
 * Request Handler Chain
 */
export default [inspector, <EHandler>registerCustomer];
