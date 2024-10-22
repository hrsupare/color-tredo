import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import NumberInputForm from "../../forms/NumberInputForm";
import ButtonUI from "../../ui/ButtonUI";

const AdminWithdraw = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); // State to track verification
  const [isProcessing, setIsProcessing] = useState(false); // State to control processing state
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds

  const handleVerifySender = () => {
    // Simulate verification logic
    alert("Sender verified successfully!");
    setIsVerified(true); // Show Withdrawal Amount after verification
  };

  const handleNext = () => {
    setIsProcessing(true); // Start processing
    setTimeRemaining(10); // Reset timer to 2 minutes

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Clear timer when it reaches 0
          setIsProcessing(false); // Reset processing state
          navigate("/superadmin/withdraw/confirm"); // Navigate to the next page
          return 0; // Ensure time remaining is 0
        }
        return prev - 1; // Decrement time
      });
    }, 1000); // Update every second
  };

  useEffect(() => {
    // Add beforeunload event listener
    const handleBeforeUnload = (event) => {
      if (isProcessing) {
        const message = "Processing is ongoing. Are you sure you want to leave?";
        event.preventDefault(); // Prevent default action
        event.returnValue = message; // Show confirmation dialog
        return message; // Show confirmation dialog in some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Clean up event listener
    };
  }, [isProcessing]); // Re-run effect when isProcessing changes

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16 p-6 md:p-8 lg:p-10 bg-gradient-to-b from-indigo-300 via-white to-indigo-300 rounded-xl shadow-2xl max-w-sm md:max-w-md lg:max-w-lg mx-auto transition-all duration-500 transform hover:scale-105">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 mb-4 md:mb-6 tracking-wide">
        Request Withdrawal
      </h1>

      {/* Sender Details */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <FaUser className="text-4xl text-indigo-700 mr-3" />
          <span className="text-xl font-semibold text-gray-900">
            Sender (Superadmin)
          </span>
        </div>

        <NumberInputForm
          type="text"
          label={"Sender Name"}
          name={"senderName"}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-300"
          placeholder="Superadmin Name"
        />

        <NumberInputForm
          type="number"
          label={"Sender ID"}
          name={"senderId"}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-300"
          placeholder="e.g., 12345"
        />
        <div className="flex justify-between gap-4">
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
        </div>
      </div>

      {/* Show Withdrawal Amount only after verification */}
      {isVerified && (
        <div className="w-full space-y-4 mt-6">
          <div className="w-full">
            <NumberInputForm
              type="number"
              label={"Withdrawal Amount"}
              name={"withdrawalAmount"}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-300"
              placeholder="Enter amount"
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

      {/* Timer and Block UI */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-white text-2xl font-semibold">
            Processing... {Math.floor(timeRemaining / 60)}:
            {String(timeRemaining % 60).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdraw;
