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
  private static TB_branch = "branch";
  private static TB_bookedRoom = "booked_room";
  private static TB_room = "room";
  private static TB_roomType = "roomType";

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
          .where({ branchId: branchId, active: false }),
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

  // static get_Cart(query : any): Promise<[MError,Cart]> {
  //     const q = cleanQuery(query, ['cartId', 'customerId'])
  //     return runQuery<Cart>(
  //         (knex) => knex(this.TB_cart)
  //             .where(q).select(), {single : true, required : true});
  // }
}
