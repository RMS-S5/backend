

/**
 █░░█ █▀▀ █▀▀ █▀▀█ 　 █▀▄▀█ █▀▀█ █▀▀▄ █░░█ █░░ █▀▀
 █░░█ ▀▀█ █▀▀ █▄▄▀ 　 █░▀░█ █░░█ █░░█ █░░█ █░░ █▀▀
 ░▀▀▀ ▀▀▀ ▀▀▀ ▀░▀▀ 　 ▀░░░▀ ▀▀▀▀ ▀▀▀░ ░▀▀▀ ▀▀▀ ▀▀▀
 */

export interface UserAccount {
    userId: string;
    firstName: string;
    lastName?: string;
    email?: string;
    accountType: string
    password: string
}

export interface Customer {
    userId: string;
    mobileNumber? : number
    accountLevel?: string
}

export interface Staff {
    userId: string;
    mobileNumber? : number
    nic?: string
    role?: string
    branch_id?: string
    birthday?: typeof Date
}


