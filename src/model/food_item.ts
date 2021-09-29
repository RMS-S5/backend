import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {} from "./types";
import { cleanQuery } from './../utils/dbMan/resolver';

export abstract class FoodItemModel {
  private static View_foodItemsWithVariants = "foodItemsWithVariants";
  private static TB_categories = "category";
  private static TB_foodItem = "foodItem";
  private static TB_foodVariant = "foodVariant";

  /**
   * Getters
   */

  static get_AllFoodItemsWithVariants(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.View_foodItemsWithVariants));
  }
    
  static get_AllCategories(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_categories));
  }

  /**
   * 
   * Add
   * @returns 
   */
   static add_FoodItem(foodItemId: string, foodData : any, foodVariantData : any) {
    return runTrx(
      async trx => {
        if (Object.keys(foodData).length != 0) {
          await trx(this.TB_foodItem).insert(foodData);
        }
        if (Object.keys(foodVariantData).length != 0) {
          return trx.raw(`call set_order_items(?,?)`, [foodItemId, foodVariantData]);
        }
        return trx(this.TB_foodItem);
      })
  }
  
  static add_Category(categoryData : any) {
    return runQuery(
        knex => knex(this.TB_categories).insert(categoryData)
    )
  }


  /**
   * 
   * Update 
   * @returns 
   */
  static update_FoodItem(foodItemId: string, foodData : any, foodVariantData : any) {
    return runTrx(
      async trx => {
        if (Object.keys(foodData).length != 0) {
          await trx(this.TB_foodItem).update(foodData).where({ foodItemId })
        }
        if (Object.keys(foodVariantData).length != 0) {
          await trx.raw(`call set_order_items(?,?)`, [foodItemId, foodVariantData]);
        }
                return trx(this.TB_foodItem);
      })
  }
  
  static update_Category(categoryId: String, categoryData: any) {
    const data = cleanQuery(categoryData);
    return runQuery(
      knex => knex(this.TB_categories).update(data).where({ categoryId })
    )
  }

}




    

