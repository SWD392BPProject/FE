import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiGetScheduleByHostID(hostId: number){
    const response = await fetch(Constant.API_GET_SCHEDULE_BY_HOST_ID + hostId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
