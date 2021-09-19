import {cleanQuery, runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import { MError } from "../utils/dbMan/merror";
import { Table} from "./types";

export abstract class BranchModel {
    private static TB_table = "table";


    /**
     * Creators
     */


    /**
     * Update
     */
    static update_Table(tableNumber : number,branchId : string,  tableData : any) {
        return runQuery(
            knex => knex(this.TB_table).update(tableData).where({tableNumber, branchId})
        )
    }

    /**
     * Getters
     */

    static get_TableByVerificationCode(verificationCode : string): Promise<[MError,Table]> {
        return runQuery<Table>(
            (knex) => knex(this.TB_table)
                .where({verificationCode}).select(), {single : true, required : true});
    }

    // static get_Cart(query : any): Promise<[MError,Cart]> {
    //     const q = cleanQuery(query, ['cartId', 'customerId'])
    //     return runQuery<Cart>(
    //         (knex) => knex(this.TB_cart)
    //             .where(q).select(), {single : true, required : true});
    // }





}
