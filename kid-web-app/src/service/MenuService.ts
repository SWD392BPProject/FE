import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateOrUpdateMenu(HostUserId: number,MenuName: string, Price: number, Description: string, Image: File | null, token: string, MenuID?: string){
    var data = new FormData();    
    data.append("HostUserId", HostUserId.toString());
    data.append("MenuName", MenuName);
    data.append("Price", Price.toString());
    data.append("Description", Description);
    if(MenuID){
        data.append("MenuID", MenuID);
    }
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_MENU, {
        method: MenuID?"PUT":"POST",
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

export async function ApiDeleteMenuByID(id: string){
    const response = await fetch(Constant.API_MENU_ORIGIN + id, {
        method:"DELETE"
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiGetMenuByPartyID(partyId: number){
    const response = await fetch(Constant.API_GET_MENU_BY_PARTY_ID + partyId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiGetMenuByID(id: string){
    const response = await fetch(Constant.API_GET_MENU_BY_ID + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetMenuByHostID(hostID: number){
    const response = await fetch(Constant.API_GET_MENU_BY_HOST_ID + hostID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetMenuByHostIDPaging(hostID: number, page: number, size:number){
    const response = await fetch(Constant.API_GET_MENU_BY_HOST_ID_PAGING + hostID + "/" + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
