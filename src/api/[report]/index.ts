import { Router } from "express";
import auth from "../../utils/auth";
import addReportHandler from "./add/addReport";
import addRatingHandler from "./add/addRatingReview";
const rReport = Router();

/**
 * Getters
 */

/**
 * Post
 */
// rBooking.post("/add-new-booking", addNewBooking);
rReport.post("/add-new-report", addReportHandler);
rReport.post("/add-new-review", addRatingHandler);

export default rReport;
