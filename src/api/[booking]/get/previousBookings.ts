import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const previousBookingsInspector = inspectBuilder(
  param("customerId").exists().withMessage("Customer Id should not be empty")
);
const getPreviousBookings: Handler = async (req, res) => {
  console.log("booking");
  const { r } = res;
  const { customerId } = req.params;

  const [error, bookingData] = await model.booking.getBookingByCustomer(
    customerId
  );

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
const getPreviousBookingsHandler = {
  getPreviousBookings: [
    previousBookingsInspector,
    <EHandler>getPreviousBookings,
  ],
};
export default getPreviousBookingsHandler;
