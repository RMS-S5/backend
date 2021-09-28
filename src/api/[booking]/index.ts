import { Router } from "express";
import auth from "../../utils/auth";

import getPreviousBookingsHandler from "./get/previousBookings";

const rBooking = Router();

/**
 * Getters
 */
rBooking.get(
  "/get-previous-bookings/:customerId",
  getPreviousBookingsHandler.getPreviousBookings
);

export default rBooking;
