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

    useEffect(() => {
        const referenceId = localStorage.getItem("referenceId");
        if (referenceId) {
            fetchRechargeData(referenceId);
            fetchWithdrawData(referenceId);
        }
    }, []);

    const fetchRechargeData = async (referenceId) => {
        try {
            const response = await axios.get(`https://cpa.up.railway.app/userGame/getRecharge?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                const transformData = []

                const formattedData = response.data.object.map((transaction) => {
                    transformData.unshift({
                        id: transaction.rechargeSenderId,
                        amount: `₹ ${transaction.transactionAmount}`,
                        date: convertToIST12HourFormat(transaction.rechargeTransactionsDateAndTime),

                    })
                });
                setRechargeData(transformData);
            }
        } catch (error) {
            console.error("Error fetching recharge data:", error);
        }
    };

    const fetchWithdrawData = async (referenceId) => {
        try {
            const response = await axios.get(`https://cpa.up.railway.app/userGame/getWithdraw?referanceId=${referenceId}`);
            if (response.data && response.data.message === "success") {
                const transformData = []

                const formattedData = response.data.object.map((transaction) => {
                    transformData.unshift({
                        id: transaction.rechargeSenderId,
                        amount: `₹ ${transaction.transactionAmount}`,
                        date: convertToIST12HourFormat(transaction.withdrawTransactionsDateAndTime),
                    })
                });
                setWithdrawData(transformData);
            }
        } catch (error) {
            console.error("Error fetching withdraw data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-start gap-2 p-2 max-w-full mx-auto w-full transition-all duration-500">
            <h1 className="text-xl font-semibold text-black pl-6 justify-start">
                Payment History
            </h1>

            {/* Tabs */}
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

                {/* Tab Content */}
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
    // Step 1: Parse the ISO date string into a Date object
    let date = new Date(isoDate);

    // Step 2: Convert to IST by adding 5 hours and 30 minutes
    let istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    let istDate = new Date(date.getTime() + istOffset);

    // Step 3: Extract date components (day, month, year)
    let day = istDate.getDate();
    let month = istDate.getMonth() + 1; // Months are 0-based in JavaScript
    let year = istDate.getFullYear();

    // Format day and month to always have 2 digits (e.g., 01, 09)
    let formattedDay = day < 10 ? '0' + day : day;
    let formattedMonth = month < 10 ? '0' + month : month;

    // Step 4: Format time to 12-hour clock
    let hours = istDate.getHours();
    let minutes = istDate.getMinutes();
    let seconds = istDate.getSeconds();

    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust for 12-hour format

    // Add leading zero to minutes and seconds if needed
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the formatted date and time
    return `${formattedDay}-${formattedMonth}-${year} ${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

export default UserPaymentHistory;
