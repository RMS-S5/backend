import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, inspectBuilder , param} from "../../../utils/inspect";
import {uploadSingleImage  } from "../../../utils/storage/index";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    param('userId').exists().withMessage("Food item id is required"),
);

const deleteUser: Handler = async (req, res) => {
    const { r } = res;
    const userId = req.params.userId;
    const filter = {
        userId,
        branchId : req.user.branchId
    }
    const [error, response] =
        await model.user.update_StaffAccount(filter, {active : false}, {});
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message('Not found')
            .send();
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>deleteUser];

