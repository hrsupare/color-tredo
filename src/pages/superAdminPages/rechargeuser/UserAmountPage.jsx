import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import ButtonUI from "../../../ui/ButtonUI";
import ConfettiExplosion from "react-confetti-explosion";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { BASE_URL } from "../../../../constant";

const UserAmountPage = () => {
  const [isExploding, setIsExploding] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, name, totalBalance } = location.state || {};
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
            getUserId: userId,
            amount: amount,
          },
        }
      );
 
      if (!isExploding) {
        setIsExploding(true);
      }
      nav("/superadmin");
    } catch (error) {
       setErrorMessage("Insufficient funds in sender account ");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-16 p-8 bg-gradient-to-b from-indigo-200 via-white to-indigo-200 rounded-lg shadow-xl max-w-md mx-auto">
      {isExploding && <ConfettiExplosion />}

      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 mb-4">
        User Recharge Amount
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
            <span className="text-indigo-700">{userId}</span>
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
        <span className="text-lg font-semibold text-gray-800">
          Recharge Your Account
        </span>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg mb-4 w-full">
        <span className="text-2xl font-bold text-indigo-600 p-2">₹</span>
        <Input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          label="Enter Amount"
          name="userRechargeAmount"
          className="w-full border-none p-2 focus:outline-none"
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
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="flex items-center justify-between w-full mb-4">
        {/* Back Button on the left */}
        <ButtonUI
          onClick={() => navigate(-1)}
          className="flex items-center justify-center py-3 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition duration-300 rounded-lg shadow-lg"
        >
          {/* <AiOutlineArrowLeft className="mr-2" /> */}
          <span>Back</span>
        </ButtonUI>

        {/* Recharge Button on the right */}
        <ButtonUI
          onClick={() => handleRecharge()}
          className="flex items-center justify-center py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg shadow-lg"
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

export default UserAmountPage;
