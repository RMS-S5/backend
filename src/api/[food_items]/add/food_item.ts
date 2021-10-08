import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder, param } from "../../../utils/inspect";
import { uploadSingleImage } from "../../../utils/storage/index";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    body("price").exists().withMessage("Price can not be empty")
        .isNumeric().withMessage("Total amount should be a number"),
    body('name').exists().withMessage("Name can not be empty"),
    body('categoryId').exists().withMessage("Category id can not be empty"),
    body('description').exists().withMessage("description can not be empty"),
    body('foodVariants').exists().withMessage("Food Variants id can not be empty"),
);

const addFoodItem: Handler = async (req, res) => {
    const { r } = res;
    const foodItemId = UUID();
    const { price, name, categoryId, description, foodVariants } = req.body;
    const temp = { foodItemId, price, name, categoryId, description };

    // Check files
    let data;
    if ((<any>req.file)) {
        data = { ...temp, imageUrl: (<any>req.file).key }
    } else {
        data = temp;
    }

    console.log("JSON.stringify(foodVariants) add:", JSON.stringify(foodVariants))

    const [error, response] =
        await model.foodItem.add_FoodItem(foodItemId, data, JSON.stringify(foodVariants));
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .message("Success")
        .send();




};

export default [uploadSingleImage, inspector, <EHandler>addFoodItem];

