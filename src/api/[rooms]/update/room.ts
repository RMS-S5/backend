import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, param, inspectBuilder } from "../../../utils/inspect";

const inspector = inspectBuilder(
    param('roomNumber').exists().withMessage('Room number is required'),
    body("capacity").exists().withMessage("Capacity is is required")
    .isNumeric().withMessage("Capacity should be a number"),
    body("roomType").exists().withMessage("Room type is is required"),
    body("price").exists().withMessage("Price is is required")
        .isNumeric().withMessage("Price should be a number"),
)

/**
 * Update room
 */
const updateRoom: Handler = async (req, res) => {
    const { r } = res;
    const { roomNumber } = req.params;

    let branchId = "8d44ea94-0c49-4242-8e9b-c17acd9aff2b"; //req.user.branchId //todo:remove hardcoded value, validate

    const roomData = {
        capacity: req.body.capacity,
        roomType: req.body.roomType,
        price: req.body.price,
    };
    const [error, response] = await model.room.update_Room(parseInt(roomNumber), branchId, roomData);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND().message("Room not found").send();
    } else if (error.code != MErr.NO_ERROR) {
        r.pb.ISE();
    }
    r.status.OK()
        .message("Room updated successfully")
        .send();
    
}

export default [inspector,<EHandler> updateRoom];