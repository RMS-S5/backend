import {UserModel} from "./user";
import {OrderModel} from "./order";
import {FoodItemModel} from "./food_item";
import {CartModel} from "./cart";

export {MErr} from "../utils/dbMan";
export const model = {
    user: UserModel,
    foodItem : FoodItemModel,
    cart : CartModel,
    order : OrderModel
};

export default model;
