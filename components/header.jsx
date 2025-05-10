'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from '@/assets/images/logo.svg';
import React from "react";
import { FaUser , FaSignInAlt, FaSignOutAlt , Fa, FaBuilding} from 'react-icons/fa';
import destroySession from "@/app/actions/destroySession";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const router = useRouter();

  const {isAuthenticated, setIsAuthenticated} = useAuth();

  
  const handleLogout = async () => {
    const {success, error} = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      return router.push("/login");
    }else {
     
      toast.error(error);
    }
  }

  return (
    <header className="bg-blue-500">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image className="h-12 w-12" src={logo} alt="QT Jet Car" priority={true}/>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Home
                </Link>

                {isAuthenticated && (
                    <>
                    <Link href="/Bookings" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Bookings
                </Link>
                <Link href="/jetcars/add" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Add Jet Car
                </Link>
                    </>
                ) }
                
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">

              {!isAuthenticated && (
                <>
                <Link 
              href="/login" 
              className="mr-3 text-white hover:text-gray-200">
               <FaSignInAlt className='inline mr-1'/> Login
              </Link>

              <Link 
              href="/register" 
              className="mr-3 text-white hover:text-gray-200">
              <FaUser className='inline mr-1'/> Register
              </Link>
                </>
              )}
              
              {isAuthenticated && (
                <>
                <Link 
              href="/jetcars/my" 
              className="text-white hover:text-gray-200">
              <FaBuilding className='inline mr-1'/> My Jet Cars
              </Link>
              
              <button onClick={handleLogout}
              className="mx-3 text-white hover:text-gray-200">
              <FaSignOutAlt className='inline mr-1'/> Sign Out
              </button>
                </>
              )}
              
            </div>
          </div>
        </div>
      </nav>
      
      <div className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link 
          href="/" 
          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700">
            Jet Cars
          </Link>

          {isAuthenticated && (
            <>
            <Link 
          href="/Bookings" 
          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700">
            Bookings
          </Link>

          <Link 
          href="/jetcars/add" 
          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700">
            Add Jet Car
          </Link>
            </>
          )}
        
        </div>
      </div>
    </header>
  );
};

export default Header;

