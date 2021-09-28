import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {} from "./types";

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


  static update_FoodItem(foodItemId: string, foodData : any, foodVariantData : any) {
    return runTrx(
      async trx => {
         await trx(this.TB_foodItem).update(foodData).where({ foodItemId })
        return trx.raw(`call set_order_items(?,?)`, [foodItemId, foodVariantData]);
      })
      }
  
}


    

