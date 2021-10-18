import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";

const addReportHandler: Handler = async (req, res) => {
  const { r } = res;
  console.log(req);
  let customer_report_id = UUID();
  let { userId, mobileNumber, description, customerName } = req.body;
  let reportData = {
    userId,
    mobileNumber,
    description,
    customerName,
    customer_report_id: customer_report_id,
  };

  const [error, response] = await model.report.addCustomerReport(reportData);
  if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().data({ customer_report_id }).message("Success").send();
};

export default [<EHandler>addReportHandler];
