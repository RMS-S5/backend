import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Room, RoomType } from "./types";

export abstract class RoomModel {
  private static TB_rooms = "room";
  private static TB_roomTypes = "room_type";

  /**
  * Creators
  */
  static add_Room(roomData: Room) {
    return runQuery(
      knex => knex(this.TB_rooms).insert(roomData)
    )
  }

  static add_RoomType(roomTypeData: RoomType) {
    return runQuery(
      knex => knex(this.TB_roomTypes).insert(roomTypeData)
    )
  }

  /**
  * Update
  */
  static update_Room(roomNumber: number, branchId: string, roomData: any) {
    return runQuery(
      knex => knex(this.TB_rooms).update(roomData).where({ roomNumber, branchId })
    )
  }

  static update_RoomType(roomType: string, roomTypeData: any) {
    return runQuery(
      knex => knex(this.TB_roomTypes).update(roomTypeData).where({ roomType })
    )
  }

  /**
  * Getters
  */
  static get_Rooms(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_rooms).where({active : true}));
  }

  static get_RoomTypes(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_roomTypes).where({active : true}));
  }

  /**
  * Remove 
  */
  static remove_Room(roomNumber: number, branchId: string) {
    return runQuery(
      knex => knex(this.TB_rooms).update({active : false}).where({ roomNumber, branchId })
    )
  }

  static remove_RoomType(roomType: string) {
    return runQuery(
      knex => knex(this.TB_roomTypes).update({active : false}).where({ roomType })
    )
  }



}
