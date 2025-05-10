import jetcars from '@/data/jetcars.json';
import Heading from '@/components/heading';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import BookingForm from '@/components/BookingForm';
import getSingleJetCar from '@/app/actions/getSingleJetCar';
import Image from 'next/image';

const JetCarPage = async ({ params }) => {
    const { id } = await params;
    const jetcar = await getSingleJetCar (id);


    if (!jetcar) { 
        return <Heading title="Jet Car Not Found" />;
    }

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_JETCARS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${jetcar.image}/view?project=${projectId}`;

  const imageSrc = jetcar.image ? imageUrl: '/images/no-image.jpg';

    return (
        <>
            <Heading title={jetcar.name} />
            <div className="bg-white shadow rounded-lg p-6">
                <a href="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
                    <FaChevronLeft className="inline mr-1" />
                    <span className="ml-2">Back to Jet Cars</span>
                </a>

                <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <Image 
                    src={imageSrc} 
                    alt={jetcar.name} 
                    width={400} 
                    height={100} 
                    className="w-full sm:w-1/3 h-64 object-cover rounded-lg" /> 

                    <div className="mt-4 sm:mt-0 sm:flex-1">
                        <p className="text-gray-600 mb-4">
                            {jetcar.description}
                        </p>

                        <ul className="space-y-2">
                            <li><span className="font-semibold text-gray-800">Speed:</span>{jetcar.speed_mph}</li>
                            <li><span className="font-semibold text-gray-800">Capacity:</span>{jetcar.capacity}</li>
                            <li><span className="font-semibold text-gray-800">Features:</span>{jetcar.features}</li>
                            <li><span className="font-semibold text-gray-800">Availability:</span>{jetcar.availability}</li>
                            <li><span className="font-semibold text-gray-800">Price:</span>${jetcar.price_per_hour}/hour</li>
                            <li><span className="font-semibold text-gray-800">Location:</span>{jetcar.location}</li>
                        </ul>
                    </div>
                </div>

                <BookingForm jetcar={jetcar}/>
                
            </div>
        </>
    );
};

export default JetCarPage;
