import JetCarCard from '@/components/JetCarCard';
import Heading from '@/components/heading';
import getAllJetCars from './actions/getAllJetCars';

export default async function Home() {
  const jetcars = await getAllJetCars();
  
  return (
    <>
        <Heading title='Available Jet Cars'/>
        {jetcars.length > 0 ? (
          jetcars.map((jetcar) => <JetCarCard jetcar={jetcar} key={jetcar.$id}/>)
        ) :(
          <p>No jetcars available at the moment</p>
        )}
    </> 
  );
}
  