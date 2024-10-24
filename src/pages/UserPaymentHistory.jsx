import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const UserPaymentHistory = () => {
    const [rechargeData, setRechargeData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch recharge and withdraw data on component mount
    useEffect(() => {
        const referenceId = localStorage.getItem("referenceId"); // Example of getting referenceId from localStorage
        if (referenceId) {
            fetchRechargeData(referenceId);
            fetchWithdrawData(referenceId);
        }
    }, []);

    // Fetch Recharge Data
    const fetchRechargeData = async (referenceId) => {
        try {
            const response = await axios.get(`https://cpa.up.railway.app/userGame/getRecharge?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                const formattedData = response.data.object.map((transaction) => ({
                    id: transaction.rechargeSenderId,
                    amount: `₹${transaction.transactionAmount}`,
                    date: new Date(transaction.rechargeTransactionsDateAndTime).toLocaleString(),
                }));
                setRechargeData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching recharge data:", error);
        }
    };

    // Fetch Withdraw Data
    const fetchWithdrawData = async (referenceId) => {
        try {
            const response = await axios.get(`https://cpa.up.railway.app/userGame/getWithdraw?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                const formattedData = response.data.object.map((transaction) => ({
                    id: transaction.rechargeSenderId, // Assuming withdraw has same structure, adjust as needed
                    amount: `₹${transaction.transactionAmount}`,
                    date: new Date(transaction.withdrawTransactionsDateAndTime).toLocaleString(),
                }));
                setWithdrawData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching withdraw data:", error);
        } finally {
            setLoading(false); // Stop loading once both API calls are done
        }
    };

    return (
        <div className="flex flex-col justify-start gap-2 p-2 max-w-lg mx-auto w-full transition-all duration-500">
            <h1 className="text-xl font-semibold text-black pl-6 justify-start">
                Payment History
            </h1>

            {/* Tabs */}
            <Tabs value="recharge" className="w-full">
                <TabsHeader className="bg-white rounded-lg shadow mb-4">
                    <Tab
                        key="recharge"
                        value="recharge"
                        className="flex items-center gap-2 font-medium text-black rounded-lg py-3 px-4 flex-grow text-center"
                    >
                        <Square3Stack3DIcon className="w-6 h-6" />
                        Recharge
                    </Tab>
                    <Tab
                        key="withdraw"
                        value="withdraw"
                        className="flex items-center gap-2 font-medium text-black rounded-lg py-3 px-4 flex-grow text-center"
                    >
                        <UserCircleIcon className="w-6 h-6" />
                        Withdraw
                    </Tab>
                </TabsHeader>

                {/* Tab Content */}
                <TabsBody>
                    {/* Recharge Tab */}
                    <TabPanel key="recharge" value="recharge" className="p-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <TableComponent data={rechargeData} />
                        )}
                    </TabPanel>

                    {/* Withdraw Tab */}
                    <TabPanel key="withdraw" value="withdraw" className="p-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <TableComponent data={withdrawData} />
                        )}
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
};

// Table Component to display data
const TableComponent = ({ data }) => (
    <table className="w-full table-auto border mb-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-black text-white">
            <tr>
                <th className="py-3 text-left px-4">ID</th>
                <th className="py-3 text-left px-4">Amount</th>
                <th className="py-3 text-left px-4">Date</th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr
                        key={index}
                        className={`border-b text-gray-900 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100 transition duration-200`}
                    >
                        <td className="py-2 text-left px-6 font-semibold">{item.id}</td>
                        <td className="py-2 text-left px-6 font-semibold">{item.amount}</td>
                        <td className="py-2 text-left px-6 font-semibold">{item.date}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="3" className="text-center py-4">
                        No records found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
);

export default UserPaymentHistory;
