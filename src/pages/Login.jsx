import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ImGift } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      let role = localStorage.getItem("role");
      if (role === "SUPERADMIN") {
        navigate("/superadmin");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setErrorMessage("Please enter email");
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMessage("Please enter password");
      setLoading(false);
      return;
    }

    const URL = `${BASE_URL}jwt/login`;
    try {
      const createLogin = await axios.post(URL, {
        username: email,
        password: password,
      });

      const token = createLogin.data;

      if (!token) {
        setErrorMessage("Invalid username or password");
        setLoading(false);
        return;
      }
      const decoded = jwtDecode(token);
      console.log(decoded, "DEBUG@313 ::::::::::::; decoded");
      const response = await axios.get(
        `${BASE_URL}userGame/getByUserId?userID=${decoded.userId}`
      );
      const data = await response.data;
      console.log(data, "data :::: data : data ");
      localStorage.setItem("authToken", token);
      localStorage.setItem("referenceId", data.object.referenceId);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("role", decoded.roles);
      if (decoded.roles.includes("SUPERADMIN")) {
        navigate("/superadmin", {
          state: {
            referenceId: data.object.referenceId,
            name: data.object.name,
            totalBalance: data.object.totalBalance,
          },
        });
      }
      if (decoded.roles.includes("ADMIN")) {
        navigate("/admin", {
          state: {
            referenceId: data.object.referenceId,
            name: data.object.name,
            totalBalance: data.object.totalBalance,
          },
        });
      }
      if (decoded.roles.includes("USER")) {
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Unauthorized: Invalid username or password");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4"
      style={{
        backgroundImage: 'url("/path-to-your-background-image.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full sm:w-80 md:w-96 lg:w-96 bg-white bg-opacity-90 shadow-2xl rounded-lg transition-transform transform hover:scale-105 duration-300">
        <CardHeader
          variant="gradient"
          color="indigo"
          className="mb-4 grid h-24 place-items-center rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <Typography
            variant="h3"
            color="white"
            className="text-3xl md:text-4xl font-bold"
          >
            Welcome Back
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-6 px-6 py-4">
          <Input
            label="Email"
            size="lg"
            className="text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            className="text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0 px-6 pb-6">
          <Button
            variant="gradient"
            fullWidth
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          {errorMessage && (
            <Typography color="red" className="mt-4 text-center font-semibold">
              {errorMessage}
            </Typography>
          )}
          <Typography
            variant="small"
            className="mt-6 flex justify-center text-sm text-gray-700"
          >
            Don&apos;t have an account?
            <Link to={"/signup"}>
              <Typography
                as="a"
                variant="small"
                className="ml-1 font-bold text-indigo-600 hover:text-purple-600 transition-colors duration-300"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
