import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import {body, inspectBuilder} from "../../../utils/inspect";

/**
 * Validate Request
 */
 const inspector = inspectBuilder(
    body("branchName").exists().withMessage("Branch name is required"),
)

const addBranch: Handler = async (req, res) => {
    const { r } = res;

    const branchId = UUID();

    const branchData = {
        branchId,
        branchName: req.body.branchName,
    };


    const [error, response] = await model.branch.add_Branch(branchData);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE(); //todo: react to possible errors
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>addBranch];