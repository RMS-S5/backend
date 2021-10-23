import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const allAvailableRoomsByBranch: Handler = async (req, res) => {
  const { r } = res;
  const { branchId, arrival, departure } = req.body;
  console.log(req.body);
  const [error, roomData] = await model.booking.allAvailableRoomsByBranch(
    branchId,
    arrival,
    departure
  );
  if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().data(roomData).message("Success").send();
};

/**
 * Export Handler
 */

/**
 * Export Handler
 */
const getAvailabeRoomsHandler = {
  getAvailabeRooms: [<EHandler>allAvailableRoomsByBranch],
};
export default getAvailabeRoomsHandler;
