import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreatePackage(AdminUserID: number,PackageName: string, Price: number, ActiveDays: number, Description: string, Image: File | null, token: string){
    var data = new FormData();    
    data.append("AdminUserID", AdminUserID.toString());
    data.append("PackageName", PackageName);
    data.append("ActiveDays", ActiveDays.toString());
    data.append("Price", Price.toString());
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_PACKAGE, {
        method: "POST",
        body: data,
        headers: {
            [Constant.HEADER_TOKEN] : token
        }
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null
}

export async function ApiGetLatestPackage(page: number,size: number, hostId: number){
    const response = await fetch(Constant.API_GET_LATEST_PACKAGE + page + "/" + size + "/" + hostId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

    
