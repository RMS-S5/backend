import {Router} from "express";
import auth from "../../utils/auth"

import getFoodItemsWithVariants from "./get/food_items";
import getCategories from "./get/categories";

import addFoodItem from "./add/food_item";
import addCategory from "./add/category";
import updateFoodItem from "./update/food_item";
import updateCategory from "./update/update_category";
import deleteFoodItem from "./update/delete_food_item";
import deleteCategory from "./update/delete_category";

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
rFoodItem.delete('/delete-food-item/:foodItemId', deleteFoodItem);
rFoodItem.delete('/delete-category/:categoryId', deleteCategory);


export default rFoodItem;



