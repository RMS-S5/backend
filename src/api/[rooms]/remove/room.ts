import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('roomNumber').exists().withMessage('Room number is required'),
)

/**
 * Remove room
 */
const removeRoom: Handler = async (req, res) => {
    const { r } = res;
    const { roomNumber } = req.params;

    let branchId = "8d44ea94-0c49-4242-8e9b-c17acd9aff2b"; //req.user.branchId //todo:remove hardcoded value, validate
    console.log("removeRoom called#")
    const [error, response] = await model.room.remove_Room(parseInt(roomNumber), branchId);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Room not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .message("Room removed successfully")
        .send();
    
}

export default [inspector,<EHandler> removeRoom];