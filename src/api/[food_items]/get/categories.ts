import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";

const getCategories: Handler = async (req, res) => {
    const {r} = res;

    const [error, categoriesData] = await model.foodItem.get_AllCategories();
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data(categoriesData)
        .message("Success")
        .send();
};

/**
 * Export Handler
 */
export default [<EHandler>getCategories]