require("dotenv").config();
var generator = require("generate-password");
import { EHandler, Handler } from "../../../utils/types";
import { inspectBuilder, body, param } from "../../../utils/inspect";
import model, { MErr } from "../../../model";
import { encrypt_password } from "../../../utils/hasher";
import { compare } from "bcrypt";
import "../../../utils/email";
import sendEmail from "../../../utils/email";

const inspector = inspectBuilder(
  body("email")
    .exists()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Should be a valid email address")
);

const sendResetPasswordEmail: Handler = async (req, res, next) => {
  const { r } = res;
  const emailAddress = req.body.email;

  const [error, response] = await model.user.get_UserAccountByEmail(
    emailAddress
  );
  if (error.code == MErr.NOT_FOUND) {
    r.status
      .NOT_FOUND()
      .message("There is no user associated with this email address")
      .send();
    return;
  } else if (error.code != MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }
  const userId = response["userId"];

  const backEndUrl = `${process.env.BACKEND_URL}/api/user/reset-password/${userId}`;

  const message1 = `Click on this link ${backEndUrl} to reset your password. 
    You will receive a temporary password to this email and you can use it to login to the system.
    You can reset the password using this password.`;

  const msg = `<p>Click <a href="${backEndUrl}"> Here </a> to reset your password.<br>
  You will receive a temporary password to this email and you can use it to login to the system.
  You can reset the password using this password. </p>`;
  try {
    await sendEmail(emailAddress, "Reset password!", "", msg );
    r.status.OK().message('Success').send();
    return;
  } catch (error) {
    r.status.ERROR().message("Email sending error").send();
    return;
    console.log(error);
  }
};

const resetPassword: Handler = async (req, res, next) => {
  const { r } = res;
  const userId = req.params.userId;
  const newPassword = generator.generate({
    length: 8,
    numbers: true,
  });
  const userAccount = {
    password: await encrypt_password(newPassword),
  };

  // Sync model to database
  const [{ code }] = await model.user.update_UserAccount(userId, userAccount);
  if (code == MErr.NOT_FOUND) {
    r.status.NOT_FOUND().message("User not found").send();
    return;
  } else if (code === MErr.NO_ERROR) {
    // Get user account by user id
    const [error, response] = await model.user.get_UserAccountByUserId(userId);
    if (error.code == MErr.NOT_FOUND) {
      r.status.NOT_FOUND().message("User not found").send();
      return;
    } else if (error.code != MErr.NO_ERROR) {
      r.pb.ISE();
      return;
      }
      
    const emailAddress = response.email;
    const message = `New temporary password is ${newPassword}. You can use it to login to the system.
    You can reset the password using this password.`;

       try {
      await sendEmail(emailAddress, "Reset password!", "",message);
    } catch (error) {
      r.status.ERROR().message("Email sending error").send();
      return;
      console.log(error);
    }
    res.sendFile(__dirname + '/index.html');
    return;
  } else {
    r.pb.ISE();
  }
};

const reset_password = {
  sendResetPasswordEmail: [inspector, <EHandler>sendResetPasswordEmail],
  resetPassword: [<EHandler>resetPassword],
};

export default reset_password;
