'use client'
import Image from "next/image";
import { STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiDeletePartyByID, ApiGetLatestParty } from "@/service/PartyService";
import { Party, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ApiCheckBuyPackage } from "@/service/PackageService";

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [parties, setParties] = React.useState<Party[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [isBuyPackage, setIsBuyPackage] = React.useState(false);
    React.useEffect(()=>{
        fetchAllPartyByHostId(1);
        fetchCheckBuyPackage();
    },[]);

    async function handleClickDeleteById(id: string){
        const resultCf = confirm("Are you sure delete this party?")
        if(resultCf){
            const result = await ApiDeletePartyByID(id);
            if(result && result.code == STATUS_CODE_OK){
                alert("Delete party successfully!");
                fetchAllPartyByHostId(currentPage);
            }else{
                alert("Delete party failed!");
            }
        }
    }

    async function fetchCheckBuyPackage(){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiCheckBuyPackage(userInfoCookie.userID.toString());
            if(result && result.code == STATUS_CODE_OK){
                setIsBuyPackage(result.data);
            }
        }
    }

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
                {!isBuyPackage && (
                    <div className="bg-warning text-white px-3 pt-4 pb-3 mb-2">
                        <p className="fs-24">Notice: Let's buy any package so your party can be found on our website. <Link className="text-primary text-decoration-underline cursor-pointer" href={"/host/buy-package"}>Buy now</Link></p>
                    </div>
                )}
                <Link href="/host/party/create"><Button variant="contained" color="primary" startIcon={<AddIcon />}>CREATE PARTY</Button></Link>
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
                                        <Link href={"/host/party/edit/" + party.partyID} className="text-decoration-underline text-primary me-2"><Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button></Link>
                                        <Button variant="contained" className="bg-dark" startIcon={<DeleteIcon />} onClick={()=>handleClickDeleteById(party.partyID.toString())}>Delete</Button>
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

