import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";

const addRatingHandler: Handler = async (req, res) => {
  const { r } = res;
  let customer_review_id = UUID();
  let { customerId, rating, description, recommendation } = req.body;
  rating = parseInt(rating);
  let reportData = {
    customerId,
    rating,
    description,
    recommendation,
    customer_review_id: customer_review_id,
    active: true,
  };

  const [error, response] = await model.report.addRatingReview(reportData);
  if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().data({ customer_review_id }).message("Success").send();
};

export default [<EHandler>addRatingHandler];
