import {EHandler, Handler} from "../../../utils/types";
import {inspectBuilder, body, param} from "../../../utils/inspect";
import model, {MErr} from "../../../model";

/**
 * :: STEP 1
 * Validate Request
 */
const inspector = inspectBuilder(
    body("firstName").optional().isString().withMessage("firstName is required"),
    body("lastName").optional().isString().withMessage("lastName is is required"),
    body("mobileNumber").optional().isMobilePhone("any").withMessage("mobile phone is required"),
)

/**
 * :: STEP 2
 * Update customer profile
 */
const updateCustomerProfile: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId || req.user.userId

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber : req.body.mobileNumber
    };

    const customerData = {
    }
    const staffData = {
    }

    let code;
    // Sync model to database
    if (req.user.accountType == model.user.accountTypes.customer) {
        [{ code }] = await model.user.update_CustomerAccount(userId, userData, customerData);    
    } else {
        [{ code }] = await model.user.update_StaffAccount(userId, userData, staffData);    
    }
    

    if (code === MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("User not found")
            .send();
        return;
    }else if (code === MErr.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }
    r.pb.ISE();
};

/**
 * :: STEP 2
 * Update staff profile
 */
 const updateStaffProfile: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = req.params.userId || req.user.userId

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber : req.body.mobileNumber
    };

    const staffData = {
        
     }
     
     const filter = {
         userId,
         branchId : req.user?.branchId
     }

    // Sync model to database
    const [{ code }] = await model.user.update_StaffAccount(filter, userData, staffData);

    if (code === MErr.NOT_FOUND) {
        r.status.NOT_FOUND()
            .message("User not found")
            .send();
        return;
    }else if (code === MErr.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }
    r.pb.ISE();
};


/**
 * Request Handler Chain
 */


const updateProfile = {
    userProfile : [inspector,<EHandler> <EHandler> updateCustomerProfile],
    staffMember : [inspector, <EHandler> updateStaffProfile],
}
export default updateProfile;
