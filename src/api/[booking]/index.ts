import { Router } from "express";
import auth from "../../utils/auth"

import getBookingsHandler from "./get/booking";
import updateOrdersHandler from "./update/booking";
import { Handler } from "../../utils/types";

const rBooking = Router();


/**
 * Update
 */
rBooking.put('/accept-booking/:bookingId', auth.branchManager, updateOrdersHandler.acceptBooking);
rBooking.put('/reject-booking/:bookingId', auth.branchManager, updateOrdersHandler.rejectBooking);


/**
 * Getters
 */
rBooking.get('/bookings', auth.branchManager, getBookingsHandler.getAllBookings);
rBooking.get('/bookings-monthly-completed', auth.management, getBookingsHandler.getMonthlyCompletedBookings);



export default rBooking
