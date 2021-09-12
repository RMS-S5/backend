import {compare} from "bcrypt";
import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model"
import {inspectBuilder, body} from "../../../utils/inspect";

/**
 * :: STEP 1
 * Validate Request
 */
const inspector = inspectBuilder(
    body("email").exists().withMessage("email is required"),
    body("password").exists().withMessage("password is required")
)

/**
 * :: STEP 2
 * Validate email + password
 */
const validateCredentials: Handler = async (req, res, next) => {
    const {r} = res;
    const {email, password} = req.body;

    const [error, account] = await model.user.get_UserAccountByEmail(email);

    if (error.code === MErr.NO_ERROR) {
        // password verification
        if (!await compare(password, account.password)) {
            r.status.UN_AUTH()
                .message("Incorrect email or password")
                .send();
            return;
        }

        req.body.userId = account.userId; // bind userId to request
        next() // send pair of tokens
        return;
    }

    if (error.code === MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("User doesn't exists")
            .send();
        return;
    }

    r.pb.ISE()
        .send();
};

/**
 * :: STEP 3
 * Serve JWT tokens
 */
import serveTokenPair from './_tokens'

/**
 * Request Handler Chain
 */
export default [inspector, <EHandler>validateCredentials, serveTokenPair]
