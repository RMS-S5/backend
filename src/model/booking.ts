import { cleanQuery, runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Booking } from "./types";

export abstract class BookingModel {
  private static VIEW_bookingsWithNamesAndAmount = "bookings_with_names_and_amount";
  private static TB_booking = "booking";
  private static TB_branch = "branch";
  private static TB_bookedRoom = "booked_room";
  private static TB_room = "room";
  private static TB_roomType = "roomType";

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

  static getBookingByCustomer(customerId: string): Promise<[MError, Booking]> {
    return runQuery<Booking>(
      (knex) =>
        knex
          .select(
            "booking.bookingId",
            "booking.arrival",
            "booking.departure",
            "booking.amount",
            "booked_room.roomNumber",
            "branch.branch_name"
          )
          .from(this.TB_booking)
          .leftOuterJoin(
            "booked_room",
            "booking.booking_id",
            "booked_room.booking_id"
          )
          .leftOuterJoin("branch", "booked_room.branch_id", "branch.branch_id")
          .where({ "booking.customerId": customerId })
          // .groupBy("booking.booking_id", "booked_room.booking_idf")
          .select(),
      { required: true }
    );
  }
  static allAvailableRoomsByBranch(
    branchId: string
  ): Promise<[MError, Booking]> {
    return runQuery<Booking>(
      (knex) =>
        knex
          .select("*")
          .from(this.TB_room)
          .leftJoin("room_type", "room.room_type", "room_type.room_type")
          .where({ branchId: branchId, "room.active": false }),
      { required: true }
    );
  }
  static $updaterooms(roomData: any): TransactionBuilder {
    return async (trx) => {
      return trx(this.TB_room)
        .where({ branchId: roomData.branchId, roomNumber: roomData.roomNumber })
        .update({ active: true });
    };
  }

  static $bookedRoom(roomData: any): TransactionBuilder {
    return async (trx) => {
      return trx(this.TB_bookedRoom).insert(roomData);
    };
  }

  static $booking(bookingData: any): TransactionBuilder {
    return async (trx) => {
      return trx(this.TB_booking).insert(bookingData);
    };
  }

  static addNewBooking(bookingData: any, roomData: any) {
    return runTrx(async (trx) => {
      await this.$booking(bookingData)(trx);
      roomData.slice(0, -1).forEach(async (room_data: any) => {
        await this.$bookedRoom(room_data)(trx);
      });
      roomData.forEach(async (room_data: any) => {
        await this.$updaterooms(room_data)(trx);
      });
      return await trx(this.TB_bookedRoom).insert(roomData.pop());
    });
  }






}
