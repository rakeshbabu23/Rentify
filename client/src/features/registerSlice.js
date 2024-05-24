import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:4000";

const initialState = {
  isLoading: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export function userRegistration(userInfo, navigate) {
  return async function (dispatch, getState) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userInfo
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("role", response.data.user.role);

        if (response.data.user.role === "Buyer") {
          navigate("/buyer-dashboard");
        } else {
          navigate("/seller-dashboard");
        }
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };
}

export function userLogin(userInfo, navigate) {
  return async function (dispatch, getState) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, userInfo);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        if (response.data.role === "Buyer") {
          navigate("/buyer-dashboard");
        } else {
          navigate("/seller-dashboard");
        }
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };
}

export const { setLoadingStatus } = registerSlice.actions;

export default registerSlice.reducer;
