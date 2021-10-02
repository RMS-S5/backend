import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const customerByIdInspector = inspectBuilder(
  param("customerId").exists().withMessage("Customer Id should not be empty")
);
const getCustomerDataById: Handler = async (req, res) => {
  const { r } = res;
  const { customerId } = req.params;

  const [error, customerData] = await model.user.get_UserAccountByUserId(
    customerId
  );

  if (error.code == MErr.NOT_FOUND) {
    r.status.NOT_FOUND().message("Bookings not found for this customer").send();
    return;
  } else if (error.code !== MErr.NO_ERROR) {
    console.error("Bookings not found for this customer");
    r.pb.ISE();
    return;
  }

  r.status.OK().data(customerData).message("Success").send();
};

/**
 * Export Handler
 */
const getCustomerDataByIdHandler = {
  getCustomerDataById: [customerByIdInspector, <EHandler>getCustomerDataById],
};
export default getCustomerDataByIdHandler;
