import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constant';

const HomeData = () => {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error("No user not ID found");
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}userGame/getByUserId?userID=${userId}`);
                const data = await response.json();

                if (data.message === "success") {
                    setUserData(data.object);
                } else {
                    console.error("Failed to fetch user data:", data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <div className="text-black p-2 bg-white shadow-lg rounded-lg font-serif">
                <div className="flex justify-between items-center mb-2">
                    <div className="mx-2">
                        <p className="font-bold text-xl">ID:</p>
                        <p className="font-semibold text-2xl">{userData.referenceId}</p>
                    </div>
                    <div className="mx-2">
                        <p className="font-bold text-xl">Balance:</p>
                        <p className="font-semibold text-2xl">₹{Number(userData.totalBalnce).toFixed(1)}</p> {/* Ensures 0.0 format */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeData;
