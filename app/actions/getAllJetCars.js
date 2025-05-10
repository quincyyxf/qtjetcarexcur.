'use server';

import { createAdminClient } from "@/config/appwrite";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

async function getAllJetCars() {
    try {
        const { databases } = await createAdminClient();

        //Fetch Jet cars
        const {documents: jetcars} = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_JETCARS
        
        );

        //Revalidate cache for path
        //revalidatePath( '/', 'layout' );

       return jetcars;
    }   catch (error) { cs
        console.log('Unable to get jet cars', error);
        redirect('/error');
    }
}
export default getAllJetCars;