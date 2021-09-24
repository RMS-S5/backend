import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getFoodItemsWithVariants: Handler = async (req, res) => {
    const {r} = res;

    const [error, foodItemsData] = await model.foodItem.get_AllFoodItemsWithVariants();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(foodItemsData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getFoodItemsWithVariants]