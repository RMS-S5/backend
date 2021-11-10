import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder, param } from "../../../utils/inspect";
import FireBaseService from "../../../utils/firebase/cloud_messaging";
import { MErrorCode } from "../../../utils/dbMan/merror";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
  param("orderId").exists().withMessage("Food item id is required"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Total amount should be a number"),
  body("orderStatus").optional(),
  body("fcmToken").optional()
);

const orderStatusInspector = inspectBuilder(
  body("orderStatus").exists().withMessage("Order status is required"),
  body("orderIds").exists().withMessage("Order ids are required")
);

/**
 * Update order
 */
const updateOrder: Handler = async (req, res) => {
  const { r } = res;
  const orderId = req.params.orderId;
  const { price, orderStatus, fcmToken } = req.body;
  var tempData = { price, orderStatus };
  var orderData;
  if (req.user.accountType == model.user.accountTypes.waiter) {
    orderData = { ...tempData, waiterId: req.user.userId };
  } else if (req.user.accountType == model.user.accountTypes.kitchenStaff) {
    orderData = { ...tempData, kitchenStaffId: req.user.userId };
  }

  var message = {};
  switch (orderStatus) {
    case model.order.orderStatus.prepared:
      message = {
        notification: {
          title: "New Order",
          body: `New prepared order is added.`,
        },
        data: {
          orderStatus: orderStatus,
          type: "staff",
        },
        topic: "order-waiter",
      };
      break;
    case model.order.orderStatus.placed:
      message = {
        notification: {
          title: "New Order",
          body: `New orders is placed.`,
        },
        data: {
          orderStatus: orderStatus,
          type: "staff",
        },
        topic: "order-kitchen-staff",
      };

      break;
    case model.order.orderStatus.waiterAssigned:
      message = {
        notification: {
          title: "Order is assigned",
          body: `Order is assigned to waiter`,
        },
        data: {
          orderStatus: orderStatus,
          type: "staff",
        },
        // topic: "order-kitchen-staff",
        condition:
          "'order-kitchen-staff' in topics || 'order-waiter' in topics",
      };
      break;
    default:
      break;
  }

  const [error, response] = await model.order.update_Order(orderId, orderData);
  if (error.code == MErr.NOT_FOUND) {
    r.status.NOT_FOUND().message("Not found").send();
    return;
  } else if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  /**
   * Send cloud message about order update.
   */
  try {
    const fireBaseAdmin = FireBaseService.getInstance();
    if (Object.keys(message).length != 0) {
      await FireBaseService.sendMessageToTopics(fireBaseAdmin, message);
    }
    const [err, res] = await model.order.get_OrderByOrderId(orderId);
    const fcmToken: any = res?.fcmToken;

    if (fcmToken != null) {
      const message_customer = {
        notification: {
          title: "Update about your order",
          body: `Your order status is ${orderStatus}`,
        },
        data: {
          orderStatus: orderStatus,
          type: "customer",
        },
        token: fcmToken,
      };

      await FireBaseService.sendMessageToSingleDevice(
        fireBaseAdmin,
        message_customer
      );
    }
  } catch (error) {
    console.log(error);
    r.status.ERROR().message("Notification sending error").send();
    return;
  }

  r.status.OK().message("Success").send();
};

const updateOrdersStatus: Handler = async (req, res) => {
  const { r } = res;
  const { orderStatus, orderIds } = req.body;

  const [error, response] = await model.order.update_OrdersStatus(
    orderStatus,
    orderIds
  );
  if (error.code == MErr.NO_ERROR) {
    r.status.OK().message("Success").send();
    return;
  } else {
    r.pb.ISE();
  }
};

const updateOrderData = {
  order: [inspector, <EHandler>updateOrder],
  ordersStatus: [orderStatusInspector, <EHandler>updateOrdersStatus],
};
export default updateOrderData;
