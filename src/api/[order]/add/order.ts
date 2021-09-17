// import {EHandler, Handler} from "../../../utils/types";
// import model, {MErr} from "../../../model";
// import {v4 as UUID} from "uuid";
// import {body, inspectBuilder} from "../../../utils/inspect";
//
// /**
//  * Validate Request
//  */
// const inspector = inspectBuilder(
//     body("foodItemId").exists().withMessage("Food item id is required"),
//     body("variantId").exists().withMessage("Variant id is required"),
//     body("price").exists().withMessage("Price is is required")
//         .isNumeric().withMessage("Price should be a number"),
//     body("quantity").exists().withMessage("Quantity is is required")
//         .isNumeric().withMessage("Quantity should be a number"),
//     body("cartId").exists().withMessage("Cart id is required"),
// )
//
// const addOrder: Handler = async (req, res) => {
//     const {r} = res;
//     const cartId = UUID();
//     let cartData ;
//
//     if(req.user?.userId != null){
//         cartData = {cartId, customerId : req.user.userId};
//     }else{
//         cartData = {cartId};
//     }
//
//     const [error, response] = await model.cart.add_Cart(cartData);
//     if (error.code !== MErr.NO_ERROR) {
//         r.pb.ISE();
//         return;
//     }
//
//     r.status.OK()
//         .data({cartId})
//         .message("Success")
//         .send();
// };
//
// export default [<EHandler> addOrder];