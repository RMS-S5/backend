import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {} from "./types";

export abstract class FoodItemModel {
  private static View_foodItemsWithVariants = "foodItemsWithVariants";
  private static TB_categories = "category";

  /**
   * Getters
   */

  static get_AllFoodItemsWithVariants(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.View_foodItemsWithVariants));
  }
    
  static get_AllCategories(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_categories));
  }


    
}
