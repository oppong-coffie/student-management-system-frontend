import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import logo from "../../images/logo1.jpg";

export default function Login() {
  // State Management
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://student-management-system-backend-production.up.railway.app/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            alert(errorResult.message || "Login failed");
            return;
        }

        const result = await response.json();
        console.log("Login Response:", result);

        // ✅ Destructure role from result
        const { id, name, email, role, indexnumber } = result;

        if (!role) {
            alert("Role not assigned to this user.");
            return;
        }

        // ✅ Store user details in localStorage
        localStorage.setItem("user", JSON.stringify({ id, name, email, role, indexnumber }));

        // ✅ Navigate Based on Role
        switch (role) {
            case "student":
                navigate("/dashboard/student");
                break;
            case "teacher":
                navigate("/dashboard/teacher");
                break;
            case "parent":
                navigate("/dashboard/parent");
                break;
            default:
                alert("Unknown role!");
        }

        // ✅ Reset form
        setFormData({ email: "", password: "" });

    } catch (error) {
        console.error("Error logging in:", error);
        alert("Something went wrong!");
    }
};

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* ✅ Left Side - School Logo */}
      <div className="relative hidden items-center justify-center bg-blue-950 md:flex">
        <img src={logo} alt="School Logo" className="relative w-60" />
      </div>

      {/* ✅ Right Side - Login Form */}
      <div className="flex items-center justify-center px-6 py-12 md:px-10 bg-blue-950 md:bg-white">
        <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg md:shadow-none md:bg-transparent">
          {/* ✅ Mobile View - Logo */}
          <div className="flex flex-col items-center space-y-2 md:hidden">
            <img src={logo} alt="School Logo" className="w-32" />
          </div>

          {/* ✅ Welcome Text */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-blue-950">
              Welcome!
            </h1>
            <p className="text-gray-600">
              Chat our AI bot on{" "}
              <a href="http://wa.me/0246414197" className="text-blue-600">
                0246414197
              </a>
            </p>
          </div>

          {/* ✅ Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Index No/Email
              </label>
              <Input
                size="large"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-gray-50"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                size="large"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-gray-50"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-[#1C2D6B] hover:bg-[#1C2D6B]/90"
            >
              Sign in
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          {/* ✅ Footer */}
          <div className="text-center text-sm text-gray-500">
            ©2025 Woodbridge International School
          </div>
        </div>
      </div>
    </div>
  );
}
