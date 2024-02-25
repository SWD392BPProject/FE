import { NUMBER_BUTTON_PAGINATION } from "@/common/Constant";
import { ButtonPagination } from "@/types";
import { Button } from "@mui/material";
import React from "react";

type Params = {
    totalPage : number,
    currentPage : number,
    handleChangePage: (num : number) => void,
}

export default function PaginationBar( { totalPage, currentPage, handleChangePage }: Params ){
    const [arrayButtonPagination, setArrayButtonPagination] = React.useState<ButtonPagination[]>([]);

    React.useEffect(()=>{
        calcButton(currentPage);
    }, [currentPage, totalPage]);

    function calcButton(page: number){
        var start = currentPage - 3;
        var end = currentPage + 2;
        if(totalPage >= NUMBER_BUTTON_PAGINATION){
            if(currentPage < 3){
                start = 0;
                end = NUMBER_BUTTON_PAGINATION;
            }else if(currentPage > totalPage - 2){
                start = totalPage - NUMBER_BUTTON_PAGINATION;
                end = totalPage;
            }
        }else{
            start = 0;
            end = totalPage;
        }
        setArrayButtonPagination(calcArrayButton(start, end, page));
    }

    function calcArrayButton(start: number, end: number, page: number){
        const arrayButton = [] as ButtonPagination[];
        for(let i = start; i < end; i++){
            const item: ButtonPagination = {
                page: i + 1,
                isActive: page == i+1 && true || false
            }
            arrayButton.push(item);
        }
        return arrayButton;
    }

    return(
        <div className="d-flex justify-content-center mb-5">
            {arrayButtonPagination && arrayButtonPagination.length > 1 &&  arrayButtonPagination.map((item, index)=>(
                <Button key={index} className="mx-1 p-0" variant={item.isActive && `contained` || `outlined`} color="primary" style={{width:40, minWidth:40, height:40}} onClick={()=>handleChangePage(item.page)} >{item.page}</Button>
            ))}
        </div> 
    );
}
