import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";

export abstract class ReportModel {
  private static TB_report = "customer_report";
  private static TB_review = "customer_review";
  private static TB_roomTypes = "room_type";

  /**
   * Creators
   */

  static addCustomerReport(reportData: any) {
    return runQuery((knex) => knex(this.TB_report).insert(reportData));
  }
  static addRatingReview(reportData: any) {
    return runQuery((knex) => knex(this.TB_review).insert(reportData));
  }
}
