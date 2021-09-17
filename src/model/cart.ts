import {cleanQuery, runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {Cart, CartItem} from "./types";

export abstract class CartModel {
  private static VIEW_cartItemDetailed = "cartItemsDetailed";
  private static TB_cart = "cart";
  private static TB_cartItem = "cartItem";


  /**
   * Creators
   */
  static add_Cart(cartData : Cart) {
    return runQuery(
        knex => knex(this.TB_cart).insert(cartData)
    )
  }

  static add_CartItem(cartItemData : CartItem) {
    return runQuery(
        knex => knex(this.TB_cartItem).insert(cartItemData)
    )
  }

  /**
   * Update
   */
  static update_CartItem(cartItemId : string, cartItemData : any) {
  return runQuery(
      knex => knex(this.TB_cartItem).update(cartItemData).where({cartItemId})
  )
  }

  /**
   * Getters
   */

  static get_AllCartItems(query : any): Promise<[MError, any[]]> {
    const q = {...cleanQuery(query, ["orderId", "cartId"]), active : true}

    return runQuery<any[]>(
        (knex) =>
        knex(this.VIEW_cartItemDetailed).where(q).select(),{required : true});
  }

  static get_Cart(cartId : string): Promise<[MError,Cart]> {
    return runQuery<Cart>(
        (knex) => knex(this.TB_cart)
        .where({cartId}).select(), {single : true});
  }
    


  
    
}
