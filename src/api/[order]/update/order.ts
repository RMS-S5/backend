import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";
import { body, inspectBuilder, param } from "../../../utils/inspect";
import FireBaseService from "../../../utils/firebase/cloud_messaging";

/**
 * Validate Request
 */

const inspector = inspectBuilder(
  param("orderId").exists().withMessage("Food item id is required"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Total amount should be a number"),
  body("orderStatus").optional()
);

const updateOrder: Handler = async (req, res) => {
  const { r } = res;
  const orderId = req.params.orderId;
  const { price, orderStatus } = req.body;
  var tempData = { price, orderStatus };
  var orderData;
  if (req.user.accountType == model.user.accountTypes.waiter) {
    orderData = { ...tempData, waiterId: req.user.userId };
  } else if (req.user.accountType == model.user.accountTypes.kitchenStaff) {
    orderData = { ...tempData, kitchenStaffId: req.user.userId };
  }

  console.log(orderId);

  var message = {};
  switch (orderStatus) {
    case model.order.orderStatus.prepared:
      message = {
        notification: {
          title: "New Orders",
          body: `New prepared orders are added.`,
        },
        data: {
          orderStatus: orderStatus,
        },
        topic: "order-waiter",
      };
      break;
    case model.order.orderStatus.placed:
      message = {
        notification: {
          title: "New Orders",
          body: `New orders are placed.`,
        },
        data: {
          orderStatus: orderStatus,
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
        },
        condition:
          "'order-kitchen-staff' in topics || 'order-waiter' in topics",
      };
      break;
    default:
      break;
  }

  const message_customer = {
    notification: {
      title: "Update about your order",
      body: `Your order status is ${orderStatus}`,
    },
    data: {
      orderStatus: orderStatus,
    },
    topic: "order-customer",
  };

  try {
    if (Object.keys(message).length != 0) {
      const fireBaseAdmin = FireBaseService.getInstance();
      await FireBaseService.sendMessageToTopics(fireBaseAdmin, message);
      await FireBaseService.sendMessageToTopics(fireBaseAdmin, message_customer);
    }
  } catch (error) {
    console.log(error);
    return;
  }

  const [error, response] = await model.order.update_Order(orderId, orderData);
  if (error.code == MErr.NOT_FOUND) {
    r.status.NOT_FOUND().message("Not found").send();
    return;
  } else if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().message("Success").send();
};

export default [inspector, <EHandler>updateOrder];
