'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import {redirect} from "next/navigation";
import { DateTime } from "luxon";

//Convert DateString to luxon DateTime object in UTC
function toUTCDateTime(dateString){
    return DateTime.fromISO(dateString,{zone: 'utc'}).toUTC();
}

//Check for overlapping date ranges 
function dateRangesOverlap(checkInA,checkOutA, checkInB,checkOutB) {
    return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkJetCarAvailability(jetcarId, checkIn, checkOut) {
    const cookie = await cookies();

    const sessionCookie = await cookies().get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        const checkInDateTime = toUTCDateTime(checkIn);
        const checkOutDateTime = toUTCDateTime(checkOut);

        //Fetch all bookings for a given jet car
        const {documents: bookings} = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            [Query.equal('jetcar_id',jetcarId)]
        );
       
        //Loop over bookings and check for overlaps
        for (const booking of bookings) {
            const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
            const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

            if(dateRangesOverlap(
                checkInDateTime,
                checkOutDateTime,
                bookingCheckInDateTime,
                bookingCheckOutDateTime,
            )) {
                return false; //overlap found do not book
            }
        } 

        //no overlap found, continue book
        return true;

    }   catch (error) { 
        console.log('Unable to check availability', error);
        return{
            error:'Failed to check availability'
        }
    }
}
export default checkJetCarAvailability;