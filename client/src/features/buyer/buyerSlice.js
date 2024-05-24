import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import queryString from "query-string";
const API_URL = "http://localhost:4000";

const initialState = {
  isLoading: [],
  allProperties: [],
  sellerDetails: "",
  emailLoadingStatus: false,
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.isLoading = action.payload;
    },
    setAllProperties(state, action) {
      state.allProperties = action.payload;
    },
    setSellerDetails(state, action) {
      state.sellerDetails = action.payload;
    },
    setEmailLoadingStatus(state, action) {
      state.emailLoadingStatus = action.payload;
    },
  },
});
export function getAllProperties(page = 1) {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/properties/all-properties?page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "buyer/setAllProperties",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export function getSellerDetailsOfInterestedProperty(propertyId) {
  return async function (dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/api/properties/${propertyId}/interested`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "buyer/setSellerDetails",
          payload: { sellerData: response.data.sellerDetails, propertyId },
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        // Customize error message based on status code
        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export function handleFilters(filters) {
  return async function (dispatch, getState) {
    // Dispatch action to set loading status to true
    dispatch({ type: "buyer/setLoadingStatus", payload: true });

    try {
      const token = localStorage.getItem("token");

      const queryParams = queryString.stringify(filters);

      const response = await axios.get(
        `${API_URL}/api/properties/filter?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful
      if (response.status === 200) {
        // Dispatch action to set loading status to false
        dispatch({ type: "buyer/setLoadingStatus", payload: false });

        dispatch({
          type: "buyer/setAllProperties",
          payload: response.data.properties,
        });
      }
    } catch (error) {
      // Dispatch action to set loading status to false
      dispatch({ type: "buyer/setLoadingStatus", payload: false });

      // Handle different error scenarios
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        // Customize error message based on status code
        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        // Dispatch action to set error message
        dispatch({ type: "buyer/setErrorMessage", payload: errorMessage });
      } else if (error.request) {
        // No response received
        dispatch({
          type: "buyer/setErrorMessage",
          payload: "No response received. Please try again.",
        });
      } else {
        // An unexpected error occurred
        dispatch({
          type: "buyer/setErrorMessage",
          payload: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };
}

export function handleEmail(sellerId, propertyId, setShowModal) {
  return async function (dispatch, getState) {
    try {
      dispatch({ type: "buyer/setEmailLoadingStatus", payload: true });
      const info = { sellerId, propertyId };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/properties/emails`,
        info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({ type: "buyer/setEmailLoadingStatus", payload: false });
        alert("Email sent successfully");
        setShowModal(false);
      }
    } catch (error) {
      dispatch({ type: "buyer/setEmailLoadingStatus", payload: false });
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "An error occurred. Please try again.";

        // Customize error message based on status code
        if (status === 400) {
          errorMessage = data.message;
        } else if (status === 401) {
          errorMessage = "Unauthorized access. Please log in.";
        } else if (status === 404) {
          errorMessage = "Resource not found.";
        } else if (status === 500) {
          errorMessage = "Internal server error.";
        }

        alert(errorMessage);
      } else if (error.request) {
        alert("No response received. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
}

export const { setLoadingStatus } = buyerSlice.actions;

export default buyerSlice.reducer;
