import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiGetSlotByRoomID(roomId: number){
    const response = await fetch(Constant.API_GET_SLOT_BY_ROOM_ID + roomId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

    
