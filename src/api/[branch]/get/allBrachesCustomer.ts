import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { inspectBuilder, param } from "../../../utils/inspect";
import { MErrorCode } from "../../../utils/dbMan/merror";

const getAllBrachesCustomer: Handler = async (req, res) => {
  const { r } = res;

  const [error, branchData] = await model.branch.getAllBrachesCustomer();
  if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().data(branchData).message("Success").send();
};

/**
 * Export Handler
 */

export default [<EHandler>getAllBrachesCustomer];
