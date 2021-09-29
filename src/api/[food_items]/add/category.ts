import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";
import { body, inspectBuilder , param} from "../../../utils/inspect";
import {uploadSingleImage  } from "../../../utils/storage/index";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
    body('categoryName').exists().withMessage("Name can not be empty"),
    body('description').exists().withMessage("description can not be empty"),
);

const updateFoodItem: Handler = async (req, res) => {
    const { r } = res;
    const categoryId = UUID();
    const { categoryName , description } = req.body;
    const temp = { categoryName , description  };

    // Check files
    let data;
    if((<any>req.file)){
        data = { ...temp, imageUrl : (<any>req.file).key}
    }else{
        data = temp;
    }

    const [error, response] =
        await model.foodItem.add_Category(data);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }
    r.status.OK()
        .message("Success")
            .send();
    
    
};

export default [uploadSingleImage, inspector, <EHandler>updateFoodItem];

