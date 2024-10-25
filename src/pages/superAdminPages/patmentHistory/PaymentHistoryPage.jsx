import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { BASE_URL } from "../../../../constant";

// Convert date to IST 12-hour format
export function convertToIST12HourFormat(isoDate) {
  let date = new Date(isoDate);
  let istOffset = 5.5 * 60 * 60 * 1000; // IST offset
  let istDate = new Date(date.getTime() + istOffset);
  let day = istDate.getDate();
  let month = istDate.getMonth() + 1;
  let year = istDate.getFullYear();
  let formattedDay = day < 10 ? '0' + day : day;
  let formattedMonth = month < 10 ? '0' + month : month;
  let hours = istDate.getHours();
  let minutes = istDate.getMinutes();
  let seconds = istDate.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${formattedDay}-${formattedMonth}-${year} ${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

const PaymentHistoryPage = () => {
  const navigate = useNavigate();
  const [rechargeData, setRechargeData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [error, setError] = useState(null);

  const referenceId = localStorage.getItem("referenceId");

  // Fetch Recharge Data
  const fetchRechargeData = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}userGame/getRechargeAdminside?referanceId=${referenceId}`
      );
      if (response.data.message === "success") {
        setRechargeData(response.data.object);
      } else {
        setError("Failed to fetch recharge data.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    }
  };

  // Fetch Withdraw Data
  const fetchWithdrawData = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}userGame/getWithdrawAdminSide?referanceId=${referenceId}`
      );
      if (response.data.message === "success") {
        setWithdrawData(response.data.object);
      } else {
        setError("Failed to fetch withdraw data.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRechargeData();
    fetchWithdrawData();
  }, [referenceId]);

  const data = [
    {
      label: "Recharge",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      payments: rechargeData
        .map((transaction) => ({
          userId: transaction.rechargeSenderId,
          amount: `₹${transaction.transactionAmount}`,
          date: convertToIST12HourFormat(transaction.rechargeTransactionsDateAndTime),
          isoDate: transaction.rechargeTransactionsDateAndTime // keep the ISO date for sorting
        }))
        .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)), // Sort by date in descending order
    },
    {
      label: "Withdraw",
      value: "profile",
      icon: UserCircleIcon,
      payments: withdrawData
        .map((transaction) => ({
          adminId: transaction.withdrawReceiverId,
          amount: `₹${transaction.transactionAmount}`,
          date: convertToIST12HourFormat(transaction.withdrawTransactionsDateAndTime),
          isoDate: transaction.withdrawTransactionsDateAndTime // keep the ISO date for sorting
        }))
        .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate)), // Sort by date in descending order
    },
  ];
  

  return (
    <div className="flex flex-col items-center mt-10 p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="self-start flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition duration-200"
      >
        <ArrowLeftIcon className="w-6 h-6 mr-1" />
      </button>

      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
        Payment History
      </h1>
      {error && <p className="text-red-600">{error}</p>}

      <Tabs value="dashboard" className="w-full">
        <TabsHeader className="bg-white rounded-lg shadow mb-4">
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-800 transition duration-300 rounded-lg py-3 px-4 flex-grow text-center"
            >
              {React.createElement(icon, { className: "w-6 h-6" })}
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, payments }) => (
            <TabPanel key={value} value={value} className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-indigo-800"></h2>
                <button
                  onClick={() => {
                    fetchRechargeData();
                    fetchWithdrawData();
                  }}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                >
                  <ArrowPathIcon className="w-6 h-6" />
                </button>
              </div>
              <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-3 text-left px-4">ID</th>
                    <th className="py-3 text-left px-4">Amount</th>
                    <th className="py-3 text-left px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr key={index} className="border-b text-gray-900 hover:bg-gray-100 transition duration-200">
                        <td className="py-2 text-left px-4 font-semibold">
                          {payment.userId || payment.adminId}
                        </td>
                        <td className="py-2 text-left px-4 font-semibold text-green-500">
                          {payment.amount}
                        </td>
                        <td className="py-2 text-left px-4 font-semibold">
                          {payment.date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No payments available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default PaymentHistoryPage;
