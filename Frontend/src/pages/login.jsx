import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import api from "../Apis/Api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import '../components/login/login.css'

const login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1) LOGIN -> token lo
      const res = await api.post("/auth/login", form);

      console.log("LOGIN RESPONSE >>>", res.data);

      const token = res.data.token;

      if (!token) {
        setError("Token not found in response");
        return;
      }

      // token save karo (interceptor isko use karega)
      localStorage.setItem("token", token);

      // 2) /auth/me se user + role lo
      const meRes = await api.get("/auth/me");
      console.log("ME RESPONSE >>>", meRes.data);

      const user = meRes.data.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // 3) ROLE ke hisaab se redirect
      if (user?.role === "admin") {
        navigate("/admin"); // admin dashboard
      } else {
        navigate("/admin/products"); // normal user products list
      }
    } catch (err) {
      console.error(err);

      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;

      if (status === 404) {
        setError("User not registered. Please sign up first.");
      } else if (status === 401) {
        setError("Invalid email or password.");
      } else if (backendMsg) {
        setError(backendMsg);
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <section className="login flex flex-col items-center justify-center p-20">
      <Link to="/collection/best-seller">
        <p className="flex items-center justify-center text-[14px] font-medium mb-2 mr-5">
          <span className="text-2xl border p-1 rounded-full m-1">
            <IoIosArrowRoundBack />
          </span>{" "}
          Back to Shop
        </p>
      </Link>
      <h1 className="text-4xl font-semibold mb-5 ">Log In</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="h-[60vh] w-[50%] outline-1 relative "
      >
        <h4 className="p-3 text-[20px] font-medium border-b">Log In</h4>
        <p className="p-3">I am a returning customer</p>

        <div className="form flex flex-row ">
          <div className="email flex flex-col">
            <label className="p-3">
              Email <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="flex border px-6 py-3 w-80 mx-3"
              required
            />
          </div>

          <div className="relative flex mt-12 items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="flex border px-6 py-3 w-80 mx-3"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 text-sm text-gray-600 hover:text-black cursor-pointer"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <hr className="my-10" />

        <div className="access flex items-center justify-center">
          <Link
            to="/admin/forgot-pass"
            className="absolute right-50 text-[14px] underline text-red-600 cursor-pointer"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="flex items-center justify-center absolute right-5 bg-[#172229] text-white px-12 py-3 rounded-3xl cursor-pointer text-[14px] font-semibold"
          >
            Login
            <span className="px-1">
              <HiOutlineArrowLongRight />
            </span>
          </button>
        </div>
        <hr className="mt-12" />
      </form>
      <div className="register flex flex-row items-center justify-center gap-5 -translate-y-20  ">
        <p className="text-[14px] ">If you dont have account</p>
        <Link
          to="/admin/signup"
          className="bg-[#FFE7D9] px-7 py-3 rounded-3xl flex items-center text-[14px] font-semibold cursor-pointer"
        >
          Register
          <span className="px-1">
            <HiOutlineArrowLongRight />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default login;
