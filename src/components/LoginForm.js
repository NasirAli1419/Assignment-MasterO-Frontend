import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const payload = { email, password };
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("DaTAA-->", data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login Successfull 🎉");
      localStorage.setItem("auth", JSON.stringify({ role: data.role }));
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box">
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="button" className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="register-text">
          New user? <Link to="/auth/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
