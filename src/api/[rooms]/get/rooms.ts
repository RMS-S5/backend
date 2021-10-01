import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getRooms: Handler = async (req, res) => {
    const {r} = res;

    const [error, roomsData] = await model.room.get_Rooms();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(roomsData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getRooms]