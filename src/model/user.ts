import {runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import {MError} from "../utils/dbMan/merror";
import {UserAccount, Customer, Staff} from "./types";
import { cleanQuery } from './../utils/dbMan/resolver';

/**
 * Transaction Pieces
 * @param userData
 */

/**
 * Queries
 * @param userData
 * @param localAccount
 */
export abstract class UserModel {

    private static TB_userAccount = "userAccount";
    private static TB_customer = "customer";
    private static TB_staff = "staff";
    private static VIEW_userFullData = "userFullData";
    private static VIEW_staffFullFata = "staff_full_data"; //todo:clarify

    static $add_UserData(userData: UserAccount): TransactionBuilder {
    return async trx => {
        return trx(this.TB_userAccount).insert(userData);
    };
    };

    static accountTypes = {
        customer: "Customer",
        manager: "Manager",
        branchManager : "Branch Manager",
        waiter: "Waiter",
        kitchenStaff: "Kitchen Staff",
        receptionist : "Receptionist"
    }

    /**
     * Creators
     */
    static add_CustomerAccount(accountData: UserAccount, customerData: Customer) {
        return runTrx(async trx =>  {
            await this.$add_UserData(accountData)(trx);
            return trx(this.TB_customer).insert(customerData);
        });
    };

    static add_StaffMemberAccount(accountData: UserAccount, staffMemberData: any) {
        return runTrx(async trx =>  {
            await this.$add_UserData(accountData)(trx);
            return trx(this.TB_staff).insert(staffMemberData);
        });
    };

    static add_StaffAccount(accountData: UserAccount, staffData: Staff) {
        return runTrx(async trx =>  {
            await this.$add_UserData(accountData)(trx);
            return trx(this.TB_staff).insert(staffData);
        });
    };

    /**
     * Update
     * TODO: update functions not set
     */
    static update_StaffAccount(filter: any, accountD: any, staffD: any) {
        const filterData = cleanQuery(filter);
        const accountData = cleanQuery(accountD);
        const staffData = cleanQuery(staffD);
        return runTrx(async trx => {
            if (Object.keys(accountData).length != 0) { 
                await trx(this.TB_userAccount).update(accountData).where({userId :filterData['userId']});
            }
            if (Object.keys(staffData).length != 0) {
                await trx(this.TB_staff).update(staffData).where(filterData);
            }
                return trx(this.TB_staff);
        });
    };

    static update_CustomerAccount(userId: string, accountD: any, customerD: any) {
        const accountData = cleanQuery(accountD);
        const customerData = cleanQuery(customerD);
        return runTrx(async trx =>  {
            if (Object.keys(accountData).length != 0) {
                await trx(this.TB_userAccount).update(accountData).where({userId});
            }
            if (Object.keys(customerData).length != 0) {
                await trx(this.TB_customer).update(customerData).where({ userId });
            }
                return trx(this.TB_customer);
        });
    };

    static update_UserAccount(userId: string, data: any) {
        return runQuery(
            knex => knex(this.TB_userAccount).update(data).where({userId})
        )
    }

    /**
     * Getters
     */
    // static async get_AdminAccount(username: string): Promise<[MError, AdminAccount]> {
    //     return runQuery<AdminAccount>(
    //         knex => knex(this.TB_adminAccount).where({username}),
    //         {
    //             single: true
    //         }
    //     )
    // }
    static get_StaffMembers(query: any): Promise<[MError, any[]]> {
        return runQuery<any[]>((knex) => knex(this.VIEW_userFullData).where({...query, active : true}));
      }

    static get_UserAccountByEmail(email: string): Promise<[MError, any]> {
        return runQuery<any>(
            knex => knex(this.VIEW_userFullData).where({email, active : true}),
            {
                single: true
            }
        )
    }

    static get_UserAccountByUserId(userId: string): Promise<[MError, any]> {
        return runQuery<any>(
            knex => knex(this.VIEW_userFullData).where({userId, active : true}),
            {
                single: true
            }
        )
    }

}
