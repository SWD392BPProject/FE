'use client'
import Image from "next/image";
import { STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetLatestParty } from "@/service/PartyService";
import { Party, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [parties, setParties] = React.useState<Party[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    React.useEffect(()=>{
        fetchAllPartyByHostId(1);
    },[]);

    async function fetchAllPartyByHostId(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetLatestParty(page, TABLE_DATA_SIZE, userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setParties(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchAllPartyByHostId(num);
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">PARTY <span className="text-dark">MANAGEMENT</span></h1>
                <Link href="/host/party/create"><button className="btn btn-primary">+ ADD PARTY</button></Link>
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Name</th>
                            <th className="w-20">Image</th>
                            <th className="w-20">Type</th>
                            <th className="w-20">Address</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { parties && parties.length > 0 && parties.map((party, index)=>(
                                <tr key={index}>
                                    <td>{party.partyName}</td>
                                    <td>
                                        <Image alt={""} width={400} height={400} src={"/ImageUpload/"+party.image} className="image-fit" style={{width: '100%', height: 150}} />
                                    </td>
                                    <td>{GetLabelOfPartyType(party.type)}</td>
                                    <td>{party.address}</td>
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

