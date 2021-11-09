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
        .isNumeric().withMessage("Price should be a number"),
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

    console.log("req.body: ", req.body)
    console.log("req.file: ", req.file)
    console.log("foodVariants: ", foodVariants)
    

    // refine foodVariants //todo: check for array
    var tempFoodVariants = foodVariants.map(JSON.parse)

    // Check files
    let data;
    if ((<any>req.file)) {
        data = { ...temp, imageUrl: (<any>req.file).key }
    } else {
        data = temp;
    }

    console.log("data: ", data)
    console.log("JSON.stringify(tempFoodVariants):", JSON.stringify(tempFoodVariants))
    // console.log("foodVariants:", foodVariants)
    console.log("JSON.stringify(foodVariants):", JSON.stringify(foodVariants))
    
    //console.log("tempFoodVariants: ", tempFoodVariants)

    const [error, response] =
        await model.foodItem.add_FoodItem(foodItemId, data, JSON.stringify(tempFoodVariants));
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .message("Success")
        .send();




};

export default [uploadSingleImage, inspector, <EHandler>addFoodItem];

