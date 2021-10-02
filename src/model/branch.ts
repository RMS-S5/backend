import { cleanQuery, runQuery, runTrx, TransactionBuilder } from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Table, Branch } from "./types";

export abstract class BranchModel {
    private static TB_table = "table";
    private static TB_branch = "branch";
    private static VIEW_tableBranch = "table_branch";


    /**
  * Creators
  */
    static add_Branch(branchData: Branch) {
        return runQuery(
            knex => knex(this.TB_branch).insert(branchData)
        )
    }
    static add_Table(tableData: Table) {
        return runQuery(
            knex => knex(this.TB_table).insert(tableData)
        )
    }


    /**
     * Update
     */
    static update_Table(tableNumber: number, branchId: string, tableData: any) {
        return runQuery(
            knex => knex(this.TB_table).update(tableData).where({ tableNumber, branchId })
        )
    }

    /**
     * Getters
     */

    static get_TableByVerificationCode(verificationCode: string): Promise<[MError, Table]> {
        return runQuery<Table>(
            (knex) => knex(this.VIEW_tableBranch)
                .where({ verificationCode }).select(), { single: true, required: true });
    }

    static get_Tables(query: any): Promise<[MError, any]> {
        const q = cleanQuery(query, ['branchId'])
        return runQuery<any>(
            (knex) => knex(this.TB_table)
                .where(q).select());
    }

    static get_Branches(): Promise<[MError, any]> {
        return runQuery<any>(
            (knex) => knex(this.TB_branch)
                .where({ active: true }).select());
    }

    /**
    * Remove 
    */
    static remove_Table(tableNumber: number, branchId: string) {
        return runQuery(
            knex => knex(this.TB_table).update({ active: false }).where({ tableNumber, branchId })
        )
    }

    static remove_Branch(branchId: string) {
        return runQuery(
            knex => knex(this.TB_branch).update({ active: false }).where({ branchId })
        )
    }





}
