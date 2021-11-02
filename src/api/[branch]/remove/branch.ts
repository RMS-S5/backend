import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('branchId').exists().withMessage('Branch ID is required')
)

/**
 * Remove branch
 */
const removeBranch: Handler = async (req, res) => {
    const { r } = res;
    const { branchId } = req.params;   

    const [error, response] = await model.branch.remove_Branch(branchId);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Branch not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .message("Branch removed successfully")
        .send();
    
}

export default [inspector,<EHandler> removeBranch];