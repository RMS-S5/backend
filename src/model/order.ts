import {cleanQuery, runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {Order} from "./types";

export abstract class OrderModel {
  private static VIEW_orderWithCartItems = "ordersWithCartItems";
  private static TB_order = "order";
  private static FN_latestTableOrder = "latestTableOrder";

  public static orderStatus = {
    placed : "Placed",
    preparing : "Preparing",
    prepared : "Prepared",
    waiterAssigned : "Waiter Assigned",
    rejected : "Rejected",
    served: "Served",
    closed : "Closed"
  }


  /**
   * Creators
   */
  static add_Order(orderId: string, orderData: any, cartItems: any) {
    console.log(cartItems);
    return runTrx(async trx =>  {
      await trx(this.TB_order).insert(orderData);
      return trx.raw(`call set_order_items(?,?)`, [orderId, cartItems])
    });
  };


  /**
   * Update
   */
  static update_Order(orderId: string, orderData: any) {
    const data = cleanQuery(orderData, ['orderStatus', 'price', 'waiterId', 'kitchenStaffId']);
  return runQuery(
      knex => knex(this.TB_order).update(data).where({orderId})
  )
  }

  /**
   * Getters
   */

  static get_AllActiveOrders(query : any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus, tableNumber, branchId"])
    return runQuery<any[]>((knex) =>
        knex(this.VIEW_orderWithCartItems)
            .where(q)
            .andWhereNot({orderStatus : this.orderStatus.closed}));
  }

  static get_AllOrders(query : any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus, tableNumber, branchId"])
    return runQuery<any[]>((knex) => knex(this.VIEW_orderWithCartItems).where(q));
  }

  // static get_TableOrder(tableNumber : number, branchId : string): Promise<[MError, any]> {
  //   // const q = cleanQuery(query, ["tableNumber, branchId"])
  //   return runQuery<any>(
  //     (knex) =>
  //       knex.raw(`select * from latest_table_order(?, ?)`, [tableNumber, branchId]));
  // }
  static get_TableOrder(tableNumber : any, branchId : any): Promise<[MError, any]> {
    // const q = cleanQuery(query, ["tableNumber, branchId"])
    console.log(parseInt(tableNumber), branchId);
    return runTrx<any>(
      (trx) =>
        trx.raw(`select * from latest_table_order(?, ?)`, [parseInt(tableNumber), branchId]),
      );
  }

  static get_OrderByOrderId(orderId : string): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) =>
        knex(this.VIEW_orderWithCartItems)
            .where({orderId}), {single : true, required : true});
  }


    


  
    
}
