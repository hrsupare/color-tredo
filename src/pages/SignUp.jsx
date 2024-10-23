import React, { useState } from 'react';
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
import axios from "axios";
import { BASE_URL } from '../../constant';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    roles: 'USER',
    password: '',
    confirmPassword: '',
    referralId: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const URL = `${BASE_URL}account/register`;

      try {
        let obj = {
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          roles: "USER",
          password: formData.password,
          referralId: formData.referralId,
        };
        console.log(obj, "object");
        
        const response = await axios.post(URL, obj);

        console.log(response.data);
        if (response.data.code === "Successful") {
          navigate("/");
        } else {
          setErrorMessage(response.data.message || "Sign up failed. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "An error occurred. Please try again later.");
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2  max-w-lg mx-auto w-full transition-all duration-500">
      <Card className="w-full max-w-md sm:max-w-xs bg-white shadow-2xl rounded-lg transition-transform transform hover:scale-105 duration-300">
        <CardHeader
          variant="gradient"
          color="indigo"
          className="mb-4 grid h-24 place-items-center rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          <Typography
            variant="h3"
            className="text-2xl md:text-3xl font-bold font-sans text-white"
          >
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 px-6 py-4">
          <Input
            label="Name"
            size="lg"
            className="text-black"
            variant="outlined"
            color="black"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
          />
          {errors.name && <Typography color="red">{errors.name}</Typography>}

          <Input
            label="Email"
            size="lg"
            className="text-black"
            variant="outlined"
            color="black"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
          />
          {errors.email && <Typography color="red">{errors.email}</Typography>}

          <Input
            label="Mobile Number"
            size="lg"
            className="text-black"
            variant="outlined"
            color="black"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            error={!!errors.mobileNo}
          />
          {errors.mobileNo && <Typography color="red">{errors.mobileNo}</Typography>}

          <Input
            label="Password"
            size="lg"
            type="password"
            className="text-black"
            variant="outlined"
            color="black"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
          />
          {errors.password && <Typography color="red">{errors.password}</Typography>}

          <Input
            label="Confirm Password"
            size="lg"
            type="password"
            className="text-black"
            variant="outlined"
            color="black"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && <Typography color="red">{errors.confirmPassword}</Typography>}

          <Input
            label="Referral ID (Optional)"
            size="lg"
            className="text-black"
            variant="outlined"
            color="black"
            name="referralId"
            value={formData.referralId}
            onChange={handleChange}
          />
          {errorMessage && <Typography color="red">{errorMessage}</Typography>}
        </CardBody>
        <CardFooter className="pt-0 px-6 pb-6">
          <Button
            variant="gradient"
            fullWidth
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Typography
            variant="small"
            className="mt-4 flex justify-center text-sm text-gray-700"
          >
            Already have an account?
            <Link to={"/"}>
              <Typography
                as="a"
                variant="small"
                className="ml-1 font-bold text-indigo-600 hover:text-purple-600 transition-colors duration-300"
              >
                Sign In
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
