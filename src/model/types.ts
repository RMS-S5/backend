
/**
 * User Model
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

/**
 * Product Model
 */
export interface Category{
    categoryId: string,
    categoryName: string,
    description: string,
    imageUrl: string,
    active : boolean
}

/**
 * Cart Model
 */
export interface Cart{
    cartId : string,
    customerId? : string
}

export interface CartItem{
    cartItemId : string,
    foodItemId : string,
    price : number,
    cartId : string,
    quantity : number,
    active? : boolean
}

/**
 * Order Model
 */
export interface Order{
    orderId : string,
    customerId?: string,
    totalAmount : number,
    tableNumber : number,
    branchId : string,
    orderStatus : string,
    placedTime? : typeof Date,
    waiterId? : string,
    kitchenStaffId? : string,
    active? : boolean
}

/**
 * Branch Model
 */
export interface Table{
    tableNumber : number,
    branchId : string,
    verificationCode? : string,
    lastUpdateTime? : typeof Date,
    active? : boolean
}

