'use server';

import { createAdminClient } from "@/config/appwrite";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

async function getSingleJetCar(id) {
    try {
        const { databases } = await createAdminClient();

        //Fetch Jet cars
        const jetcars = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_JETCARS,
            id
        );

        //Revalidate cache for path
        //revalidatePath( '/', 'layout' );

       return jetcars;
    }   catch (error) {
        console.log('Unable to get jet car', error);
        redirect('/error');
    }
}
export default getSingleJetCar;