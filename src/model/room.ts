import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import {} from "./types";

export abstract class RoomModel {
  private static TB_rooms = "room";
  private static TB_roomTypes = "room_type";

  /**
   * Getters
   */

  static get_Rooms(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_rooms));
  }
    
  static get_RoomTypes(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_roomTypes));
  }


    
}
