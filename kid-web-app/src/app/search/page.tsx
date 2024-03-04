'use client'
import { PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_OK } from "@/common/Constant";
import { ApiGetPartiesSearch } from "@/service/PartyService";
import { Party } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { GetDateFormat, GetDescriptionTextShort, GetLabelOfPartyType, GetTitleTextShort } from "@/util/TextUtil";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import PaginationBar from "@/component/PaginationBar";
export default function Page (){
    const [parties,setParties] = React.useState<Party[] | null>(null);
    const [isEmptyResult,setIsEmptyResult] = React.useState(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    //URL PARAMS
    const searchParams = useSearchParams()
    const Type = searchParams.get('Type')??PARTY_TYPE_LIST[0].value;
    const dateString = searchParams.get('DateBooking')??'';
    const SlotTime = searchParams.get('SlotTime')??'';
    const People = searchParams.get('People')??'';


    React.useEffect(()=>{
        fetchGetPartiesSearch(1);
    }, [Type, dateString, SlotTime, People]);

    async function fetchGetPartiesSearch(page: number){
        const result = await ApiGetPartiesSearch(Type, dateString, SlotTime, People, page, 10);
        if(result && result.code == STATUS_CODE_OK){
            setParties(result.data);
            const totalPage = result.totalPage ?? 1;
            setTotalPage(totalPage);
            window.scrollTo(0, 0);
            if(result.data.length > 0){
                setIsEmptyResult(false);
            }else{
                setIsEmptyResult(true); 
            }
        }
    }

    function handleSubmitSearch(values: { DateBooking: string; People: number; Type: string; BookingTime: string; }): any {
        router.push(`/search?DateBooking=${values.DateBooking}&People=${values.People}&Type=${values.Type}&SlotTime=${values.BookingTime}`);
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchGetPartiesSearch(num);
    }

    return(
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3">
                        <div className="bg-primary p-0 p-sm-0 p-md-4" style={{borderRadius:15,height:700}}>
                            <h5 className="text-light">BOOKING SEARCH</h5>
                            <Formik 
                                initialValues={{
                                    People: parseInt(People),
                                    DateBooking: dateString,
                                    BookingTime: SlotTime,
                                    Type: Type,
                                }}
                                onSubmit={values=>handleSubmitSearch(values)}>
                                    {({ errors, setFieldValue, touched }) => (
                                    <Form>
                                        
                                        <div className="form-group">
                                            <label htmlFor="Type" className="text-light my-2">Type: </label>
                                            <Field as="select" className="form-select" name="Type">
                                                {PARTY_TYPE_LIST.map((row, index)=>(
                                                    <option key={index} value={row.value}>{row.label}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="People" className="text-light my-2">People: </label>
                                            <Field type="number" className="form-control" name="People" placeholder="Số người" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="DateBooking" className="text-light my-2">Booking date: </label>
                                            <Field type="date" className="form-control" name="DateBooking"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="BookingTime" className="text-light my-2">Booking time: </label>
                                            <Field type="time" className="form-control" name="BookingTime" />
                                        </div>
                                        <button type="submit" className="btn btn-light mt-4 w-100">BOOKING NOW</button>
                                    </Form>
                                    )}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9">
                        {isEmptyResult && (
                            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                <h3>No search results were found.</h3>
                            </div>
                        )}
                        {parties && parties.map((row, index)=>(
                            <div key={index} className="row mb-2 p-2 border-radius-gray">
                                <div className="col-6 col-sm-6 col-md-4">
                                    <Image alt={""} src={PUBLIC_IMAGE_UPLOAD + row.image} width={500} height={500} style={{width:'100%',height:200,borderRadius:15}}/>
                                </div>
                                <div className="col-6 col-sm-6 col-md-8">
                                    <Link href={`/detail/${row.partyID}?DateBooking=${dateString}&People=${People}&Type=${Type}&SlotTime=${SlotTime}`}><h4>{GetTitleTextShort(row.partyName)}</h4></Link>
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


