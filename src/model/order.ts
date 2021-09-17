import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {Order} from "./types";

export abstract class OrderModel {
  private static VIEW_orderWithCartItems = "ordersWithCartItems";
  private static TB_cart = "cart";
  private static TB_order = "order";


  /**
   * Creators
   */
  static add_Order(orderId: string, orderData : Order , cartItems : any) {
    return runTrx(async trx =>  {
      await trx(this.TB_order).insert(orderData);
      return trx.raw(`call set_order_items(?,?)`, [orderId, cartItems])
    });
  };


  /**
   * Update
   */
  static update_CartItem(orderId : string, orderData : any) {
  return runQuery(
      knex => knex(this.TB_cart).update(orderId).where(orderData)
  )
  }

  /**
   * Getters
   */

  static get_AllOrders(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.VIEW_orderWithCartItems));
  }
    


  
    
}
