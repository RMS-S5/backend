import {runQuery, runTrx, TransactionBuilder} from "../utils/dbMan";
import {MError} from "../utils/dbMan/merror";
import {UserAccount, Customer, Staff} from "./types";

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
    static update_UserDetails(userId: string, data: any) {
        return runQuery(
            knex => knex(this.TB_userAccount).update(data).where({userId})
        )
    }

    static update_LocalAccount(userId: string, data: any) {
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
