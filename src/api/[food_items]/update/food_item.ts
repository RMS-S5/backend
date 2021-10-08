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
    body("price")
        .optional()
        .isNumeric().withMessage("Total amount should be a number"),
    body('name').optional(),
    body('categoryId').optional(),
    body('description').optional(),
    body('foodVariants').optional(),
);

const updateFoodItem: Handler = async (req, res) => {
    const { r } = res;
    const foodItemId = req.params.foodItemId;
    const { price, name, categoryId, description,foodVariants } = req.body;
    const temp = { price, name, categoryId, description };

    // Check files
    let data;
    if((<any>req.file)){
        data = { ...temp, image : (<any>req.file).key}
    }else{
        data = temp;
    }

    console.log("JSON.stringify(foodVariants) update:", JSON.stringify(foodVariants))
    const [error, response] =
        await model.foodItem.update_FoodItem(foodItemId, data, JSON.stringify(foodVariants));
    if (error.code == MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("Category is not found")
            .send();
        return;
    }else if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [uploadSingleImage, inspector, <EHandler>updateFoodItem];

