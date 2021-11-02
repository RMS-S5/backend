import { EHandler, Handler } from "../../../utils/types";
import model, { MErr } from "../../../model";
import { v4 as UUID } from "uuid";

const addNewBooking: Handler = async (req, res) => {
  const { r } = res;
  // let cartData ;

  // if(req.user?.userId != null){
  //     cartData = {cartId, customerId : req.user.userId};
  // }else{
  //     cartData = {cartId};
  // }
  let {
    customerId,
    first_name,
    email,
    branchId,
    bookingId,
    arrival,
    departure,
    amount,
    roomNumbers,
  } = req.body;
  amount = parseFloat(parseFloat(amount).toFixed(2));
  roomNumbers = roomNumbers.split(",").map(Number);
  let bookingData = {
    customerId,
    first_name,
    email,
    // branchId,
    bookingId,
    arrival,
    departure,
    amount,
    active: true,
    // roomNumbers,
  };
  let roomData: {
    bookingId: any;
    branchId: any;
    roomNumber: number;
    active: boolean;
  }[] = [];
  roomNumbers.forEach((room: number) => {
    roomData.push({ bookingId, branchId, roomNumber: room, active: true });
  });
  const [error, response] = await model.booking.addNewBooking(
    bookingData,
    roomData
  );
  if (error.code !== MErr.NO_ERROR) {
    r.pb.ISE();
    return;
  }

  r.status.OK().data({ bookingId }).message("Success").send();
};

export default [<EHandler>addNewBooking];
