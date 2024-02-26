'use client';

import { STATUS_CODE_OK } from "@/common/Constant";
import { ApiGetPartyById } from "@/service/PartyService";
import { ApiGetRoomById } from "@/service/RoomService";
import { Party, Room } from "@/types";
import React from "react";

export default function Page(){
    const partyId = 5;
    const roomId = 5;

    const [party, setParty] = React.useState<Party | null>(null);
    const [room, setRoom] = React.useState<Room | null>(null);


    React.useEffect(()=>{
        fetchGetPartyById(partyId);
        fetchGetRoomById(roomId);
    }, []);

    async function fetchGetPartyById(id: number){
        const result = await ApiGetPartyById(id);
        if(result && result.code == STATUS_CODE_OK){
            setParty(result.data);
        }
    }

    async function fetchGetRoomById(id: number){
        const result = await ApiGetRoomById(id);
        if(result && result.code == STATUS_CODE_OK){
            setRoom(result.data);
        }
    }


    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                <h4>BOOKING INFORMATION</h4>
            </div>
        </div>
    )
};