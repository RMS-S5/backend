import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder } from "../../../utils/inspect";

/**
 * Validate Request
 */
const inspector = inspectBuilder(
    body("roomType").exists().withMessage("Room type is required"),
    body("description").exists().withMessage("Description is required"),
)

const addRoomType: Handler = async (req, res) => {
    const { r } = res;

    const roomTypeData = {
        roomType: req.body.roomType,
        description: req.body.description,
    };

    const [error, response] = await model.room.add_RoomType(roomTypeData);
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

export default [inspector, <EHandler>addRoomType];

