'use client'
import Image from "next/image";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import { Package, PackageOrder, UserInfoCookie } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_ERROR, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import React from "react";
import { ApiCreateParty } from "@/service/PartyService";
import { ApiCreateOrUpdateMenu } from "@/service/MenuService";
import { ApiCreatePackageOrder, ApiGetLatestPackage } from "@/service/PackageService";
import { FormatVND } from "@/util/TextUtil";
import { Button } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const [packages, setPackages] = React.useState<Package[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    
    React.useEffect(()=>{
        fetchAllPackage(1);
    },[]);

    async function fetchAllPackage(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetLatestPackage(page, TABLE_DATA_SIZE);
            if(result && result.code == STATUS_CODE_OK){
                setPackages(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleClickBuyNow = async (packageId: number) => {
        const resultCF = confirm("Are you sure to buy this package");
        if(!resultCF){
            return;
        }
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiCreatePackageOrder(packageId, userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                alert("Create Package Order Success!");
                const packageOrderData = result.data as PackageOrder;
                router.push("/package-payment/"+packageOrderData.packageOrderID);
            }else{
                alert("Create Package Order Failed!");
            }
        }
    }

    return(
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">BUY <span className="text-dark">PACKAGE</span></h1>

                <div className="d-block">
                    { packages && packages.length > 0 && packages.map((row, index)=>(
                        <div key={index} className="row mt-3 mb-2 p-2 border-radius-gray">
                            <div className="col-12 col-sm-12 col-md-4">
                                {row && (
                                    <Image alt={row.packageName??''} src={PUBLIC_IMAGE_UPLOAD + row.image} width={1000} height={1000} className="image-fit" style={{width:'100%',height:300,borderRadius:15}}/>
                                )}
                            </div>
                            <div className="col-12 col-sm-12 col-md-8">
                                <p><b>Package Name: </b><span>{row?.packageName}</span></p>
                                <p><b>Price: </b><span>{FormatVND(row?.price + "")}</span></p>
                                <p style={{textAlign:'justify'}}><b>Description: </b><span>{row?.description}</span></p>
                                <Button variant="contained" color="primary" startIcon={<AttachMoneyIcon />} onClick={()=>handleClickBuyNow(row.packageID)} >BUY NOW</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

