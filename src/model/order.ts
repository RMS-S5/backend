import {cleanQuery, runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {Order} from "./types";

export abstract class OrderModel {
  private static VIEW_orderWithCartItems = "ordersWithCartItems";
  private static TB_order = "order";

  public static orderStatus = {
    placed : "Placed",
    preparing : "Preparing",
    prepared : "Prepared",
    waiterAssigned : "Waiter Assigned",
    rejected : "Rejected",
    served : "Served"
  }


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
  static update_Order(orderId : string, orderData : any) {
  return runQuery(
      knex => knex(this.TB_order).update(orderData).where({orderId})
  )
  }

  /**
   * Getters
   */

  static get_AllActiveOrders(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) =>
        knex(this.VIEW_orderWithCartItems)
            .whereNot({orderStatus : this.orderStatus.served}));
  }

  static get_AllOrders(query : any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus"])
    return runQuery<any[]>((knex) => knex(this.VIEW_orderWithCartItems).where(q));
  }


    


  
    
}
