import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('roomType').exists().withMessage('Room type is required'),
    body("description").exists().withMessage("Description is required"),
)

/**
 * Update room type
 */
const updateRoomType: Handler = async (req, res) => {
    const { r } = res;
    const { roomType } = req.params;   

    const roomTypeData = {
        description: req.body.description,
    };
    const [error, response] = await model.room.update_RoomType(roomType, roomTypeData);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Room not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .message("Room type updated successfully")
        .send();
    
}

export default [inspector,<EHandler> updateRoomType];