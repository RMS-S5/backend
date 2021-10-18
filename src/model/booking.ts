import { cleanQuery, runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Order } from "./types";

export abstract class BookingModel {
  private static VIEW_bookingsWithNamesAndAmount = "bookings_with_names_and_amount";
  private static TB_booking = "booking";

  public static status = {
    placed: "Placed",
    accepted: "Accepted",
    lodged: "Lodged",
    completed: "Completed",
    rejected: "Rejected",
    expired: "Expired",
  }




  /**
   * Update
   */
  static update_Booking(bookingId: string, bookingData: any) {
    const data = cleanQuery(bookingData, ['status']);
    return runQuery(
      knex => knex(this.TB_booking).update(data).where({ bookingId })
    )
  }


  /**
   * Getters
   */

  static get_MonthlyCompletedBookings(query: any): Promise<[MError, any[]]> {
    const q = cleanQuery(query, ["status, branchId"]); //todo:debug clean query
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();

    let monthStart = new Date(thisYear, thisMonth);
    let monthEnd = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59);
    return runQuery<any[]>((knex) =>
      knex(this.VIEW_bookingsWithNamesAndAmount)
        .where(query)
        .where('placedTime', '>=', monthStart)
        .where('placedTime', '<', monthEnd));
  }

  static get_Bookings(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.VIEW_bookingsWithNamesAndAmount));
  }






}
