import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@material-tailwind/react";
import { BASE_URL } from "../../../constant";
import axios from "axios";

const GameDashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [totalContractMoney, setTotalContractMoney] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [contractMoney, setContractMoney] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [midNumber, setMidNumber] = useState(1);
  const [periodNumber, setPeriodNumber] = useState(0);
  const loggedInUserId = localStorage.getItem("referenceId");
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(
    location.state?.totalBalance || 0
  );
  const [globalSelected, setGlobalSelected] = useState(null);

  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [counter, setCounter] = useState(null); // Store the counter time
  const [isSyncing, setIsSyncing] = useState(false); // Show sync status
  const syncIntervalRef = useRef(10000); // Start sync interval at 10 seconds
  const driftThreshold = 2; // Maximum allowable drift in seconds
  const counterRef = useRef(counter); // Use ref to track counter

  const getColorClass = (wonColor) => {
    switch (wonColor) {
      case 101:
        return "bg-red-600";
      case 102:
        return "bg-yellow-600"; // Red for wonColor 101 and 102
      case 103:
        return "bg-black"; // Black for wonColor 103
      default:
        return "bg-gray-300"; // Default color if needed
    }
  };

  const fetchRechargeData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}userGame/getRechargeAdminside?referanceId=${loggedInUserId}`
      );

      if (response.data.message === "success") {
        setTotalBalance(response.data.object.totalBalnce);
      } else {
        setError("Failed to fetch recharge data.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again later.");
    }
  };

  const fetchLatestPeriod = async () => {
    try {
      const getLatestPeriodUrl = `${BASE_URL}userGame/getLivePeriodNo`;
      const getLatestPeriod = await axios.get(getLatestPeriodUrl);
      setPeriodNumber(getLatestPeriod.data.object.period);
    } catch (error) {
      console.error("Error fetching the latest period:", error);
    }
  };

  const fetchLatestResults = async () => {
    try {
      const getLatestResultsUrl = `${BASE_URL}userGame/getResult`;
      const getLatestResults = await axios.get(getLatestResultsUrl);
      setAllResults(getLatestResults.data.object); // Set the fetched results to state
    } catch (error) {
      console.error("Error fetching the latest period:", error);
      setError("Failed to fetch latest results."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (counter === 30) {
      setPopupVisible(false);
      setSelectedNumber(null);
      setSelectedImage(null);
      setButtonColor("");
      setGlobalSelected(null);
    }

    if (counter === 1) {
      fetchLatestPeriod();
      fetchLatestResults();
      fetchRechargeData();
    }
  }, [counter]);

  const handleButtonClick = (color) => {
    if (counter > 30) {
      setButtonColor(color);
      setGlobalSelected(color);
      setPopupVisible(true);
    }
  };
  const imageNames = [
    { name: "cow", selected: "_1_" },
    { name: "bucket", selected: "_2_" },
    { name: "kite", selected: "_3_" },
    { name: "lattu", selected: "_4_" },
    { name: "rose", selected: "_5_" },
    { name: "butterfly", selected: "_6_" },
    { name: "peageon", selected: "_7_" },
    { name: "rabbit", selected: "_8_" },
    { name: "umbrella", selected: "_9_" },
    { name: "football", selected: "_10_" },
    { name: "sun", selected: "_11_" },
    { name: "diya", selected: "_12_" },
  ];
  const handleConfirmPopup = async () => {
    setInsufficientFunds(false);

    const colorCodes = {
      RED: "_RED_",
      BLACK: "_BLACK_",
      YELLOW: "_YELLOW_",
    };

    const numberCodes = {
      0: "_ZERO_",
      1: "_ONE_",
      2: "_TWO_",
      3: "_THREE_",
      4: "_FOUR_",
      5: "_FIVE_",
      6: "_SIX_",
      7: "_SEVEN_",
      8: "_EIGHT_",
      9: "_NINE_",
    };

    let checkColorOrNumberSelected;

    if (buttonColor) {
      checkColorOrNumberSelected = colorCodes[buttonColor];
    }

    if (selectedNumber !== null) {
      checkColorOrNumberSelected = numberCodes[selectedNumber];
    }

    if (selectedImage !== null) {
      checkColorOrNumberSelected = selectedImage;
    }


    const joinTheGameColorOrNumberApi = `${BASE_URL}userGame/saveGameColorOrNumber?referenceId=${loggedInUserId}&colorOrNumber=${checkColorOrNumberSelected}&amount=${totalContractMoney}&period=${periodNumber}`;

    

    try {
      const joinTheGameColorOrNumberApiCall = await axios.post(
        joinTheGameColorOrNumberApi
      );
    
      
    } catch (error) {
      setInsufficientFunds(true);
      return;
    }

    setPopupVisible(false);
    setSelectedNumber(null);
    setSelectedImage(null);
    setButtonColor("");
    setGlobalSelected(null);
    fetchRechargeData();
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedNumber(null);
    setSelectedImage(null);
    setButtonColor("");
    setGlobalSelected(null);
    setInsufficientFunds(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-overlay") {
      handleClosePopup();
    }
  };

  const handleBadgeClick = (number) => {
    if (counter > 30) {
      setSelectedNumber(number);
      setGlobalSelected(number);
      setPopupVisible(true);
      setTotalContractMoney(contractMoney * midNumber);
    }
  };

  const handleImageClick = (index, image, selected) => {
    if (counter > 30) {
      setPopupVisible(true);
      setSelectedImage(selected);
      setGlobalSelected(image);
      setSelectedImageName(image);
    }
  };

  useEffect(() => {
    fetchLatestPeriod();
    fetchLatestResults();
    fetchRechargeData();
  }, []);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const badgeBackgroundStyles = (number) => {
    if (counter <= 30) {
      return `bg-gray-300 cursor-not-allowed`;
    }

    switch (number) {
      case 0:
        return `bg-half-black-red text-white`;
      case 5:
        return `bg-half-black-yellow text-white`;
      case 1:
      case 4:
      case 7:
        return `bg-yellow-700`;
      case 2:
      case 8:
        return `bg-red-600`;
      case 3:
      case 6:
      case 9:
        return `bg-black text-white`;
      default:
        return ``;
    }
  };

  const isDisabled = counter <= 30;

  const increaseMidNumber = (value) => {
    setMidNumber((prev) => prev + value);
  };

  const decreaseMidNumber = (value) => {
    const decNumber = midNumber - value;
     if (value === 5 && decNumber <= 0) {
      return;
    }

    setMidNumber((prev) => Math.max(1, prev - value));
  };

  useEffect(() => {
    setTotalContractMoney(contractMoney * midNumber);
  }, [contractMoney, midNumber]);

  useEffect(() => {
    counterRef.current = counter; // Update ref whenever counter changes
  }, [counter]);

  useEffect(() => {
    const fetchInitialTime = async () => {
      try {
        const startTime = Date.now();
        const response = await fetch(`${BASE_URL}time/remaining-time`);
        const data = await response.json();
        const endTime = Date.now();
        const latency = Math.floor((endTime - startTime) / 1000 / 2);
        const adjustedTime = Math.max(data - latency, 0);
        setCounter(adjustedTime);
      } catch (error) {
        console.error("Failed to fetch initial time:", error);
      }
    };

    fetchInitialTime();

    // Local countdown timer
    const countdownInterval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          // When it hits zero, fetch the initial time again to restart
          fetchInitialTime(); // Restart the timer from API value
          return 0; // Ensure it stays at 0 until new value is set
        }
      });
    }, 1000);

    // Function to sync with server and adjust for drift
    const syncWithServer = async () => {
      if (isSyncing || counterRef.current <= 0) return; // Prevent syncing if syncing in progress or counter is 0

      try {
        setIsSyncing(true);
        const syncStartTime = Date.now();
        const response = await fetch(`${BASE_URL}time/remaining-time`);
        const data = await response.json();
        const syncEndTime = Date.now();

        // Calculate latency
        const latency = Math.floor((syncEndTime - syncStartTime) / 1000 / 2);
        // Adjust the server's counter for latency
        const serverTime = Math.max(data - latency, 0); // Ensure it's not negative

        // Calculate drift
        const drift = serverTime - counterRef.current;

        // Correct the counter based on drift
        if (Math.abs(drift) > driftThreshold) {
          // Adjust the local counter to match the server time
          setCounter(serverTime);
          // Reset sync interval to a lower frequency if drift exceeds threshold
          syncIntervalRef.current = 10000; // Sync every 10 seconds
        } else if (syncIntervalRef.current < 60000) {
          // Increase sync interval progressively if drift is within threshold
          syncIntervalRef.current += 5000; // Increase by 5 seconds
        }
      } catch (error) {
        console.error("Failed to sync time:", error);
      } finally {
        setIsSyncing(false);
      }
    };

    // Set interval to periodically sync with server
    const syncInterval = setInterval(syncWithServer, syncIntervalRef.current);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(countdownInterval);
      clearInterval(syncInterval);
    };
  }, [isSyncing]);

   return (
    <div className="p-3 bg-white shadow-md rounded-lg font-serif max-w-md mx-auto sm:max-w-lg lg:max-w-xl sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="mx-2">
          <p className="font-bold text-sm sm:text-lg">Periods</p>
          <p className="font-semibold text-xl sm:text-2xl">{periodNumber}</p>
        </div>
        <div className="mx-2 text-center">
          <p className="font-bold text-sm sm:text-lg">Count Down</p>
          <div className="flex space-x-1">
            {minutes
              .toString()
              .padStart(2, "0")
              .split("")
              .map((digit, index) => (
                <div
                  key={`minute-${index}`}
                  className="bg-gray-200 rounded-md p-1 w-8 text-center"
                >
                  <p className="text-lg font-semibold">{digit}</p>
                </div>
              ))}
            <div>
              <p className="text-xl font-semibold">:</p>
            </div>
            {seconds
              .toString()
              .padStart(2, "0")
              .split("")
              .map((digit, index) => (
                <div
                  key={`second-${index}`}
                  className="bg-gray-200 rounded-md p-1 w-8 text-center"
                >
                  <p className="text-lg font-semibold">{digit}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-3 sm:mt-5">
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-400"
            }`}
            onClick={() => handleButtonClick("RED")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">
              Join Red
            </span>
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-600 to-yellow-400"
            }`}
            onClick={() => handleButtonClick("YELLOW")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">
              Join Yellow
            </span>
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`w-full h-[2.5rem] rounded-md shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
              isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-black"
            }`}
            onClick={() => handleButtonClick("BLACK")}
            disabled={isDisabled}
          >
            <span className="text-white font-semibold text-sm sm:text-md">
              Join Black
            </span>
          </button>
        </div>
      </div>

      {/* Number Selection Section */}
      <div className="mt-6 font-extrabold text-lg sm:text-xl w-full text-center p-1 text-gray-1000">
        Select the Number
      </div>

      <div className="flex justify-between p-2 sm:p-5 gap-3 mx-4 sm:mx-6">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleBadgeClick(index)}
            className={`focus:outline-none transform hover:scale-105 transition-transform duration-200 
        ${isDisabled ? "cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(
                index
              )}`}
              content={index}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-4 mb-4 sm:mt-6 gap-3 p-2 sm:p-5 mx-4 sm:mx-6">
        {[5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleBadgeClick(number)}
            className={`focus:outline-none transform hover:scale-105 transition-transform duration-200 
              ${isDisabled ? "cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            <Badge
              className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm font-bold ${badgeBackgroundStyles(
                number
              )}`}
              content={number}
            />
          </button>
        ))}
      </div>

      {/* Title for images */}
      <div className="mt-6 font-extrabold text-lg sm:text-xl w-full text-center p-1 text-gray-1000">
        Select the Images
      </div>

      {/* Space for images */}
      {/* Space for images */}
      <div className="grid grid-cols-4 gap-3 p-2 sm:gap-3">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`relative w-full h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-1 ${
              counter <= 30 ? "opacity-50 cursor-not-allowed" : "" // Disable if counter is <= 30
            }`}
            onClick={() =>
              handleImageClick(
                index + 1,
                imageNames[index]["name"],
                imageNames[index]["selected"]
              )
            } // Send both index and name
          >
            <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-inner hover:scale-105 transform transition-transform duration-200">
              <img
                src={`../assets/${index + 1}.png`} // Path to public folder images
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {/* =============================================================== */}

      <div className="p-3 bg-white rounded-lg shadow-lg">
        {/* Top Divider */}
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Heading */}
        <h1 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2 border-gray-300">
          Last Parity Results
        </h1>

        {/* Table Wrapper for Scrollable Body */}
        <div className="overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg">
  <table className="min-w-full border-collapse rounded-lg overflow-hidden text-xs">
    <thead>
      <tr className="bg-gray-100 text-gray-800 border-b-2 border-gray-300">
        <th className="p-2 text-left font-medium uppercase tracking-wider">Period</th>
        <th className="p-2 text-left font-medium uppercase tracking-wider">Number</th>
        <th className="p-2 text-center font-medium uppercase tracking-wider">Color</th>
        <th className="p-2 text-center font-medium uppercase tracking-wider">Image</th>
      </tr>
    </thead>
    <tbody>
      {allResults.map((order, index) => (
        <tr
          key={order.id}
          className={`${
            index === 0 ? "bg-yellow-100" : "bg-white"
          } hover:bg-gray-50 transition-colors duration-150`}
        >
          <td className="p-2 border-b border-gray-200 text-gray-900">{order.period}</td>
          <td className="p-2 border-b border-gray-200 text-gray-900 text-center">{order.wonNumber}</td>
          <td className="p-2 border-b border-gray-200 text-center">
            {/* Circular color indicator with border */}
            <div
              className={`w-5 h-5 inline-block rounded-full border border-gray-300 ${getColorClass(
                order.wonColor
              )}`}
            ></div>
          </td>
          <td className="p-2 border-b border-gray-200 text-center">
            <img
           src={`../assets/${order.wonTNumber }.png`} // Dummy image URL with randomization
           alt={`Placeholder ${index}`}
           className="w-10 h-10 rounded-lg object-cover"

            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

      {isPopupVisible && (
        <div
          id="popup-overlay"
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60"
          onClick={handleOutsideClick}
        >
          <div className="p-4 bg-white shadow-lg rounded-2xl w-[95%] max-w-sm mx-auto sm:w-full sm:max-w-md sm:p-6 transition-all transform ease-in-out">
            <h2 className="font-semibold text-xl mb-4 text-center text-gray-800">
              {`Join ${globalSelected}`}
            </h2>

            <p className="text-base font-medium text-gray-700">
              Contract Money
            </p>
            <div className="flex space-x-1 mb-4">
              {[10, 100, 1000].map((value) => (
                <button
                  key={value}
                  className={`flex-1 py-2 text-sm rounded-lg transition-all duration-200 ${
                    contractMoney === value
                      ? "bg-pink-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-pink-300 hover:text-white`}
                  onClick={() => setContractMoney(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-700 font-medium mb-1">Numbers</p>
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2">
                <button
                  className="bg-gray-200 rounded-lg py-1 w-12 text-sm hover:bg-gray-300"
                  onClick={() => decreaseMidNumber(5)}
                >
                  -5
                </button>
                <button
                  className="bg-gray-200 rounded-lg py-1 w-12 text-sm hover:bg-gray-300"
                  onClick={() => decreaseMidNumber(1)}
                >
                  -1
                </button>
              </div>

              <div className="text-3xl font-bold text-gray-800">
                {midNumber}
              </div>

              <div className="flex space-x-2">
                <button
                  className="bg-gray-200 rounded-lg py-1 w-12 text-sm hover:bg-gray-300"
                  onClick={() => increaseMidNumber(1)}
                >
                  +1
                </button>
                <button
                  className="bg-gray-200 rounded-lg py-1 w-12 text-sm hover:bg-gray-300"
                  onClick={() => increaseMidNumber(5)}
                >
                  +5
                </button>
              </div>
            </div>

            <p className="text-base text-gray-700 font-medium mb-6">
              Total Contract money is&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="font-bold text-indigo-500 text-2xl">
                ₹{totalContractMoney}
              </span>
            </p>

            {/* Error message for insufficient funds */}
            {insufficientFunds && (
              <p className="text-sm text-red-500 font-semibold mb-6">
                Insufficient funds! Please adjust the contract money.
              </p>
            )}

            <div className="flex justify-center mt-4 p-1 space-x-2">
              <button
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-200 text-white text-sm rounded-lg px-6 py-2 h-[2.5rem] shadow-md transition-all duration-200"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              {!insufficientFunds && (
                <button
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-200 text-white text-sm rounded-lg px-6 py-2 h-[2.5rem] shadow-md transition-all duration-200"
                  onClick={handleConfirmPopup}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDashboard;
