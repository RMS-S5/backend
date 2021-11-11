import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder } from "../../../utils/inspect";

/**
 * Validate Request
 */
const inspector = inspectBuilder(
    body("tableNumber").exists().withMessage("Table Number is required")
    .isNumeric().withMessage("Table number should be a number"),
)

const addTable: Handler = async (req, res) => {
    const { r } = res;

    let branchId = req.user.branchId?req.user.branchId:""; 
    

    const tableData = {
        tableNumber: req.body.tableNumber,
        branchId,
    };
    console.log("req.user: ", req.user)
    console.log("tableNumber: ",req.body.tableNumber, ", branchId:", branchId)

    const [error, response] = await model.branch.add_Table(tableData);
    if (error.code == MErr.DUPLICATE_ENTRY) {
        r.status.ERROR()
            .message("Duplicate entry")
            .send()
        return;
    } else if (error.constraint == 'fk_ci_cart_id_constraint') {
        r.status.ERROR()
            .message("No cart id found")
            .send()
        return;
    } else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>addTable];

