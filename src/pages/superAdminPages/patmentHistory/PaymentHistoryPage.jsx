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
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { BASE_URL } from "../../../../constant";


const PaymentHistoryPage = () => {
  const navigate = useNavigate();
  const [rechargeData, setRechargeData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]); // State for withdrawal data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference ID from localStorage
  const referenceId = localStorage.getItem("referenceId");

  // Fetch Recharge Data
  useEffect(() => {
    const fetchRechargeData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeData();
  }, [referenceId]);

  // Fetch Withdraw Data
  useEffect(() => {
    const fetchWithdrawData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawData();
  }, [referenceId]);

  const data = [
    {
      label: "Recharge",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      payments: rechargeData.map((transaction) => ({
        userId: transaction.rechargeSenderId,
        amount: `₹${transaction.transactionAmount}`,
        date: new Date(transaction.rechargeTransactionsDateAndTime).toLocaleString(),
      })),
    },
    {
      label: "Withdraw",
      value: "profile",
      icon: UserCircleIcon,
      payments: withdrawData.map((transaction) => ({
        adminId: transaction.withdrawReceiverId,
        amount: `₹${transaction.transactionAmount}`,
        date: new Date(transaction.withdrawTransactionsDateAndTime).toLocaleString(),
      })),
    },
  ];

  return (
    <div className="flex flex-col items-center mt-10 p-8 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition duration-200"
      >
        <ArrowLeftIcon className="w-6 h-6 mr-1" />
        {/* <span className="text-lg font-semibold">Go Back</span> */}
      </button>

      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
        Payment History
      </h1>

      {loading && <p>Loading payment data...</p>}
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
              <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-3 text-left px-4">ID</th>
                    {/* <th className="py-3 text-left px-4">Status</th> */}
                    <th className="py-3 text-left px-4">Amount</th>
                    <th className="py-3 text-left px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr
                      //   key={index}
                      //   className={`border-b text-gray-900 ${
                      //     payment.status === "Completed"
                      //       ? "bg-green-50"
                      //       : payment.status === "Pending"
                      //       ? "bg-yellow-50"
                      //       : "bg-red-50"
                      //   } hover:bg-gray-100 transition duration-200`}
                      >
                        <td className="py-2 text-left px-4 font-semibold">
                          {payment.userId || payment.adminId}
                        </td>
                        {/* <td className="py-2 text-left px-4 font-semibold">
                          {payment.status}
                        </td> */}
                        <td className="py-2 text-left px-4 font-semibold">
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
