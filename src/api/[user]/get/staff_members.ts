import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getStaffMembers: Handler = async (req, res) => {
    const {r} = res;

    let query = {}
    if (req.user.accountType === model.user.accountTypes.branchManager) {
        query = {...query, branchId: req.user.branchId}
    }

    //query = {...query, branchId: "de741275-70dd-46a2-b39c-e42755530a51"}

    const [error, staffMembersData] = await model.user.get_StaffMembers(query);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(staffMembersData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getStaffMembers]