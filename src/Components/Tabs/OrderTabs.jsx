import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaClipboardList, FaRegListAlt } from 'react-icons/fa'; // Import icons

const OrderTabs = () => {
  const [activeTab, setActiveTab] = React.useState("html");

  const data = [
    {
      label: "My Order",
      value: "react",
      desc: (
        <p className="text-lg text-gray-800">
          Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.
        </p>
      ),
      icon: <FaClipboardList className="text-xl" />, // Icon for My Order
    },
    {
      label: "Rules",
      value: "html",
      desc: (
        <div>
          {/* <h3 className="text-lg font-semibold text-gray-800">Rules</h3> */}
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li className="text-gray-700">2 minutes for 1 issue, 2 minutes 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trades is 480 issues.</li>
            <li className="text-gray-700">If you spend 100 rupees to trade, after deducting 2 rupees service fee, your contract amount is 98 rupees.</li>
            <li className="text-gray-700">JOIN GREEN: if the result shows 1, 3, 7, 9, you will get <strong>(98*2) 196 rupees</strong>; If the result shows 5, you will get <strong>(98*1.5) 147 rupees</strong>.</li>
            <li className="text-gray-700">JOIN RED: if the result shows 2, 4, 6, 8, you will get <strong>(98*2) 196 rupees</strong>; If the result shows 0, you will get <strong>(98*1.5) 147 rupees</strong>.</li>
            <li className="text-gray-700">JOIN VIOLET: if the result shows 0 or 5, you will get <strong>(98*4.5) 441 rupees</strong>.</li>
          </ul>
        </div>
      ),
      icon: <FaRegListAlt className="text-xl" />, // Icon for Rules
    },
  ];

  return (
    <div className="mb-6 font-extrabold text-xl w-full text-center p-1 text-gray-1000"> {/* Enhanced shadow */}
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-200 bg-transparent p-0"
          indicatorProps={{
            className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center space-x-2 transition-all duration-200 ease-in-out p-2 rounded-lg hover:bg-gray-100 ${activeTab === value ? "text-gray-900 bg-gray-200 font-bold" : "text-gray-600"}`}
            >
              {icon}
              <span className="font-medium">{label}</span> {/* More emphasis on tab label */}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              <div className="py-4">{desc}</div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default OrderTabs;