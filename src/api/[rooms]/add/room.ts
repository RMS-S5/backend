import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import {body, inspectBuilder} from "../../../utils/inspect";

/**
 * Validate Request
 */
 const inspector = inspectBuilder(
    body("roomNumber").exists().withMessage("Room number is required")
    .isNumeric().withMessage("Room number should be a number"),
    body("capacity").exists().withMessage("Capacity is is required")
    .isNumeric().withMessage("Capacity should be a number"),
    body("roomType").exists().withMessage("Room type is is required"),
    body("price").exists().withMessage("Price is is required")
        .isNumeric().withMessage("Price should be a number"),
)

const addRoom: Handler = async (req, res) => {
    const { r } = res;

    let branchId = req.user.branchId?req.user.branchId:"";
    //console.log(req.body);
    const roomData = {
        roomNumber: req.body.roomNumber,
        branchId,
        capacity: req.body.capacity,
        roomType: req.body.roomType,
        price: req.body.price,
    };


    const [error, response] = await model.room.add_Room(roomData);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE(); 
        return;
    }

    r.status.OK()
        .message("Success")
        .send();
};

export default [inspector, <EHandler>addRoom];