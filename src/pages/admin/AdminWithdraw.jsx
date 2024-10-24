import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserAlt } from "react-icons/fa";
import NumberInputForm from "../../forms/NumberInputForm";
import ButtonUI from "../../ui/ButtonUI";
import { Input } from "@material-tailwind/react";
import { BASE_URL } from "../../../constant";
import axios from "axios";

const AdminWithdraw = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); // State to track verification
  const [isProcessing, setIsProcessing] = useState(false); // State to control processing state
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [userId, setUserId] = useState(""); // State for User ID input
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });
  const loggedInUserId = localStorage.getItem("referenceId");
  const [amount, setAmount] = useState(0);
  const [statusMessage, setStatusMessage] = useState(""); // State for status message



  const handleVerifySender = async () => {
    setErrorMessage("");
    if (userId.trim() === "") {
      setErrorMessage("User ID cannot be empty.");
      return;
    }
    try {
      const URL = `${BASE_URL}admin/getByReferenceId?referenceId=${userId}`;
      const getData = await axios.get(URL);
      if (getData.data && getData.data.object) {
        setUserData(getData.data.object);
        setIsVerified(true);
      } else {
        setErrorMessage("No data found for the provided User ID.");
        setIsVerified(false);
      }
    } catch (error) {
      setErrorMessage("No data found for the provided User ID");
      setIsVerified(false);
    }
  };

  const sendwithdrawForAdminside = async () => {
    const URL = `${BASE_URL}admin/withdrawForAdminside?postUserId=${loggedInUserId}&getUserId=${userId}&amount=${amount}`;
    const callWithdraw = await axios.patch(URL);
    console.log(callWithdraw.data, "DEBUG@313 ::::::::: callWithdraw");
  };

  const getStatusAfterWithdrawProceed = async () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Combine to form the desired format
    const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    const URL = `${BASE_URL}admin/getStatusAfterWithdawProcced?User_R_Id=${userId}&localDateTime=${localDateTime}`;
    
    try {
      const response = await axios.get(URL);
      if (response.data.message === "success") {
        setStatusMessage("Withdrawal was successful.");
      } else {
        setStatusMessage("Withdrawal failed: " + response.data.message);
      }
    } catch (error) {
      setStatusMessage("An error occurred while checking withdrawal status.");
    }
  };

  const handleNext = () => {
    sendwithdrawForAdminside();
    setIsProcessing(true); // Start processing
    setTimeRemaining(20); // Reset timer to 2 minutes

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {

          clearInterval(timer); // Clear timer when it reaches 0
          setIsProcessing(false); // Reset processing state
getStatusAfterWithdrawProceed()
          // navigate("/superadmin/withdraw/confirm");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isProcessing) {
        const message =
          "Processing is ongoing. Are you sure you want to leave?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Clean up event listener
    };
  }, [isProcessing]); // Re-run effect when isProcessing changes

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16 p-6 md:p-8 lg:p-10  max-w-sm md:max-w-md lg:max-w-lg mx-auto transition-all duration-500 transform hover:scale-105">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 mb-4 md:mb-6 tracking-wide">
        Request Withdrawal
      </h1>

      {/* Sender Details */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <span className="text-sm font-semibold text-gray-900">
            Enter user Id for Request Withdrawal !
          </span>
        </div>

        <Input
          type="text"
          label="User ID"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Update state on input change
          className={`mb-4 w-full border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500`}
          placeholder="e.g., U12345"
        />

        <div className="flex justify-between gap-2">
          {!isVerified && (
            <>
              <ButtonUI
                onClick={() => navigate(-1)} // Back button functionality
                className="w-1/2 py-3 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition duration-300 rounded-lg shadow-lg"
              >
                Back
              </ButtonUI>

              <ButtonUI
                onClick={handleVerifySender}
                className="flex items-center justify-center w-full py-3 text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold transition duration-300 rounded-lg shadow-lg transform hover:scale-105"
              >
                <span className="font-semibold">Verify Sender</span>
              </ButtonUI>
            </>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg shadow-sm">
          <svg
            className="w-6 h-6 text-red-500 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-1.414 1.414a1 1 0 00-.293.707v8.486a1 1 0 01-1 1H8.343a1 1 0 01-1-1V7.757a1 1 0 00-.293-.707L5.636 5.636a2 2 0 010-2.828l1.414-1.414a2 2 0 012.828 0L12 4.93l2.122-2.122a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828z"
            />
          </svg>
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}
      {isVerified && (
        <div className="mt-1 p-6 bg-white rounded-lg shadow-lg w-full transition-all duration-300 transform hover:scale-105">
          <h2 className="text-xl font-extrabold text-indigo-900 mb-4 tracking-wide border-b-2 pb-2 border-indigo-200">
            User Information
          </h2>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-sm font-semibold text-gray-800">
              <span className="text-indigo-600">Name:</span>{" "}
              {userData.name || "N/A"}
            </p>
          </div>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-sm font-semibold text-gray-800">
              <span className="text-indigo-600">Email:</span>{" "}
              {userData.email || "N/A"}
            </p>
          </div>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-sm font-semibold text-gray-800">
              <span className="text-indigo-600">Mobile No:</span>{" "}
              {userData.mobileNo || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Show Withdrawal Amount only after verification */}
      {isVerified && (
        <div className="w-full space-y-4 mt-6">
          <div className="flex items-center border border-gray-700 rounded-lg mb-4 w-full shadow-sm hover:shadow-lg transition-shadow duration-300">
            <span className="text-2xl font-bold text-gray-800 px-4 py-2 bg-gray-300 rounded-l-lg">
              ₹
            </span>
            <Input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              label="Enter Amount"
              name="userRechargeAmount"
              className="w-full px-4 py-3 focus:outline-none rounded-r-lg text-gray-900 font-bold bg-gray-200 hover:bg-gray-100 transition-colors duration-300 focus:ring-2 focus:ring-gray-800"
              placeholder="e.g., 1000"
            />
          </div>
          {/* Back and Next Buttons */}
          <div className="flex justify-between gap-4">
            <ButtonUI
              onClick={() => navigate(-1)} // Back button functionality
              className="w-1/2 py-3 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition duration-300 rounded-lg shadow-lg"
            >
              Back
            </ButtonUI>

            <ButtonUI
              onClick={handleNext}
              className="w-1/2 py-3 text-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold transition duration-300 rounded-lg shadow-xl"
              disabled={isProcessing} // Disable button while processing
            >
              Next
            </ButtonUI>
          </div>
        </div>
      )}
  {/* Status Message */}
      {statusMessage && (
        <div className="mt-4 p-4 text-center text-lg font-semibold text-indigo-700">
          {statusMessage}
        </div>
      )}

      {/* Timer and Block UI */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-white text-2xl font-semibold">
            Processing... {Math.floor(timeRemaining / 60)}:
            {String(timeRemaining % 60).padStart(2, "0")}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdraw;
