'use client'
import { PUBLIC_IMAGE_UPLOAD, STATUS_CODE_OK } from "@/common/Constant";
import { ApiGetPartiesSearch } from "@/service/PartyService";
import { Party } from "@/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { GetDateFormat, GetDescriptionTextShort, GetLabelOfPartyType, GetTitleTextShort } from "@/util/TextUtil";
import Link from "next/link";
export default function Page (){
    const [parties,setParties] = React.useState<Party[] | null>(null);

    const Type = "SINHNHAT";
    const dateString = new Date().toString();
    const SlotTime = "09:00";
    const People = 15;

    React.useEffect(()=>{
        fetchGetPartiesSearch();
    }, []);

    async function fetchGetPartiesSearch(){
        const result = await ApiGetPartiesSearch(Type, dateString, SlotTime, People, 1, 10);
        if(result && result.code == STATUS_CODE_OK){
            console.log(result.data);
            setParties(result.data);
        }
    }

    return(
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3">
                        <div className="bg-primary p-0 p-sm-0 p-md-4" style={{borderRadius:15,height:700}}>
                            <h5 className="text-light">BOOKING SEARCH</h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Type" className="text-light my-2">Type: </label>
                                    <input className="form-control" name="Type" placeholder="Sinh nhật" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="People" className="text-light my-2">People: </label>
                                    <input type="number" className="form-control" name="Peole" placeholder="Số người" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingDate" className="text-light my-2">Booking date: </label>
                                    <input type="date" className="form-control" name="BookingDate"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingTime" className="text-light my-2">Booking time: </label>
                                    <input type="time" className="form-control" name="BookingTime" />
                                </div>
                                <button className="btn btn-light mt-4 w-100">BOOKING NOW</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9">
                        {parties && parties.map((row, index)=>(
                            <div className="row mb-2 p-2 border-radius-gray">
                                <div className="col-6 col-sm-6 col-md-4">
                                    <Image alt={""} src={PUBLIC_IMAGE_UPLOAD + row.image} width={500} height={500} style={{width:'100%',height:200,borderRadius:15}}/>
                                </div>
                                <div className="col-6 col-sm-6 col-md-8">
                                    <Link href={"/detail/"+row.partyID}><h4>{GetTitleTextShort(row.partyName)}</h4></Link>
                                    <div className="d-flex">
                                        <span><b>Type:</b> {GetLabelOfPartyType(row.type)}</span>
                                        <b className="ms-5">Viewed:</b> {row.monthViewed}
                                    </div>
                                    <div className="d-flex">
                                        <span><b>Address:</b> {row.address}</span><br/>
                                        <b className="ms-5">Create Date:</b> {GetDateFormat(row.createDate)}
                                    </div>
                                    <p style={{textAlign:'justify'}}>{GetDescriptionTextShort(row.description)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


