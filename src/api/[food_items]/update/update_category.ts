import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, inspectBuilder , param} from "../../../utils/inspect";
import {uploadSingleImage  } from "../../../utils/storage/index";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    body('categoryName').optional(),
    body('description').optional(),
);

const updateFoodItem: Handler = async (req, res) => {
    const { r } = res;
    const categoryId = req.params.categoryId;
    const { categoryName, description} = req.body;
    const temp = { categoryName, description};

    // Check files
    let data;
    if((<any>req.file)){
        data = { ...temp, image : (<any>req.file).key}
    }else{
        data = temp;
    }

    const [error, response] =
        await model.foodItem.update_Category(categoryId, data);
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

