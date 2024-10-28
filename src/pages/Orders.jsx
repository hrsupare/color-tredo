import React, { useEffect, useState } from "react";
import BottomNavBar from "../Components/Navbar/BottomNavBar";
import { BASE_URL } from "../../constant";
import axios from "axios";

const Orders = () => {
    const [allResults, setAllResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const loggedInUserId = localStorage.getItem("referenceId");

    useEffect(() => {
        fetchLatestResults();
    }, []);

    const fetchLatestResults = async () => {
        try {
            const getLatestResultsUrl = `${BASE_URL}userGame/getOrderByUserRefIdDone?referanceId=${loggedInUserId}`;
            const getLatestResults = await axios.get(getLatestResultsUrl);
            setAllResults(getLatestResults.data.object);
        } catch (error) {
            console.error('Error fetching the latest results:', error);
            setAllResults([])
            // setError('Failed to fetch latest results.');
        } finally {
            setLoading(false);
        }
    };

    const getTrueNumbers = (item) => {
        const numbers = [];
        for (let i = 1; i <= 9; i++) {
            if (item[i.toString()]) {
                numbers.push(i);
            }
        }
        return numbers.length > 0 ? numbers : ["N"];
    };

    const getColorBadgeClass = (order) => {
        if (order.red) return 'bg-red-600';
        if (order.yellow) return 'bg-yellow-700';
        if (order.black) return 'bg-black text-white';
        return 'bg-gray-300';
    };

    return (
        <div className="p-4 bg-white min-h-screen font-serif">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">
                    Last Orders
                </h1>

                {loading ? (
                    <div className="flex items-center justify-center h-28">
                        <p className="text-indigo-500 text-lg font-medium">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-28">
                        <p className="text-red-500 text-lg font-medium">{error}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="bg-gray-100 text-indigo-700">
                                <tr>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">Period</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">Amount</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">Status</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">Numbers</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allResults.slice(0).reverse().map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}
                                    >
                                        <td className="px-3 py-2 border-b border-gray-200 text-center text-gray-800">
                                            {order.period}
                                        </td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-center text-gray-800">
                                            {order.amount}
                                        </td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-center text-gray-800 font-semibold">
                                            {order.winStatus ? "Won" : "Lost"}
                                        </td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-center text-gray-800">
                                            {getTrueNumbers(order).join(", ")}
                                        </td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-center">
                                            <span
                                                className={`inline-block w-4 h-4 rounded-full ${getColorBadgeClass(order)}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <BottomNavBar />
            </div>
        </div>
    );
};

export default Orders;
