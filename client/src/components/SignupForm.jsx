import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      if (data && data.addUser) {
        console.log("User data:", data.addUser);
      } else {
        console.log("User data is missing or empty");
      }

      const { token, user } = data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
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
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
  };

  const isFormValid =
    userFormData.username && userFormData.email && userFormData.password;

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Sign Up</h2>
      <div>
        {showAlert && (
          <div style={{ color: "red" }}>
            Something went wrong with your signup!
          </div>
        )}
        <form onSubmit={handleFormSubmit} style={formStyle}>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email address"
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
              width: "98%",
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

export default SignupForm;