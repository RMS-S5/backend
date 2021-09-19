import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {inspectBuilder, param} from "../../../utils/inspect";
import {MErrorCode} from "../../../utils/dbMan/merror";


const verificationCodeInspector = inspectBuilder(
    param("verificationCode").exists().withMessage("Verification Code should not be empty")
)

const getTableByVerificationCode: Handler = async (req, res) => {
    const {r} = res;
    const {verificationCode} = req.params;

    const [error, cartData] = await model.branch.get_TableByVerificationCode(verificationCode);

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
        .data(cartData)
        .message("Success")
        .send();
};


/**
 * Export Handler
 */
const getTableHandler = {
    getTableByVerificationCode : [verificationCodeInspector, <EHandler> getTableByVerificationCode],
}
export default getTableHandler;
