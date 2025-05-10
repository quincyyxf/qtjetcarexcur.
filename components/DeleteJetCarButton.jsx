'use client';
import { FaTrash } from "react-icons/fa";
import deleteJetCar from "@/app/actions/deleteJetCar";
import { toast } from "react-toastify";

const DeleteJetCarButton = ({jetcarId}) => {
    const handleDelete = async( ) => {
        const confirmed = window.confirm('Are you sure you want to delete this jet car?');

        if(confirmed){
            try {
                const response = await deleteJetCar(jetcarId);
                toast.success('Jet Car deleted successfully!')
            } catch (error) {
                console.log('Failed to delete jet car', erorr);
                toast.error('Failed to delete jet car')
            }
        }
    }

    return ( <button onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
      >
        <FaTrash className='inline mr-1'/> Delete
      </button>);
}

export default DeleteJetCarButton;