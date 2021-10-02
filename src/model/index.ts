import {UserModel} from "./user";
import {OrderModel} from "./order";
import {FoodItemModel} from "./food_item";
import {CartModel} from "./cart";
import {BranchModel} from "./branch";
import {RoomModel} from "./room";
import {CustomerReportModel} from "./customer_report";
import {BookingModel} from "./booking";

export {MErr} from "../utils/dbMan";
export const model = {
    user: UserModel,
    foodItem : FoodItemModel,
    cart : CartModel,
    order : OrderModel,
    branch : BranchModel,
    room : RoomModel,
    customerReport : CustomerReportModel,
    booking : BookingModel,
};

export default model;
