'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import {redirect} from "next/navigation";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkJetCarAvailability from "./checkJetCarAvailability";

async function bookJetCar(previousState, formData) {
    const cookie = await cookies();
    
    const sessionCookie = cookie.get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        //Get User ID
        const {user} = await checkAuth();

        if(!user) {
        return{
            error:'You must be logged in to book a jet car'
        }
    }

        //Extract date and time from formData
        const checkInDate = formData.get('check_in_date');
        const checkInTime = formData.get('check_in_time');
        const checkOutDate = formData.get('check_out_date')
        const checkOutTime = formData.get('check_out_time');
        const jetcarId = formData.get('jetcar_id');

        //Combine date and time to ISO 8601 format
        const checkInDateTime = `${checkInDate}T${checkInTime}`;
        const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

        //Check if jetcar is available
        const isAvailable = await checkJetCarAvailability(jetcarId, 
            checkInDateTime,checkOutDateTime);

            if(!isAvailable){
                return{
                    error:'This jet car is already booked for this set time',
                }
            }

        const bookingData = {
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
            user_id: user.id,
            jetcar_id: jetcarId,
        }

        //Create Booking
        const newBooking = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            ID.unique(),
            bookingData
        );

        //Revalidate cache
        revalidatePath('/Bookings', 'layout');

        return{
            success: true,
        };

    }   catch (error) { 
        console.log('Unable to book jet car', error);
        return{
            error: 'Something went wrong booking the jet car'
        }
    }
}
export default bookJetCar;