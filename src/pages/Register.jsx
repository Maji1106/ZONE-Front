import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    latitude: "",
    longitude: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      // Check if all fields are filled
      if (!user.username || !user.password || !user.email || !user.latitude || !user.longitude) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill in all fields.",
          icon: "warning",
        });
        return;
      }
      // Call API to handle registration
      const response = await axios.post("http://localhost:5000/api/auth/register", user);
      if (response.status === 200) {
        Swal.fire({
          title: "User Registered",
          text: "You have been successfully registered!",
          icon: "success",
        }).then(() => {
          setUser({
            username: "",
            password: "",
            email: "",
            latitude: "",
            longitude: "",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "Unknown error",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setUser({
      username: "",
      password: "",
      email: "",
      latitude: "",
      longitude: "",
    });
    navigate("/");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUser({
            ...user,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        () => {
          Swal.fire({
            title: "Geolocation Error",
            text: "Unable to retrieve your location.",
            icon: "error",
          });
        }
      );
    } else {
      Swal.fire({
        title: "Geolocation Error",
        text: "Your browser doesn't support geolocation.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={user.latitude}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={user.longitude}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            className="w-full text-blue-500 border border-blue-500 rounded-md py-2 hover:bg-blue-50 transition duration-200"
          >
            Get Current Location
          </button>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
