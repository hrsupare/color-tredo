import React from "react";
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
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router

const data = [
  {
    label: "User Payment",
    value: "dashboard",
    icon: Square3Stack3DIcon,
    payments: [
      { userId: "U123", status: "Completed", amount: "₹500" },
      { userId: "U456", status: "Pending", amount: "₹1000" },
      { userId: "U789", status: "Failed", amount: "₹750" },
      { userId: "U321", status: "Completed", amount: "₹800" },
      { userId: "U654", status: "Pending", amount: "₹1500" },
      { userId: "U987", status: "Completed", amount: "₹3000" },
    ],
  },
  {
    label: "Admin Payment",
    value: "profile",
    icon: UserCircleIcon,
    payments: [
      { adminId: "A123", status: "Completed", amount: "₹1500" },
      { adminId: "A456", status: "Pending", amount: "₹2000" },
      { adminId: "A789", status: "Failed", amount: "₹1000" },
      { adminId: "A321", status: "Completed", amount: "₹2500" },
      { adminId: "A654", status: "Pending", amount: "₹5000" },
      { adminId: "A987", status: "Completed", amount: "₹3500" },
    ],
  },
];

const PaymentHistoryPage = () => {
  const navigate = useNavigate(); // Hook to navigate

  return (
    <div className="flex flex-col items-center mt-10 p-8 bg-gradient-to-b from-indigo-200 via-white to-indigo-200 rounded-lg shadow-xl max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="self-start flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition duration-200"
      >
        <ArrowLeftIcon className="w-6 h-6 mr-1" />
        <span className="text-lg font-semibold"> </span>
      </button>

      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
        Payment History
      </h1>

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
                    <th className="py-3 text-left px-4">Status</th>
                    <th className="py-3 text-left px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={index}
                      className={`border-b text-gray-900 ${
                        payment.status === "Completed"
                          ? "bg-green-50"
                          : payment.status === "Pending"
                          ? "bg-yellow-50"
                          : "bg-red-50"
                      } hover:bg-gray-100 transition duration-200`}
                    >
                      <td className="py-2 text-left px-4 font-semibold">
                        {payment.adminId || payment.userId}
                      </td>
                      <td className="py-2 text-left px-4 font-semibold">
                        {payment.status}
                      </td>
                      <td className="py-2 text-left px-4 font-semibold">
                        {payment.amount}
                      </td>
                    </tr>
                  ))}
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
