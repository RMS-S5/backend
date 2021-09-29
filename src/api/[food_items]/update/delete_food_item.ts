import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, inspectBuilder , param} from "../../../utils/inspect";
import {uploadSingleImage  } from "../../../utils/storage/index";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    param('foodItemId').exists().withMessage("Food item id is required"),
);

const deleteFoodItem: Handler = async (req, res) => {
    const { r } = res;
    const foodItemId = req.params.foodItemId;
    const [error, response] =
        await model.foodItem.update_FoodItem(foodItemId, {active : false}, {});
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message('Not found')
            .send();
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>deleteFoodItem];

