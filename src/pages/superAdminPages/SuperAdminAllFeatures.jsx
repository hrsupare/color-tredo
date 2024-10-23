import ButtonUI from "../../ui/ButtonUI";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaUser,
  FaHistory,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { BASE_URL } from "../../../constant";
import axios from "axios";
import { useEffect, useState } from "react";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceId, setReferenceId] = useState(location.state?.referenceId || "");
  const [name, setName] = useState(location.state?.name || "");
  const [totalBalance, setTotalBalance] = useState(location.state?.totalBalance || 0);

  useEffect(() => {
    if (!referenceId && localStorage.getItem("role") === "SUPERADMIN" && localStorage.getItem("referenceId")) {
      console.log("SUPERADMIN SPOTTED");

      const getSuperAdminData = async () => {
        try {
          const URL = `${BASE_URL}admin/getByReferenceId?referenceId=${localStorage.getItem("referenceId")}`;
          console.log(URL, "URL");

          const response = await axios.get(URL);
          console.log(response.data, "response.data")
          if (response.data) {
            // Update state with fetched data
            setReferenceId(response.data.object.referenceId);
            setName(response.data.object.name);
            setTotalBalance(response.data.object.totalBalnce);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      getSuperAdminData(); // Call the function to fetch data
    }
  }, [referenceId]);

  const handleSignOut = () => {
    localStorage.clear("userId");
    localStorage.clear("authToken");
    localStorage.clear("role");
    localStorage.clear("referenceId");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-200 via-white to-indigo-200 py-10 px-4 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
        Super Admin Dashboard
      </h1>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
        Hello {name}
      </h1>
      <div className="max-w-2xl w-full p-5 mb-8">
        <div className="flex flex-col items-center mb-10 p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-800">
            Super Admin ID:{" "}
            <span className="font-semibold text-blue-600"> {referenceId}</span>
          </p>
          <p className="text-lg text-gray-800">
            Total:
            <span className="font-semibold text-blue-600">
              ₹ {totalBalance}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <ButtonUI
            onClick={() => navigate("/superadmin/admin/1")}
            className="flex items-center justify-between p-5 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition duration-300 rounded-lg shadow-md transform hover:scale-105"
          >
            <div className="flex items-center">
              <FaBolt className="h-6 w-6 mr-3" />
              <span className="font-semibold">Recharge Admin</span>
            </div>
          </ButtonUI>

          <ButtonUI
            onClick={() => navigate("/superadmin/user/1")}
            className="flex items-center justify-between p-5 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition duration-300 rounded-lg shadow-md transform hover:scale-105"
          >
            <div className="flex items-center">
              <FaUser className="h-6 w-6 mr-3" />
              <span className="font-semibold">Recharge User</span>
            </div>
          </ButtonUI>

          <ButtonUI
            onClick={() => navigate("/paymenthistory")}
            className="flex items-center justify-between p-5 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition duration-300 rounded-lg shadow-md transform hover:scale-105"
          >
            <div className="flex items-center">
              <FaHistory className="h-6 w-6 mr-3" />
              <span className="font-semibold">Recharge History</span>
            </div>
          </ButtonUI>

          <ButtonUI
            onClick={() => navigate("/superadmin/admin-signup")}
            className="flex items-center justify-between p-5 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition duration-300 rounded-lg shadow-md transform hover:scale-105"
          >
            <div className="flex items-center">
              <FaPlusCircle className="h-6 w-6 mr-3" />
              <span className="font-semibold">Create Admin</span>
            </div>
          </ButtonUI>
        </div>

        <p className="text-center text-gray-700 mt-6 text-md">
          Use the buttons above to manage admin accounts, view history, and
          recharge users.
        </p>

        {/* Logout Button positioned at the bottom right of the card */}
        <div className="flex justify-end mt-4">
          <ButtonUI
            onClick={handleSignOut}
            className="px-8 py-3 text-lg bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105 flex items-center"
          >
            <FaSignOutAlt className="h-5 w-5 mr-2" />
            Sign Out
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
