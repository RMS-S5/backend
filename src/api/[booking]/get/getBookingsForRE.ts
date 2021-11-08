import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const getBookingsforRE: Handler = async (req, res) => {
  console.log("booking");
  const { r } = res;

  const [error, bookingData] = await model.booking.getBookingsforRE();

  if (error.code == MErr.NOT_FOUND) {
    r.status.NOT_FOUND().message("Bookings not found for this customer").send();
    return;
  } else if (error.code !== MErr.NO_ERROR) {
    console.error("Bookings not found for this customer");
    r.pb.ISE();
    return;
  }

  r.status.OK().data(bookingData).message("Success").send();
};

/**
 * Export Handler
 */
const getREBookingsHandler = {
  getBookingsforRE: [<EHandler>getBookingsforRE],
};
export default getREBookingsHandler;
