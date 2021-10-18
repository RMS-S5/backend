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
rRoom.post('/add-room', auth.branchManager, addRoom);
rRoom.post('/add-room-type', auth.manager, addRoomType);

/**
 * Getters
 */
rRoom.get('/rooms', auth.branchManager, getRooms);
rRoom.get('/room-types', auth.management, getRoomTypes);

/**
 * Update
 */
rRoom.put('/update-room/:roomNumber', auth.branchManager, updateRoom);
rRoom.put('/update-room-type/:roomType', auth.manager, updateRoomType);

/**
* Delete
*/
rRoom.put('/remove-room/:roomNumber', auth.branchManager, removeRoom);
rRoom.put('/remove-room-type/:roomType', auth.manager, removeRoomType);



export default rRoom;



