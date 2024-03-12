import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiGetLast4Month(){
    const response = await fetch(Constant.API_GET_LAST_4_MONTH_REVENUE);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
