import { Router } from "express";
import auth from "../../utils/auth";

import getPreviousBookingsHandler from "./get/previousBookings";
import addNewBooking from "./add/newBooking";
import getREBookingsHandler from "./get/getBookingsForRE";
import updateBookingStatusHandler from "./put/updateBookingStatus";
const rBooking = Router();

/**
 * Getters
 */
rBooking.get(
  "/get-previous-bookings/:customerId",
  getPreviousBookingsHandler.getPreviousBookings
);

rBooking.get(
  "/get-previous-bookings/:customerId",
  getPreviousBookingsHandler.getPreviousBookings
);

rBooking.get(
  "/get-bookings-for-receptionist",
  getREBookingsHandler.getBookingsforRE
);

rBooking.post(
  "/update-booking-status",
  updateBookingStatusHandler.updateBookingStatus
);

/**
 * Post
 */
rBooking.post("/add-new-booking", addNewBooking);

export default rBooking;
