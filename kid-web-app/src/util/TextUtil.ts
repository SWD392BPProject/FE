import { PARTY_TYPE_LIST } from "@/common/Constant";

export const GetLabelOfPartyType = (value: string) => {
    for(let i = 0; i < PARTY_TYPE_LIST.length; i++){
        if(PARTY_TYPE_LIST[i].value == value){
            return PARTY_TYPE_LIST[i].label;
        }
    }
    return '';
}