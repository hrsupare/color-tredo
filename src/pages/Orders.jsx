import React, { useState } from "react";
import BottomNavBar from "../Components/Navbar/BottomNavBar";
import { OrderNav } from "../Components/Navbar/OrderNav";

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
            <OrderNav/>
            <div className="flex flex-col items-center justify-center gap-4 p-4 max-w-full mx-auto w-full transition-all duration-500">
                {/* <h2 className="text-lg md:text-xl font-semibold mb-4">Orders</h2> */}

                {/* Wrapper with overflow for table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                        <thead>
                            <tr className="bg-indigo-200 text-indigo-900">
                                <th className="p-3 text-xs md:text-sm lg:text-base">Period</th>
                                <th className="p-3 text-xs md:text-sm lg:text-base">Select</th>
                                <th className="p-3 text-xs md:text-sm lg:text-base">Point</th>
                                <th className="p-3 text-xs md:text-sm lg:text-base">Result</th>
                                <th className="p-3 text-xs md:text-sm lg:text-base">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border-b last:border-none">
                                    <td className="p-3 text-center text-xs md:text-sm lg:text-base">{item.period}</td>
                                    <td className="p-3 text-center text-xs md:text-sm lg:text-base">{item.select}</td>
                                    <td className="p-3 text-center text-xs md:text-sm lg:text-base">{item.Point}</td>
                                    <td className="p-3 text-center text-xs md:text-sm lg:text-base">{item.result}</td>
                                    <td className="p-3 text-center text-xs md:text-sm lg:text-base">{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default Orders;
