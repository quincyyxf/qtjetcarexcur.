import Heading from "@/components/heading";
import MyJetCarCard from "@/components/MyJetCarCard";
import getMyJetCars from "@/app/actions/getMyJetCars";

const MyJetCarsPage = async () => {
    const jetcars = await getMyJetCars();


    return<>
    <Heading title="My Jet Cars"/>
    {jetcars.length > 0 ? (
        jetcars.map((jetcar) => <MyJetCarCard key={jetcar.$id}  jetcar={jetcar}/>)
    ) : (
        <p>You have no jet car listings</p>
    ) }
    </>;
};

export default MyJetCarsPage;