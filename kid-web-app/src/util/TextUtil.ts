import { PACKAGE_TYPE_LIST, PARTY_TYPE_LIST } from "@/common/Constant";

export const GetLabelOfPartyType = (value: string) => {
    for(let i = 0; i < PARTY_TYPE_LIST.length; i++){
        if(PARTY_TYPE_LIST[i].value == value){
            return PARTY_TYPE_LIST[i].label;
        }
    }
    return '';
}

export const GetLabelOfPackageType = (value: number) => {
    for(let i = 0; i < PACKAGE_TYPE_LIST.length; i++){
        if(PACKAGE_TYPE_LIST[i].value == value){
            return PACKAGE_TYPE_LIST[i].label;
        }
    }
    return '';
}

export const FormatVND = (value: string) => {
     // Xóa bỏ tất cả các ký tự không phải số từ chuỗi
     const numberString = value.replace(/\D/g, '');

     // Chuyển chuỗi số thành số nguyên
     const number = parseInt(numberString, 10);
 
     // Format số thành tiền VND
     const formattedValue = new Intl.NumberFormat('vi-VN', {
         style: 'currency',
         currency: 'VND',
     }).format(number);
    return formattedValue;
}