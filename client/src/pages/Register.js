import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegistration } from "../features/registerSlice";
function Register() {
  // State variables for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer"); // Assuming default role is "Buyer"
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      const userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        password,
        role,
      };
      dispatch(userRegistration(userInfo, navigate));
    } else {
      console.log(
        "Form submission failed. Please fill in all required fields correctly."
      );
    }
  };

  // Validation function
  const validateForm = () => {
    // Perform validation checks here
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(email) &&
      /^\+?[1-9]\d{9}$/.test(phone) // Modified to require exactly 10 digits
    );
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="first-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                First name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {formSubmitted && firstName.trim() === "" && (
                <p className="text-red-500 text-xs pt-1">
                  First name is required
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="last-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {formSubmitted && lastName.trim() === "" && (
                <p className="text-red-500 text-xs pt-1">
                  Last name is required
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="m@example.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
            />
            {formSubmitted && !/^\S+@\S+\.\S+$/.test(email) && (
              <p className="text-red-500 text-xs pt-1">
                Enter a valid email address
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            {formSubmitted && password.trim() === "" && (
              <p className="text-red-500 text-xs pt-1">Password is required</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Phone
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="phone"
              placeholder="+91 (555) 555-5555"
              value={phone}
              onChange={handlePhoneChange}
              type="tel"
            />
            {formSubmitted && !/^\+?[1-9]\d{1,14}$/.test(phone) && (
              <p className="text-red-500 text-xs pt-1">
                Enter a valid phone number
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am a
            </label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <button
            className="bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Register
          </button>
        </div>
        <p
          onClick={() => navigate("/login")}
          className="underline cursor-pointer"
        >
          Already a user, log in
        </p>
      </form>
    </div>
  );
}

export default Register;
