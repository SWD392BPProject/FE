import { DESCRIPTION_SHORT_LENGTH, PACKAGE_TYPE_LIST, PARTY_TYPE_LIST, TITLE_SHORT_LENGTH } from "@/common/Constant";

export const GetLabelOfPartyType = (value: string) => {
    for(let i = 0; i < PARTY_TYPE_LIST.length; i++){
        if(PARTY_TYPE_LIST[i].value == value){
            return PARTY_TYPE_LIST[i].label;
        }
    }
    return '';
}

export const GetLabelOfPartyTypeArray = (value: string) => {
    var split = value.split(",");
    var result = "";
    if(split && split.length > 1){
        result = GetLabelOfPartyType(split[0]);
        for(let k = 1; k < split.length;k++){
            result += ", "+ GetLabelOfPartyType(split[k]);
        }
    }else{
        return GetLabelOfPartyType(value);
    }
    return result;
}


export const RemoveDuplicateString = (array: string[]) => {
    return Array.from(new Set(array));
}

export const GetLabelOfPackageType = (value: number) => {
    for(let i = 0; i < PACKAGE_TYPE_LIST.length; i++){
        if(PACKAGE_TYPE_LIST[i].value == value){
            return PACKAGE_TYPE_LIST[i].label;
        }
    }
    return '';
}

export const TimeToString = (value: string) => {
    console.log(value);
    if(value.length>5){
        return value.slice(0,5);
    }
    return value;
}

export const GetDescriptionTextShort = (value: string) => {
    if(value.length > DESCRIPTION_SHORT_LENGTH){
        return value.slice(0, DESCRIPTION_SHORT_LENGTH) + "...";
    }
    return value;
}

export const GetDateRemaining = (value: string) => {
     const targetDate = new Date(value);
     const currentDate = new Date();
     
     // Calculate the difference in milliseconds
     const differenceMs = targetDate.getTime() - currentDate.getTime();
 
     // Convert milliseconds to days
     const daysRemaining = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
 
     return daysRemaining;
}

export const GetDateFormat = (value: string) => {
    return value.slice(0,10);
}

export const GetTitleTextShort = (value: string) => {
    if(value.length > TITLE_SHORT_LENGTH){
        return value.slice(0, TITLE_SHORT_LENGTH) + "...";
    }
    return value;
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