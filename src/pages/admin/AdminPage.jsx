import ButtonUI from "../../ui/ButtonUI";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBolt, FaUser, FaHistory, FaMinusCircle, FaSignOutAlt } from "react-icons/fa"; // Icons for buttons
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constant";
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceId, setReferenceId] = useState(location.state?.referenceId || "");
  const [name, setName] = useState(location.state?.name || "");
  const [totalBalance, setTotalBalance] = useState(location.state?.totalBalance || 0);

   useEffect(() => {
    if (!referenceId && localStorage.getItem("role") === "ADMIN" && localStorage.getItem("referenceId")) {
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
    localStorage.clear('userId');
    localStorage.clear('authToken');
    localStorage.clear('role');
    localStorage.clear("referenceId");
    navigate('/');
  };

  return (
    <div className="mt-5 p-8 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">Admin Dashboard</h1>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
        Hello {name}
      </h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Uncomment to enable the Recharge ADMIN button */}
        {/* <ButtonUI 
          onClick={() => navigate("/superadmin/admin/1")} 
          className="flex items-center justify-center py-5 text-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition duration-300 rounded-lg shadow-lg transform hover:scale-105">
          <div className="flex items-center justify-center">
            <FaBolt className="h-8 w-8 mr-3 transition duration-300 transform hover:scale-110" />
            <span className="font-medium">Recharge ADMIN</span>
          </div>
        </ButtonUI> */}

        <ButtonUI 
          onClick={() => navigate("/admin/user/1")} 
          className="flex items-center justify-center py-5 text-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition duration-300 rounded-lg shadow-lg transform hover:scale-105">
          <div className="flex items-center justify-center">
            <FaUser className="h-8 w-8 mr-3 transition duration-300 transform hover:scale-110" />
            <span className="font-medium">Recharge USER</span>
          </div>
        </ButtonUI>

        <ButtonUI 
          onClick={() => navigate("/paymenthistory")} 
          className="flex items-center justify-center py-5 text-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition duration-300 rounded-lg shadow-lg transform hover:scale-105">
          <div className="flex items-center justify-center">
            <FaHistory className="h-8 w-8 mr-3 transition duration-300 transform hover:scale-110" />
            <span className="font-medium">Recharge HISTORY</span>
          </div>
        </ButtonUI>

        <ButtonUI 
          onClick={() => navigate("/admin/withdraw")} 
          className="flex items-center justify-center py-5 text-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition duration-300 rounded-lg shadow-lg transform hover:scale-105">
          <div className="flex items-center justify-center">
            <FaMinusCircle className="h-8 w-8 mr-3 transition duration-300 transform hover:scale-110" />
            <span className="font-medium">Withdraw</span>
          </div>
        </ButtonUI>
      </div>

      <div className="mt-8">
        <p className="text-gray-600 text-center text-lg">Manage your admin actions with ease and efficiency.</p>
      </div>

       <div className="flex justify-end mt-6">
        <ButtonUI 
          onClick={handleSignOut} 
          className="px-8 py-3 text-lg bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105 flex items-center">
          <FaSignOutAlt className="h-5 w-5 mr-2" />
          Sign Out
        </ButtonUI>
      </div>
    </div>
  );
};

export default AdminPage;