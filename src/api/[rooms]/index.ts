import { Router } from "express";
import auth from "../../utils/auth"

import addRoom from "./add/room";
import addRoomType from "./add/room_type";
import getRooms from "./get/rooms";
import getRoomTypes from "./get/room_types";
import updateRoom from "./update/room";
import updateRoomType from "./update/room_type";
import removeRoom from "./remove/room";
import removeRoomType from "./remove/room_type";

const rRoom = Router();

/**
 * Post
 */
rRoom.post('/add-room', addRoom);
rRoom.post('/add-room-type', addRoomType);

/**
 * Getters
 */
rRoom.get('/rooms', getRooms);
rRoom.get('/room-types', getRoomTypes);

/**
 * Update
 */
rRoom.put('/update-room/:roomNumber', updateRoom);
rRoom.put('/update-room-type/:roomType', updateRoomType);

/**
* Delete
*/
rRoom.put('/remove-room/:roomNumber', removeRoom);
rRoom.put('/remove-room-type/:roomType', removeRoomType);



export default rRoom;



