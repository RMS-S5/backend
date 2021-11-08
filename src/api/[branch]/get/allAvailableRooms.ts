import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const allVailableBranchInspector = inspectBuilder(
  param("branchId").exists().withMessage("Branch id should not be empty")
);

const allAvailableRoomsByBranch: Handler = async (req, res) => {
  const { r } = res;
  const { branchId } = req.params;
  const [error, roomData] = await model.booking.allAvailableRoomsByBranch(
    branchId
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
  getAvailabeRooms: [
    allVailableBranchInspector,
    <EHandler>allAvailableRoomsByBranch,
  ],
};
export default getAvailabeRoomsHandler;
