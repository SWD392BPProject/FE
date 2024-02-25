'use client'
import Image from "next/image";
import { STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Package, Party, Room, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetLabelOfPackageType, GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { ApiGetLatestPackage } from "@/service/PackageService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [packages, setPackages] = React.useState<Package[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    React.useEffect(()=>{
        fetchAllPackageByHostId(1);
    },[]);

    async function fetchAllPackageByHostId(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetLatestPackage(page, TABLE_DATA_SIZE, userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setPackages(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchAllPackageByHostId(num);
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-danger">PACKAGE <span className="text-dark">MANAGEMENT</span></h1>
                <Link href="/admin/package/create"><button className="btn btn-danger">+ ADD PACKAGE</button></Link>
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Name</th>
                            <th className="w-20">Image</th>
                            <th className="w-20">Active Days</th>
                            <th className="w-20">Price</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { packages && packages.length > 0 && packages.map((row, index)=>(
                                <tr key={index}>
                                    <td>{row.packageName}</td>
                                    <td>
                                        <Image alt={""} width={400} height={400} src={"/ImageUpload/"+row.image} className="image-fit" style={{width: '100%', height: 150}} />
                                    </td>
                                    <td>{GetLabelOfPackageType(row.activeDays)}</td>
                                    <td>{FormatVND(row.price.toString())}</td>
                                    <td>
                                        {/* <Link href={"/admin/video-edit/" + video._id} className="me-3"><BorderColorIcon /></Link>
                                        <DeleteIcon className="cursor-pointer text-danger" onClick={()=>handleDeleteClick(video._id, video.title)}/> */}
                                    </td>
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={5}>Data is empty</td>
                                </tr>
                            )}
                        
                        </tbody>
                    </table>
                    {/* PAGINATION BAR */}
                    {totalPage != 0 && (
                        <PaginationBar totalPage={totalPage} currentPage={currentPage} handleChangePage={handleChangePage} />
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

