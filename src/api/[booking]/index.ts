import { Router } from "express";
import auth from "../../utils/auth";

import getPreviousBookingsHandler from "./get/previousBookings";
import addNewBooking from "./add/newBooking";

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

/**
 * Post
 */
rBooking.post("/add-new-booking", addNewBooking);

export default rBooking;
