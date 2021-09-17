import {EHandler, Handler} from "../../../utils/types";
import model, {MErr} from "../../../model";
import {v4 as UUID} from "uuid";

const addCart: Handler = async (req, res) => {
    const {r} = res;
    const cartId = UUID();
    let cartData ;

    if(req.user?.userId != null){
        cartData = {cartId, customerId : req.user.userId};
    }else{
        cartData = {cartId};
    }

    const [error, response] = await model.cart.add_Cart(cartData);
    if (error.code !== MErr.NO_ERROR) {
        r.pb.ISE();
        return;
    }

    r.status.OK()
        .data({cartId})
        .message("Success")
        .send();
};

export default [<EHandler> addCart];