import React, { useReducer, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link } from "react-router-dom";

interface SigninFormState {
  email: string;
  password: string;
}

type Action =
  | { type: "CHANGE"; field: keyof SigninFormState; value: string }
  | { type: "RESET" };

const initialState: SigninFormState = {
  email: "",
  password: "",
};

const reducer = (
  state: SigninFormState,
  action: Action
): SigninFormState => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const SigninForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SigninFormState
  ) => {
    dispatch({ type: "CHANGE", field, value: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      // Handle successful sign-in
      console.log("Signin successful");
      const res = await response.json()
      console.log(res)
      dispatch({ type: "RESET" });
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={state.email}
              onChange={(e) => handleChange(e, "email")}
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black   focus:outline-none focus:ring-primarygreen focus:border-primarygreen focus:z-10 "
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password:
            </label>
            <input
              value={state.password}
              onChange={(e) => handleChange(e, "password")}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-primarygreen focus:border-primarygreen focus:z-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center z-20 px-2 focus:outline-none"
            >
              {showPassword ? (
                <i className="bx bxs-hide text-xl"></i>
              ) : (
                <i className="bx bx-show-alt text-xl"></i>
              )}
            </button>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primarygreen hover:bg-primarygreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarygreen"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 font-semibold text-sm mt-2">Don't have an account? <Link className="text-blue-600" to="/signup"> Signup now</Link></p>
    </div>
  );
};

export default SigninForm;
