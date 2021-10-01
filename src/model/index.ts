import { UserModel } from "./user";
import { OrderModel } from "./order";
import { FoodItemModel } from "./food_item";
import { CartModel } from "./cart";
import { BranchModel } from "./branch";
import { BookingModel } from "./booking";
import { RoomModel } from "./room";
export { MErr } from "../utils/dbMan";
export const model = {
  user: UserModel,
  foodItem: FoodItemModel,
  cart: CartModel,
  order: OrderModel,
  branch: BranchModel,
  booking: BookingModel,
  room: RoomModel,
};

export default model;
