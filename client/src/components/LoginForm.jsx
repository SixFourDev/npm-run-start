import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      if (data.login.token) {
        Auth.login(data.login.token);
      } else {
        throw new Error("Log-in attempt failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  // Define inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const formStyle = {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
  };

  const isFormValid = userFormData.email && userFormData.password;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      <div>
        {showAlert && (
          <div style={{ color: "red" }}>
            Something went wrong with your login credentials!
          </div>
        )}
        <form onSubmit={handleFormSubmit} style={formStyle}>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: isFormValid ? "green" : "gray",
            }}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;