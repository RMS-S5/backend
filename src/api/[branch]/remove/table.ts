import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('tableNumber').exists().withMessage('Table number is required'),
)

/**
 * Remove table
 */
const removeTable: Handler = async (req, res) => {
    const { r } = res;
    const { tableNumber } = req.params;

    let branchId = req.user.branchId?req.user.branchId:"";
    const [error, response] = await model.branch.remove_Table(parseInt(tableNumber), branchId);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Table not found").send();
        return
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
        return
    }
    r.status.OK()
        .message("Table removed successfully")
        .send();
    
}

export default [inspector,<EHandler> removeTable];