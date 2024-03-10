import * as Constant from "@/common/Constant";
import { JsonBody, Package } from "@/types";

export async function ApiCreatePackage(AdminUserID: number,PackageName: string, Price: number, ActiveDays: number, Description: string, Image: File | null, token: string, PackageID?: string){
    var data = new FormData();    
    data.append("AdminUserID", AdminUserID.toString());
    data.append("PackageName", PackageName);
    data.append("ActiveDays", ActiveDays.toString());
    data.append("Price", Price.toString());
    data.append("Description", Description);
    if(PackageID){
        data.append("PackageID", PackageID);
    }
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_PACKAGE, {
        method: PackageID?"PUT":"POST",
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

export async function ApiGetPackageByID(id: string){
    const response = await fetch(Constant.API_PACKAGE_ORIGIN + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiDeletePackageByID(id: string){
    const response = await fetch(Constant.API_PACKAGE_ORIGIN + id, {
        method:"DELETE"
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}


export async function ApiGetLatestPackage(page: number,size: number){
    const response = await fetch(Constant.API_GET_LATEST_PACKAGE + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiCreatePackageOrder(PackageId : number, UserID: number){
    const data = new URLSearchParams();
    data.append("PackageId", PackageId.toString());
    data.append("UserID", UserID.toString());
    const response = await fetch(Constant.API_CREATE_PACKAGE_ORDER, {
        method:"POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetPackageOrderByID(id: number){
    const response = await fetch(Constant.API_GET_PACKAGE_ORDER_BY_ID + id);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiChangePackageOrderStatus(packageOrderID: string, status: string){
    const response = await fetch(Constant.API_CHANGE_STATUS_PACKAGE_ORDER + packageOrderID + "/" + status);
    if(response.ok){ 
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiCheckBuyPackage(hostId: string){
    const response = await fetch(Constant.API_CHECK_BUY_PACKAGE + hostId);
    if(response.ok){ 
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

export async function ApiGetPackageOrderByUserID(page:number, size:number ,userID: number){
    const response = await fetch(Constant.API_GET_PACKAGE_ORDER_BY_USER_ID + userID + "/" + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
