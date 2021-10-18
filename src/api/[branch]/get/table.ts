import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {inspectBuilder, param, query} from "../../../utils/inspect";
import {MErrorCode} from "../../../utils/dbMan/merror";


const verificationCodeInspector = inspectBuilder(
    param("verificationCode").exists().withMessage("Verification Code should not be empty")
)


const getTableByVerificationCode: Handler = async (req, res) => {
    const {r} = res;
    const {verificationCode} = req.params;

    const [error, tableData] = await model.branch.get_TableByVerificationCode(verificationCode);

    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Table not found")
            .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(tableData)
        .message("Success")
        .send();
};

const getBranchTables: Handler = async (req, res) => {
    const {r} = res;
    let branchId = req.user.branchId?req.user.branchId:"";
    const [error, tableData] = await model.branch.get_Tables({branchId});

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(tableData)
        .message("Success")
        .send();
};

const getBranches: Handler = async (req, res) => {
    const {r} = res;

    const [error, branchData] = await model.branch.get_Branches();

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(branchData)
        .message("Success")
        .send();
};


/**
 * Export Handler
 */
const getTableHandler = {
    getTableByVerificationCode : [verificationCodeInspector, <EHandler> getTableByVerificationCode],
    getBranchTables : [ <EHandler> getBranchTables],
    getBranches : [ <EHandler> getBranches],
}
export default getTableHandler;
