import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const customerReports: Handler = async (req, res) => {
    const {r} = res;

    const [error, customerReportData] = await model.customerReport.get_CustomerReports();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(customerReportData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>customerReports]