'use client';
import { STATUS_CODE_OK } from "@/common/Constant";
import { ApiGetLast4Month } from "@/service/StatisticService";
import { ApiGetTopHostUser } from "@/service/UserService";
import { Statistic, User } from "@/types";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import Image from "next/image";
import { FormatVND } from "@/util/TextUtil";
interface DataChart{
    data: number[],
}

async function fetchApiGetLast4Month(){
    const result = await ApiGetLast4Month();
    if(result && result.code == STATUS_CODE_OK){
        const statisticDataList = result.data as Statistic[][];
        return [
            {
                view: statisticDataList[3][0].amount,
                rating: statisticDataList[3][1].amount,
                booking: statisticDataList[3][2].amount,
                packageOrder: statisticDataList[3][3].amount,
                month: '12/2023',
            },
            {
                view: statisticDataList[2][0].amount,
                rating: statisticDataList[2][1].amount,
                booking: statisticDataList[2][2].amount,
                packageOrder: statisticDataList[2][3].amount,
                month: '1/2024',
            },
            {
                view: statisticDataList[1][0].amount,
                rating: statisticDataList[1][1].amount,
                booking: statisticDataList[1][2].amount,
                packageOrder: statisticDataList[1][3].amount,
                month: '2/2024',
            }, 
            {
                view: statisticDataList[0][0].amount,
                rating: statisticDataList[0][1].amount,
                booking: statisticDataList[0][2].amount,
                packageOrder: statisticDataList[0][3].amount,
                month: '3/2023',
            },
          ];
    }
    return null;
}

async function fetchApiGetTopUser(){
    const result = await ApiGetTopHostUser(5);
    if(result && result.code == STATUS_CODE_OK){
        return result.data as User[];
    }
    return null;
}

export default async function Page (){
    const dataset = await fetchApiGetLast4Month();
    const userTop = await fetchApiGetTopUser();
    

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="mb-3 text-center mb-3">Top host revenue in month</h1>
                <div className="d-flex justify-content-center">
                    {userTop && userTop.map((row, index)=>(
                        <div key={index} className="mx-3">
                            <div style={{height:150,width:150}}>
                                <Image alt={"No avatar image"} width={400} height={400} src={"/ImageUpload/"+row.image} className="image-fit" style={{width: '100%', height: 150,borderRadius:'50%'}} />
                            </div>
                            <p className="text-center fw-bold mt-3">{row.fullName}</p>
                            <p className="text-center">{FormatVND(row.revenue.toString())}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="mb-3 text-center">View & Feedback statistic</h1>
                <BarChart
                    dataset={dataset??[]}
                    series={[
                        { dataKey: 'view', label: 'View' },
                        { dataKey: 'rating', label: 'Rating' },
                        { dataKey: 'booking', label: 'Booking' },
                        { dataKey: 'packageOrder', label: 'PackageOrder' },
                    ]}
                    height={490}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />

            </div>
        </div>
    )
}