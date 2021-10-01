import { Router } from "express";
import cAbout from "./about";
import { rBuilder } from "../utils/resp";

import rUser from "./[user]";
import rMeta from "./[meta]";
import rFoodItem from "./[food_items]";
import rCart from "./[cart]";
import rOrder from "./[order]";
import rBranch from "./[branch]";
import rBooking from "./[booking]";
import rRoom from "./[rooms]";

export const rApi = Router();
console.log("come to this");
// Specific middlewares for /api routes
rApi.use(rBuilder);

// Endpoints
rApi.get("/", cAbout);

// Routers
rApi.use("/user", rUser);
rApi.use("/food-item", rFoodItem);
rApi.use("/cart", rCart);
rApi.use("/order", rOrder);
rApi.use("/branch", rBranch);
rApi.use("/meta", rMeta);
rApi.use("/booking", rBooking);
rApi.use("/room", rRoom);

// Router
export default rApi;
