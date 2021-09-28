import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getRoomTypes: Handler = async (req, res) => {
    const {r} = res;
    const [error, roomTypesData] = await model.room.get_RoomTypes();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(roomTypesData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getRoomTypes]