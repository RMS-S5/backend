import {Router} from "express";
import auth from "../../utils/auth"

import getFoodItemsWithVariants from "./get/food_items";
import getCategories from "./get/categories";

import addFoodItem from "./add/food_item";
import addCategory from "./add/category";
import updateFoodItem from "./update/food_item";
import updateCategory from "./update/update_category";
import removeFoodItem from "./update/delete_food_item";
import removeCategory from "./update/delete_category";

const rFoodItem = Router();

/**
 * Getters
 */
rFoodItem.get('/food-items-all', getFoodItemsWithVariants);
rFoodItem.get('/categories-all', getCategories);

/**
 * Add
 */
rFoodItem.post('/add-food-item', addFoodItem);
rFoodItem.post('/add-category', addCategory);

/**
 * Update
 */
rFoodItem.put('/update-food-item/:foodItemId', updateFoodItem);
rFoodItem.put('/update-category/:categoryId', updateCategory);

/**
 * Delete
 */
rFoodItem.delete('/remove-food-item/:foodItemId', removeFoodItem);
rFoodItem.delete('/remove-category/:categoryId', removeCategory);


export default rFoodItem;



