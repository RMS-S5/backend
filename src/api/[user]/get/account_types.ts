import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getAccountTypes: Handler = async (req, res) => {
    const {r} = res;


    const [error, accountTypeData] = await model.user.get_AccountTypes();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(accountTypeData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getAccountTypes]