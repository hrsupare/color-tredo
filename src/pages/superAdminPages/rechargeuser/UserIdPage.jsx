import ButtonUI from "../../../ui/ButtonUI";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { BASE_URL } from "../../../../constant";
import axios from "axios";

const UserIdPage = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false); // State to track verification
  const [userId, setUserId] = useState(""); // State for User ID input
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isVerifying, setIsVerifying] = useState(false); // State to track verifying process
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  const handleVerify = async () => {
    if (isVerifying) return;
    setIsVerifying(true);
    setErrorMessage("");
    if (userId.trim() === "") {
      setErrorMessage("User ID cannot be empty.");
      setIsVerifying(false);
      return;
    }

    try {
      const URL = `${BASE_URL}admin/getByReferenceId?referenceId=${userId}`;
      const getData = await axios.get(URL);
      if (getData.data && getData.data.object) {
        setUserData(getData.data.object);
        setIsVerified(true);
      } else {
        setErrorMessage("No data found for the provided User ID.");
        setIsVerified(false);
      }
    } catch (error) {
      setErrorMessage("No data found for the provided User ID");
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-16 p-8 bg-gradient-to-b from-indigo-200 via-white to-indigo-200 rounded-lg shadow-xl max-w-sm mx-auto transition-all duration-500">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-900 mb-4 md:mb-6 tracking-wide">
        Enter User Credentials
      </h1>

      <div className="flex items-center justify-center mb-4">
        <FaUserAlt className="text-4xl text-indigo-600 mr-2" />
        <span className="text-lg font-semibold text-gray-800">
          User Details
        </span>
      </div>

      <Input
        type="text"
        label="User ID"
        name="userId"
        value={userId}
        onChange={(e) => setUserId(e.target.value)} // Update state on input change
        className={`mb-4 w-full border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500`}
        placeholder="e.g., U12345"
      />

      {errorMessage && (
        <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg shadow-sm">
          <svg
            className="w-6 h-6 text-red-500 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-1.414 1.414a1 1 0 00-.293.707v8.486a1 1 0 01-1 1H8.343a1 1 0 01-1-1V7.757a1 1 0 00-.293-.707L5.636 5.636a2 2 0 010-2.828l1.414-1.414a2 2 0 012.828 0L12 4.93l2.122-2.122a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828z"
            />
          </svg>
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}
      {isVerified && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-full transition-all duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-extrabold text-indigo-900 mb-4 tracking-wide border-b-2 pb-2 border-indigo-200">
            Admin Information
          </h2>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-base font-semibold text-gray-800">
              <span className="text-indigo-600">Name:</span>{" "}
              {userData.name || "N/A"}
            </p>
          </div>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-base font-semibold text-gray-800">
              <span className="text-indigo-600">Email:</span>{" "}
              {userData.email || "N/A"}
            </p>
          </div>
          <div className="flex items-center mb-3">
            <FaUserAlt className="text-indigo-500 text-xl mr-3" />
            <p className="text-base font-semibold text-gray-800">
              <span className="text-indigo-600">Mobile No:</span>{" "}
              {userData.mobileNo || "N/A"}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between w-full">
        {/* Back Button */}
        <ButtonUI
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-[48%] py-3 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition duration-300 rounded-lg shadow-lg"
        >
          {/* <AiOutlineArrowLeft className="mr-2" /> */}
          <span>Back</span>
        </ButtonUI>

        {/* Verify Button */}
        {!isVerified && (
          <ButtonUI
            onClick={handleVerify}
            disabled={isVerifying} // Disable the button during verification
            className="flex items-center justify-center w-[48%] py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg shadow-lg"
          >
            <span className="font-semibold">
              {isVerifying ? "Verifying..." : "Verify"}
            </span>
          </ButtonUI>
        )}

        {isVerified && (
          <ButtonUI
            onClick={() =>
              navigate("/superadmin/user/1/name/amount", {
                state: {
                  userId,
                  name: userData.name,
                },
              })
            }
            className="flex items-center justify-center w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg shadow-lg mt-4"
          >
            <span className="font-semibold">Next</span>
          </ButtonUI>
        )}
      </div>
    </div>
  );
};

export default UserIdPage;
