import NumberInputForm from "../../../forms/NumberInputForm";
import ButtonUI from "../../../ui/ButtonUI";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const AdminUserRechargeUserNamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16 p-6 md:p-8 lg:p-10 bg-gradient-to-b from-indigo-300 via-white to-indigo-300 rounded-xl shadow-2xl max-w-sm md:max-w-md lg:max-w-lg mx-auto transition-all duration-500 transform hover:scale-105">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 mb-4 md:mb-6 tracking-wide">
        Enter User Name
      </h1>
      
      <div className="flex items-center justify-center mb-4 md:mb-6">
        <FaUserAlt className="text-4xl text-indigo-700 mr-2" />
        <span className="text-lg md:text-xl font-semibold text-gray-900">User Details</span>
      </div>

      <NumberInputForm 
        type="text" 
        label={"User Name"} 
        name={"userName"} 
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 transition-all duration-300"
        placeholder="e.g., John Doe"
      />

      <ButtonUI 
        onClick={() => navigate('/admin/user/1/name/amount')} 
        className="flex items-center justify-center w-full py-3 text-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold transition duration-300 rounded-lg shadow-lg transform hover:scale-105"
      >
        <span className="font-semibold">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </ButtonUI>
    </div>
  );
};

export default AdminUserRechargeUserNamePage;