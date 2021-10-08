import { runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";

export abstract class CustomerReportModel {
  private static TB_customerReport = "customer_report";


  /**
  * Getters
  */
  static get_CustomerReports(): Promise<[MError, any[]]> {
    return runQuery<any[]>((knex) => knex(this.TB_customerReport).where({active : true}));
  }

  


}
