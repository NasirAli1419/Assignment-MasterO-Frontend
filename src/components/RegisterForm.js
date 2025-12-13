import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = { name, email, password, role };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("data", data);

      toast.success("Registration successful 🎉");
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
    <div className="register-container">
      <form className="login-box">
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <p className="register-text">
          Already a user? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
