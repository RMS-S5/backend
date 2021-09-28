import {
  cleanQuery,
  runQuery,
  runTrx,
  TransactionBuilder,
} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Booking } from "./types";

export abstract class BookingModel {
  private static TB_booking = "booking";

  /**
   * Creators
   */

  /**
   * Update
   */

  /**
   * Getters
   */

  static getBookingByCustomer(customerId: string): Promise<[MError, Booking]> {
    return runQuery<Booking>(
      (knex) => knex(this.TB_booking).where({ customerId }).select(),
      { required: true }
    );
  }

  // static get_Cart(query : any): Promise<[MError,Cart]> {
  //     const q = cleanQuery(query, ['cartId', 'customerId'])
  //     return runQuery<Cart>(
  //         (knex) => knex(this.TB_cart)
  //             .where(q).select(), {single : true, required : true});
  // }
}
