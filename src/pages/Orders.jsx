import React, { useState } from "react";
import BottomNavBar from "../Components/Navbar/BottomNavBar";

const Orders = () => {
    const [data, setData] = useState([
        { period: "Q1", select: "yes", Point: "Point A", result: "Success", amount: "$500" },
        { period: "Q2", select: "yes", Point: "Point B", result: "Failure", amount: "$300" },
        { period: "Q3", select: "yes", Point: "Point C", result: "Pending", amount: "$450" },
        { period: "Q3", select: "yes", Point: "Point C", result: "Pending", amount: "$450" },
        { period: "Q3", select: "yes", Point: "Point C", result: "Pending", amount: "$450" }
    ]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2 p-2  max-w-lg mx-auto w-full transition-all duration-500">
                <h2 className="text-lg font-semibold mb-2">Orders</h2>
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-indigo-200 text-indigo-900">
                            <th className="p-2">Period</th>
                            <th className="p-2">Select </th>
                            <th className="p-2">Point</th>
                            <th className="p-2">Result</th>
                            <th className="p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b last:border-none">
                                <td className="p-2 text-center">{item.period}</td>
                                <td className="p-2 text-center">{item.select}</td>
                                <td className="p-2 text-center">{item.Point}</td>
                                <td className="p-2 text-center">{item.result}</td>
                                <td className="p-2 text-center">{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <BottomNavBar />
        </div >
    );
};

export default Orders;
