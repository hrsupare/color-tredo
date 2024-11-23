import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const UserPaymentHistory = () => {
    const [rechargeData, setRechargeData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        const referenceId = localStorage.getItem("referenceId");
        if (referenceId) {
            fetchRechargeData(referenceId);
            fetchWithdrawData(referenceId);
        }
    };

    useEffect(fetchData, []);

    const fetchRechargeData = async (referenceId) => {
        try {
            const response = await axios.get(`https://add.opticalarc.in/userGame/getRecharge?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                const transformData = response.data.object.map((transaction) => ({
                    id: transaction.rechargeSenderId,
                    amount: `₹ ${transaction.transactionAmount}`,
                    date: convertToIST12HourFormat(transaction.rechargeTransactionsDateAndTime),
                    originalDate: new Date(transaction.rechargeTransactionsDateAndTime)  // Preserve original date for sorting
                }));
    
                // Sort data by date in descending order
                transformData.sort((a, b) => b.originalDate - a.originalDate);
                
                setRechargeData(transformData);
            }
        } catch (error) {
            console.error("Error fetching recharge data:", error);
        }
    };
    
    const fetchWithdrawData = async (referenceId) => {
        try {
            const response = await axios.get(`https://add.opticalarc.in/userGame/getWithdraw?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                   console.log(response.data.object, "DEBUG@313 :::::::; response.data.object")
                const transformData = response.data.object.map((transaction) => ({
                    id: transaction.rechargeSenderId,
                    amount: `₹ ${transaction.transactionAmount}`,
                    date: convertToIST12HourFormat(transaction.withdrawTransactionsDateAndTime),
                    originalDate: new Date(transaction.withdrawTransactionsDateAndTime)  // Preserve original date for sorting
                }));
    
                // Sort data by date in descending order
                transformData.sort((a, b) => b.originalDate - a.originalDate);
    
                setWithdrawData(transformData);
            }
        } catch (error) {
            console.error("Error fetching withdraw data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleRefresh = () => {
        setLoading(true);
        fetchData();
    };

    return (
        <div className="flex flex-col justify-start gap-2 p-2 max-w-full mx-auto w-full transition-all duration-500">
            <div className="flex items-center justify-between pl-6">
                <h1 className="text-xl font-semibold text-black">
                    Payment History
                </h1>
                <button onClick={handleRefresh} className="text-black p-1 rounded-full hover:bg-gray-200">
                    <ArrowPathIcon className="w-6 h-6" />
                </button>
            </div>

            <Tabs value="recharge" className="w-full max-w-full">
                <TabsHeader className="relative flex justify-center items-center p-2 w-full max-w-full">
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

                <TabsBody>
                    <TabPanel key="recharge" value="recharge" className="p-2">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <TableComponent data={rechargeData} />
                        )}
                    </TabPanel>

                    <TabPanel key="withdraw" value="withdraw" className="p-2">
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

const TableComponent = ({ data }) => (
    <div className="flex flex-col items-center mt-4 p-4 max-w-2xl mx-auto">
        <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden shadow-xl">
            <thead className="bg-gradient-to-r from-gray-800 to-black text-white">
                <tr>
                    <th className="py-4 px-4 text-left text-md font-semibold tracking-wider">Sender ID</th>
                    <th className="py-4 px-4 text-left text-md font-semibold tracking-wider">Amount</th>
                    <th className="py-4 px-4 text-left text-md font-semibold tracking-wider">Date</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr
                            key={index}
                            className={`border-b text-gray-900 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded-md`}
                        >
                            <td className="py-3 px-4 text-sm font-medium">{item.id}</td>
                            <td className="py-3 px-4 text-sm font-medium text-green-600">{item.amount}</td>
                            <td className="py-3 px-4 text-sm font-medium">{item.date}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center py-6 text-gray-500 font-medium">
                            No records found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export function convertToIST12HourFormat(isoDate) {
    let date = new Date(isoDate);
    let istOffset = 5.5 * 60 * 60 * 1000;
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

export default UserPaymentHistory;
