import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { FaUserCircle, FaFileAlt, FaRupeeSign, FaTelegramPlane, FaSignOutAlt } from "react-icons/fa";
import BottomNavBar from '../Components/Navbar/BottomNavBar';
import { BASE_URL } from '../../constant';
import { ProfileNav } from '../Components/Navbar/ProfileNav';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate(); // Initialize navigate for navigation

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}userGame/getByUserId?userID=${userId}`);
                const data = await response.json();

                if (data.message === "success") {
                    setUserData(data.object);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSignOut = () => {
        localStorage.clear('userId');
        localStorage.clear('authToken');
        localStorage.clear('role');
        localStorage.clear("referenceId");
        navigate('/');
    };

    return (

        <div>
            {/* <ProfileNav/> */}
        <div className='flex flex-col items-center justify-center  gap-2 p-2 bg-gra max-w-lg mx-auto w-full transition-all duration-500'>
            <div className="flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full rounded-lg shadow-lg p-4">
                    {/* User Information */}
                    <div className="flex items-center mb-4">
                        <FaUserCircle className="text-6xl text-gray-500" />
                        <div className="ml-4">
                            {userData ? (
                                <>
                                    <h2 className="text-lg font-bold">{userData.name}</h2>
                                    <p className="text-gray-500">
                                        Mob: {userData.mobileNo} | ID: {userData.referenceId}
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-500">Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full rounded-lg shadow-lg p-4">
                    <div className="flex items-center mb-4">
                        <ul className="divide-y divide-gray-200">
                            <li className="flex items-center justify-between py-3">
                                <div className="flex items-center">
                                    <FaFileAlt className="text-gray-500" />
                                    <span className="ml-3 cursor-pointer">Order Record</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <div className="flex items-center">
                                    <FaRupeeSign className="text-gray-500" />
                                    <span className="ml-3 cursor-pointer">Financial Details</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between py-3">
                                <div className="flex items-center">
                                    <FaTelegramPlane className="text-gray-500" />
                                    <span className="ml-3 cursor-pointer">Follow Us</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between py-3 cursor-pointer" onClick={handleSignOut}>
                                <div className="flex items-center">
                                    <FaSignOutAlt className="text-gray-500" />
                                    <span className="ml-3">Sign Out</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <BottomNavBar />
        </div >
        </div>
    );
}

export default Profile;
