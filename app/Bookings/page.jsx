import Heading from "@/components/heading";
import getMyBookings from "../actions/getMyBookings";
import BookedJetCarCard from "@/components/BookedJetCarCard";

const BookingsPage = async () => {
    const bookings = await getMyBookings();
    
    return <>
    <Heading title='My Bookings'/>
        {bookings.length == 0 ? (
            <p className="text-gray-600 mt-4">You have no bookings</p>
        ) : (
            bookings.map((booking) => <BookedJetCarCard key={booking.$id}
            booking={booking}/>)
        ) }   
    </>;
};

export default BookingsPage;