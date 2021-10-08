import { Router } from "express";
import auth from "../../utils/auth"

import getBookingsHandler from "./get/booking";
import updateOrdersHandler from "./update/booking";
import { Handler } from "../../utils/types";

const rBooking = Router();


/**
 * Update
 */
rBooking.put('/accept-booking/:bookingId', updateOrdersHandler.acceptBooking);
rBooking.put('/reject-booking/:bookingId', updateOrdersHandler.rejectBooking);


/**
 * Getters
 */
rBooking.get('/bookings', getBookingsHandler.getAllBookings);
rBooking.get('/bookings-monthly-completed', getBookingsHandler.getMonthlyCompletedBookings);



export default rBooking
