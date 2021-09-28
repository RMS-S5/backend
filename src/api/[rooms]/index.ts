import {Router} from "express";
import auth from "../../utils/auth"

import getRooms from "./get/rooms";
import getRoomTypes from "./get/room_types";

const rRoom = Router();

/**
 * Getters
 */
rRoom.get('/rooms', getRooms);
rRoom.get('/room-types',  getRoomTypes);


export default rRoom;



