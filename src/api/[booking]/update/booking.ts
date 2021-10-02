import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder, param } from "../../../utils/inspect";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    param('bookingId').exists().withMessage("Booking id is required"),
);

const acceptBooking: Handler = async (req, res) => {
    const { r } = res;
    const bookingId = req.params.bookingId;

    let data = { status: "Accepted" }

    const [error, response] = await model.booking.update_Booking(bookingId, data);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Not found")
            .send();
        return;
    } else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

const rejectBooking: Handler = async (req, res) => {
    const { r } = res;
    const bookingId = req.params.bookingId;

    let data = { status: "Rejected" }

    const [error, response] = await model.booking.update_Booking(bookingId, data);
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Not found")
            .send();
        return;
    } else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
const updateOrdersHandler = {
    acceptBooking: [inspector, <EHandler>acceptBooking],
    rejectBooking: [inspector, <EHandler>rejectBooking],
}
export default updateOrdersHandler;

