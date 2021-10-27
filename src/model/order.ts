import {
  cleanQuery,
  runQuery,
  runTrx,
  TransactionBuilder,
} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Order } from "./types";

export abstract class OrderModel {
  private static VIEW_orderWithCartItems = "ordersWithCartItems";
  private static VIEW_ordersWithNames = "orders_with_names";
  private static TB_order = "order";
  private static FN_latestTableOrder = "latestTableOrder";

  public static orderStatus = {
    placed: "Placed",
    preparing: "Preparing",
    prepared: "Prepared",
    waiterAssigned: "Waiter Assigned",
    rejected: "Rejected",
    served: "Served",
    closed: "Closed",
    paid : "Paid"
  };

  /**
   * Creators
   */
  static add_Order(orderId: string, orderData: any, cartItems: any) {
    return runTrx(async (trx) => {
      await trx(this.TB_order).insert(orderData);
      return trx.raw(`call set_order_items(?,?)`, [orderId, cartItems]);
    });
  }

  /**
   * Update
   */
  static update_Order(orderId: string, orderData: any) : Promise<[MError,any ]>{
    const data = cleanQuery(orderData, [
      "orderStatus",
      "price",
      "waiterId",
      "kitchenStaffId",
    ]);
    return runQuery((knex) =>
      knex(this.TB_order).update(data).where({ orderId })
    );
  }

  // Update order status of multiple orders at once
  static update_OrdersStatus(orderStatus: string, orderIds: any): Promise<[MError, any]> {
    
    return runTrx(async (trx) =>
      trx.raw('call set_order_status(?,?)', [orderStatus, orderIds])
    )
  }

  /**
   * Getters
   */

  static get_AllActiveOrders(query: any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus", "branchId", "tableNumber"]);
    return runQuery<any[]>((knex) =>
      knex(this.VIEW_orderWithCartItems)
        .where(q)
        .andWhereNot({ orderStatus: this.orderStatus.closed })
    );
  }

  static get_AllOrders(query: any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus", "branchId", "tableNumber"]);
    return runQuery<any[]>((knex) =>
      knex(this.VIEW_orderWithCartItems).where(q)
    );
  }

  static get_TableOrder(
    tableNumber: any,
    branchId: any
  ): Promise<[MError, any]> {
    return runTrx<any>((trx) =>
      trx.raw(`select * from latest_table_order(?, ?)`, [
        parseInt(tableNumber),
        branchId,
      ])
    );
  }

  static get_TableOrders(query: any): Promise<[MError, any]> {
    const q = cleanQuery(query, ["orderStatus", "branchId", "tableNumber"]);
    return runQuery<any[]>((knex) =>
      knex(this.VIEW_orderWithCartItems)
        .where(q)
        .andWhereNot({ orderStatus: this.orderStatus.rejected })
        .andWhereNot({ orderStatus: this.orderStatus.closed })
    );
  }

  static get_OrderByOrderId(orderId: string): Promise<[MError, any]> {
    return runQuery<any[]>(
      (knex) => knex(this.VIEW_orderWithCartItems).where({ orderId }),
      { single: true, required: true }
    );
  }

  static get_MonthlyCompletedOrders(query: any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["orderStatus, branchId"]); //todo: debug cleanQuery output
    console.log("query:", q)
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();

    let monthStart = new Date(thisYear, thisMonth);
    let monthEnd = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59);
    return runQuery<any[]>((knex) =>
      knex(this.VIEW_ordersWithNames)
        .where(query)
        .where('placedTime', '>=', monthStart)
        .where('placedTime', '<', monthEnd));
  }

  static get_Orders(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.VIEW_ordersWithNames));
  }
}
