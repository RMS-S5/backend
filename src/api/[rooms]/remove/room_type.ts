import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('roomType').exists().withMessage('Room type is required')
)

/**
 * Remove room type
 */
const removeRoomType: Handler = async (req, res) => {
    const { r } = res;
    const { roomType } = req.params;   

    const [error, response] = await model.room.remove_RoomType(roomType);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Room type not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .message("Room removed successfully")
        .send();
    
}

export default [inspector,<EHandler> removeRoomType];