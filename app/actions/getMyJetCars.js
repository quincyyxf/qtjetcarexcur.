'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import {redirect} from "next/navigation";


async function getMyJetCars() {
    const cookie = await cookies();

    const sessionCookie = await cookies().get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { account, databases } = await createSessionClient(sessionCookie.value);

        //Get User ID
        const user = await account.get();
        const userId = user.$id;

        //Fetch User's Jet cars
        const {documents: jetcars} = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_JETCARS,
            [Query.equal('user_id',userId)]
        );


       return jetcars;
    }   catch (error) { 
        console.log('Unable to get user jet cars', error);
        redirect('/error');
    }
}
export default getMyJetCars;