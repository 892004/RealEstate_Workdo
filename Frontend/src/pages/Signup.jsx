import React, { useState } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link} from "react-router-dom";
import api from "../Apis/Api";
import '../components/login/login.css'

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1) Register user
      const payload = {
        name: `${form.firstName} ${form.lastName}`, // DB me agar "name" column hai
        email: form.email,
        password: form.password,
      };

      await api.post("/auth/register", payload);

      // 2) Register ke baad same creds se login
      const loginRes = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = loginRes.data.token;
      if (!token) {
        setError("Token not found in login response");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);

      // 3) /auth/me se user details fetch
      const meRes = await api.get("/auth/me");
      const user = meRes.data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // 4) Signup ke baad normal user → products list
      navigate("/collection/best-seller");
    } catch (err) {
      console.error(err);
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="Signup flex flex-col items-center justify-center p-5">

       <Link to="/collection/best-seller">
        <p className="flex items-center justify-center text-[14px] font-medium mb-2 mr-5">
          <span className="text-2xl border p-1 rounded-full m-1">
            <IoIosArrowRoundBack />
          </span>{" "}
          Back to Shop
        </p>
      </Link>
      <h1 className="text-4xl font-semibold mb-5 ">Register</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form
        className="h-[70vh] w-[50%] border"
        onSubmit={handleSubmit}
      >
        <p className="p-3 text-[18px] border-b">Your Personal Details</p>

        <div className="personal-details flex-wrap p-4 ml-3 flex flex-row items-start justify-center gap-10">
          {/* First Name */}
          <div className="first-name">
            <label className="text-[14px] font-semibold">
              First Name <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border flex px-5 py-3 w-80 mt-2 "
              required
            />
          </div>

          {/* Last Name */}
          <div className="last-name  ">
            <label className="text-[14px] font-semibold">
              Last Name <span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border flex px-5 py-3 w-80 mt-2 "
              required
            />
          </div>
        </div>

          {/* Email */}
          <div className="email ml-10 ">
            <label className="text-[14px] font-semibold">
              Email<span className="text-red-500"> *</span>:
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border flex px-5 py-3 w-170 mt-1 "
              required
            />
          </div>
        <hr className="mt-3"/>

        <div className="your-password">
          <p className="p-3 text-[18px]">
            Your <span className="font-semibold">Password</span>
          </p>
          <label className="text-[14px] font-semibold ml-10">
            Password <span className="text-red-500 ">*</span>:
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border flex px-5 py-3 w-170 mt-3 ml-10 "
            required
          />
        </div>
        <hr className="mt-10" />

        <div className="btn flex items-center justify-end mt-6 mr-10">
          <button
            type="submit"
            disabled={loading}
            className="border border-black bg-[#172229] cursor-pointer px-15 py-2 rounded-4xl flex items-center text-[#FFE7D9] disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create"}
            <span className="p-1">
              <HiOutlineArrowLongRight />
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
  