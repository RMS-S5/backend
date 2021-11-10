import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";

/**
 * Add a cart or return customer cart
 * @param req 
 * @param res 
 * @returns 
 */
const addCart: Handler = async (req, res) => {
    const {r} = res;
    const cartId = UUID();
    let cartData ;
    if (req.user?.userId != null) {
        const [er, res1] = await model.cart.get_Cart({ customerId: req.user.userId });
        if (er.code == MErr.NO_ERROR && res1['cartId'] != null) {
            r.status.OK()
            .data(res1)
            .message("Success")
                .send();
            return;
        } else {
            cartData = {cartId, customerId : req.user.userId};
        }
        
    }else{
        cartData = {cartId};
    }
    const [error, response] = await model.cart.add_Cart(cartData);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    } else {
        r.status.OK()
        .data({cartId})
        .message("Success")
        .send();
    }

    
};

export default [<EHandler> addCart];