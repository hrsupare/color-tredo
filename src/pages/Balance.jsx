import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import BottomNavBar from "../Components/Navbar/BottomNavBar";
import { BASE_URL } from "../../constant";
import axios from "axios";

const Balance = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}userGame/getByUserId?userID=${localStorage.getItem(
            "userId"
          )}`
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
    if (showNotification === true) {
      setShowNotification(false);
      return;
    } else {
      setShowNotification(true);
    }

    const apiUrl = `${BASE_URL}admin/userNotificationList?getUserId=${localStorage.getItem(
      "referenceId"
    )}`;

    setLoading(true); // Start loading before fetch
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
      setNotifications([])
      alert("Withdrawal confirmed successfully!");
      
    } catch (error) {
      console.error("Error confirming withdrawal:", error);
    }
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-gradient-to-r from-indigo-100 to-white rounded-lg shadow-lg max-w-lg mx-auto w-full transition-all duration-500">
      <div className="relative flex justify-center items-center p-2 w-full">
        <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
          <IoNotifications
            className="absolute top-4 right-4 text-2xl text-black cursor-pointer"
            onClick={handleNotification}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-gray-800">My Balance</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-4xl font-bold text-gray-800">
              ₹ {userData.totalBalnce}
            </p>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="relative flex justify-center items-center p-2 w-full">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 relative">
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
                        {new Date(
                          notification.withdrawTransactionsDateAndTime
                        ).toLocaleString()}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 md:max-w-md md:p-8 transition-transform transform scale-100">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 text-center">
              Withdrawal Details
            </h2>
            <div className="text-sm md:text-base text-gray-700 mb-4 space-y-2">
              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(
                  selectedNotification.withdrawTransactionsDateAndTime
                ).toLocaleString()}
              </p>
              <p>
                <strong>Sender ID:</strong>{" "}
                {selectedNotification.rechargeSenderId}
              </p>
              <p>
                <strong>Transaction Amount:</strong> ₹
                {selectedNotification.transactionAmount}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-end mt-6 gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg px-4 py-2 w-full md:w-auto transition-colors duration-300"
                onClick={closeModal}
              >
                Cancel
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
      <BottomNavBar />
    </div>
  );
};

export default Balance;