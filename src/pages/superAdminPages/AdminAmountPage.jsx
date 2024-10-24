import { useState } from "react";
import { FaIdCard, FaMoneyBillWave, FaUser, FaWallet } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ButtonUI from "../../ui/ButtonUI";
import ConfettiExplosion from "react-confetti-explosion";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constant";
import { Input } from "@material-tailwind/react";
import axios from "axios";
const AdminAmountPage = () => {
  const [isExploding, setIsExploding] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const { adminId, name } = location.state || {};
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const loggedInUserId = localStorage.getItem("referenceId");

 
  const handleRecharge = async () => {
    try {
      const proceedRecharge = await axios.patch(
        `${BASE_URL}admin/recharge`,
        null,
        {
          params: {
            postUserId: loggedInUserId,
            getUserId: adminId,
            amount: amount,
          },
        }
      );
      console.log(proceedRecharge.data, "proceedRecharge");
      
      if (!isExploding) {
        setIsExploding(true);
      }
  
      // Add a 2-second delay before navigating
      setTimeout(() => {
        nav("/superadmin");
        setIsExploding(false);
      }, 2000); // 2000 milliseconds = 2 seconds
  
    } catch (error) {
      console.log(error.response.data.message, "error");
      setErrorMessage("Insufficient funds in sender account");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-16 p-8  max-w-md mx-auto transition-all duration-500">
      {isExploding && <ConfettiExplosion />}

      <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-900 mb-4 md:mb-6 tracking-wide">
        Recharge Amount
      </h1>

      {/* Display Admin's Name and Total Balance */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">
          Transaction Details
        </h2>

        <div className="flex items-center justify-center gap-1 mb-1">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-gray-500">Receiver Name: </span>
            <span className="text-indigo-700">{name || "N/A"}</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 mb-1">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-gray-500">Receiver ID: </span>
            <span className="text-indigo-700">{adminId}</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-1">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-gray-500">Sender ID: </span>
            <span className="text-indigo-700">{loggedInUserId}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <FaMoneyBillWave className="text-4xl text-indigo-600 mr-2" />
        <span className="text-lg font-semibold text-gray-800">Add Funds</span>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg mb-4 w-full">
        <span className="text-2xl font-bold text-indigo-600 p-2">₹</span>
        <Input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          label="Enter Amount"
          name="adminAmount"
          className="w-full border-none p-2 focus:outline-none placeholder-gray-900"
          placeholder="e.g., 1000"
        />
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
          <p className="text-base font-bold">{errorMessage}</p>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        {/* Back Button on the left */}
        <ButtonUI
          onClick={() => nav(-1)}
          className="py-3 text-lg bg-gray-700 hover:bg-gray-700 text-gray-900 transition duration-300 rounded-lg shadow-lg flex items-center"
        >
          <AiOutlineArrowLeft className="mr-2" />
          <span>Back</span>
        </ButtonUI>

        <ButtonUI
          onClick={() => handleRecharge()}
          className="py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg shadow-lg flex items-center justify-center"
        >
          <span className="font-semibold">Recharge</span>
        </ButtonUI>
      </div>

      <p className="text-center text-gray-600 mt-4">
        Funds will be added to your account immediately!
      </p>
    </div>
  );
};

export default AdminAmountPage;
