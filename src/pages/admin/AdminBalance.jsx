import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { BASE_URL } from "../../../constant";
import axios from "axios";

const AdminBalance = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}userGame/getByUserId?userID=${localStorage.getItem("userId")}`
                );
                const data = await response.json();
                setUserData(data.object);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleNotification = async () => {
        if (showNotification) {
            setShowNotification(false);
            return;
        }
        setShowNotification(true);

        const apiUrl = `${BASE_URL}admin/userNotificationList?getUserId=${localStorage.getItem("referenceId")}`;

        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setNotifications([data.object] || []); // Ensure we always have an array
            } else {
                console.error("Failed to fetch notifications with status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };

    const handleConfirmWithdraw = async () => {
        if (notifications.length === 0 || !notifications[0]?.withdrawTransaction_id) {
            alert("No valid notification available for withdrawal.");
            return;
        }

        const withdrawID = notifications[0].withdrawTransaction_id;
        const handleConfirmWithdrawUrl = `${BASE_URL}admin/withdrawApprovalUserSide?withdrawID=${withdrawID}`;

        try {
            await axios.get(handleConfirmWithdrawUrl);
            setIsModalOpen(false);
            setSelectedNotification(null);
            setNotifications([]);
            setError(""); // Clear any existing error
            alert("Withdrawal confirmed successfully!");
        } catch (error) {
            console.error("Error confirming withdrawal:", error);
        }
    };

    const handleDeclineWithdraw = async () => {
        if (notifications.length === 0 || !notifications[0]?.withdrawTransaction_id) {
            alert("No valid notification available for withdrawal.");
            return;
        }

        const withdrawID = notifications[0].withdrawTransaction_id;
        const declineWithdrawUrl = `${BASE_URL}UserAdminCancel/cancelWithdraw?withdrawID=${withdrawID}`;

        try {
            const response = await axios.patch(declineWithdrawUrl);
            if (response.data.status === "success") {
                setIsModalOpen(false);
                setSelectedNotification(null);
                setNotifications([]);
                setError(""); // Clear any existing error
                alert("Withdrawal transaction declined successfully!");
            } else {
                setError(response.data.message); // Set the error message
            }
        } catch (error) {
            console.error("Error declining withdrawal:", error);
            setError("An error occurred while declining the withdrawal."); // Set a generic error message
        }
    };

    const openModal = (notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);
        setError(""); // Reset error message when opening modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotification(null);
        setError("");
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-2 max-w-xl mx-auto w-full transition-all duration-500">
            <div className="relative flex justify-center items-center p-2 w-full">
                <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative md:px-8 md:py-10">
                    <IoNotifications
                        className="absolute top-4 right-4 text-2xl text-black cursor-pointer"
                        onClick={handleNotification}
                    />
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xl font-bold text-gray-800">
                            My Balance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {/* Add as many &nbsp; as needed */}
                        </p>                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-4xl font-bold text-gray-800">
                            ₹ {userData.totalBalnce}
                        </p>
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="relative flex justify-center items-center p-2 w-full">
                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4 relative md:px-8">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold text-black pl-2">
                                Notifications
                            </p>
                        </div>
                        <div className="mt-2">
                            {loading ? (
                                <p>Loading notifications...</p>
                            ) : notifications.length > 0 ? (
                                <ul>
                                    {notifications.map((notification, index) => (
                                        <li
                                            key={index}
                                            className="border border-gray-300 rounded-lg p-4 mb-2 bg-gray-50 cursor-pointer"
                                            onClick={() => openModal(notification)}
                                        >
                                            <p>
                                                <strong>Date & Time:</strong>{" "}
                                                {new Date(notification.withdrawTransactionsDateAndTime).toLocaleString()}
                                            </p>
                                            <p>
                                                <strong>Sender ID:</strong>{" "}
                                                {notification.rechargeSenderId}
                                            </p>
                                            <p>
                                                <strong>Transaction Amount:</strong> ₹
                                                {notification.transactionAmount}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No notifications available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {isModalOpen && selectedNotification && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto sm:max-w-md sm:p-6">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center">
                            Withdrawal Details
                        </h2>
                        <div className="text-sm md:text-base text-gray-700 mb-4 space-y-2">
                            <p>
                                <strong>Date & Time:</strong>{" "}
                                {new Date(selectedNotification.withdrawTransactionsDateAndTime).toLocaleString()}
                            </p>
                            <p>
                                <strong>Sender ID:</strong>{" "}
                                {selectedNotification.rechargeSenderId}
                            </p>
                            <p>
                                <strong>Transaction Amount:</strong> ₹
                                {selectedNotification.transactionAmount}
                            </p>
                            {error && (
                                <p className="text-red-500">{error}</p> // Display error message in red
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row justify-end mt-6 gap-3">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg px-4 py-2 w-full md:w-auto transition-colors duration-300"
                                onClick={handleDeclineWithdraw} // Call decline function
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleConfirmWithdraw}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 w-full md:w-auto transition-colors duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminBalance;
