import { Router } from "express";
import auth from "../../utils/auth"

import getPreviousBookingsHandler from "./get/previousBookings";
import addNewBooking from "./add/newBooking";
import getREBookingsHandler from "./get/getBookingsForRE";
import updateBookingStatusHandler from "./put/updateBookingStatus";

import getBookingsHandler from "./get/booking";
import updateOrdersHandler from "./update/booking";
import { Handler } from "../../utils/types";

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
 * Update
 */
rBooking.put('/accept-booking/:bookingId', auth.branchManager, updateOrdersHandler.acceptBooking);
rBooking.put('/reject-booking/:bookingId', auth.branchManager, updateOrdersHandler.rejectBooking);


rBooking.get(
  "/get-bookings-for-receptionist",
  getREBookingsHandler.getBookingsforRE
);

rBooking.post(
  "/update-booking-status",
  updateBookingStatusHandler.updateBookingStatus
);

/**
 * Getters
 */
rBooking.get('/bookings', auth.branchManager, getBookingsHandler.getAllBookings);
rBooking.get('/bookings-monthly-completed', auth.management, getBookingsHandler.getMonthlyCompletedBookings);

rBooking.post("/add-new-booking", addNewBooking);

export default rBooking
