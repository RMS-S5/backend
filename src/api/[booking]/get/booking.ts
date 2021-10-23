import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {MErrorCode} from "../../../utils/dbMan/merror";
import {inspectBuilder,query} from "../../../utils/inspect";



const getMonthlyCompletedBookings: Handler = async (req, res) => {
    const {r} = res;


    let query = {}
    if (req.user.accountType === model.user.accountTypes.branchManager) {
        query = {...query, branchId: req.user.branchId, status: "Completed"}
    }
    else{
        query = {...query, status: "Completed"}
    }

    const [error, bookingsData] = await model.booking.get_MonthlyCompletedBookings(query);

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(bookingsData)
        .message("Success")
        .send();
};

const getAllBookings: Handler = async (req, res) => {
    const {r} = res;

    const [error, bookingsData] = await model.booking.get_Bookings();

    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(bookingsData)
        .message("Success")
        .send();
};


/**
 * Export Handler
 */
const getBookingsHandler = {
    getMonthlyCompletedBookings : [<EHandler>getMonthlyCompletedBookings],
    getAllBookings : [<EHandler>getAllBookings],
}
export default getBookingsHandler;