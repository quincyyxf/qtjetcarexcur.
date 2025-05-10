'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import {redirect} from "next/navigation";
import { revalidatePath } from "next/cache";

async function deleteJetCar(jetcarId) {
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

        //Find jet car to delete
        const jetcarToDelete = jetcars.find((jetcar) => jetcar.$id ==jetcarId);


        //Delete Jet Car
        if(jetcarToDelete){
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_JETCARS,
                jetcarToDelete.$id
            );

            //Revalidate my jet cars and all jet cars
            revalidatePath('/jetcars/my', 'layout');
            revalidatePath('/', 'layout');

            return {
                success: true
            };
        }else {
            return{
                error: 'Jet Car not found'
            }
        }

    }   catch (error) { 
        console.log('Unable to delete jet car', error);
        return{
            erorr: 'Failed to delete jet car',
        }
    }
}
export default deleteJetCar;