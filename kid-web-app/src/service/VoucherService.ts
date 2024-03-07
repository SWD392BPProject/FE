import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";



export async function ApiGetVoucherByUserID(userID: number){
    const response = await fetch(Constant.API_GET_VOUCHER_BY_USER_ID + userID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
export async function ApiAddVoucher(VoucherID: number, PackageOrderID: number){
    const data = new URLSearchParams();
    data.append("VoucherID", VoucherID.toString());
    data.append("PackageOrderID", PackageOrderID.toString());
    const response = await fetch(Constant.API_ADD_VOUCHER_TO_PACKAGE_ORDER, {
        method:"POST",
        body: data
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
