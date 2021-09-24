import {Router} from "express";
import auth from "../../utils/auth"

import getFoodItemsWithVariants from "./get/food_items";
import getCategories from "./get/categories";

const rFoodItem = Router();

/**
 * Getters
 */
rFoodItem.get('/food-items-all', getFoodItemsWithVariants);
rFoodItem.get('/categories-all',  getCategories);


export default rFoodItem;



