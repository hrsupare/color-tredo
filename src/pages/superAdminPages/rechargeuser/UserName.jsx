import NumberInputForm from "../../../forms/NumberInputForm";
import ButtonUI from "../../../ui/ButtonUI";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const UserName = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-16 p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center text-indigo-800 mb-4">Enter User Name</h1>
      
      <div className="flex items-center justify-center mb-4">
        <FaUserAlt className="text-4xl text-indigo-600 mr-2" />
        <span className="text-lg font-semibold text-gray-800">User Details</span>
      </div>

      <NumberInputForm 
        type="text" 
        label={"User Name"} 
        name={"userName"} 
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500"
        placeholder="e.g., John Doe"
      />

      <ButtonUI 
        onClick={() => navigate('/superadmin/user/1/name/amount')} 
        className="flex items-center justify-center w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300 rounded-lg shadow-lg"
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

export default UserName;